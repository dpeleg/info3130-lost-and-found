import { $ } from '../lib/dom.js';
import { formatDate } from '../lib/dates.js';
import { fillSelect } from '../lib/forms.js';
import { listingCard } from '../components/listing-card.js';
import { quickChip, appliedChip } from '../components/chip.js';
import { getOpenItems } from '../features/listings/store.js';
import { CATEGORIES, QUICK_CATEGORIES } from '../features/listings/constants.js';
import { defaultFilters, panelActive, anyActive, applyFilters } from '../features/listings/filters.js';

const filters = defaultFilters();
const panel = $('#filter-panel');
const filterBtn = $('#filter-btn');

function setPanel(open) {
  panel.hidden = !open;
  filterBtn.setAttribute('aria-expanded', String(open));
}

function syncPanelFields() {
  $('#f-category').value = filters.category;
  $('#f-location').value = filters.location;
  $('#f-date').value = filters.from;
}

function renderChips() {
  const box = $('#chips');
  box.replaceChildren();
  if (panelActive(filters)) {
    box.setAttribute('aria-label', 'Active filters');
    const add = (label, clear) => box.appendChild(appliedChip(label, () => {
      clear();
      syncPanelFields();
      renderBoard();
      filterBtn.focus();
    }));
    if (filters.category) add(filters.category, () => { filters.category = ''; });
    if (filters.location) add(filters.location, () => { filters.location = ''; });
    if (filters.from) add('From ' + formatDate(filters.from), () => { filters.from = ''; });
  } else {
    box.setAttribute('aria-label', 'Quick category filters');
    QUICK_CATEGORIES.forEach(category => box.appendChild(quickChip(category, () => {
      filters.category = category;
      syncPanelFields();
      renderBoard();
    })));
  }
}

function renderEmpty(hasListings) {
  $('#empty-title').textContent = hasListings ? 'No items match' : 'No items posted yet';
  $('#empty-text').textContent = hasListings
    ? 'Try another category or clear your filters.'
    : 'Be the first to post a lost or found item.';
  $('#empty-clear').hidden = !hasListings;
}

export function renderBoard() {
  const open = getOpenItems();

  const locations = [...new Set(open.map(i => i.location))].sort();
  if (filters.location && !locations.includes(filters.location)) filters.location = '';
  fillSelect($('#f-location'), locations);
  $('#f-location').value = filters.location;

  renderChips();

  const shown = applyFilters(open, filters);
  const list = $('#list');
  list.replaceChildren(...shown.map(listingCard));
  list.hidden = shown.length === 0;
  $('#empty').hidden = shown.length > 0;
  if (shown.length === 0) renderEmpty(open.length > 0);

  $('#result-count').textContent = anyActive(filters) ? `${shown.length} ${shown.length === 1 ? 'result' : 'results'}` : '';
  $('#filter-dot').hidden = !panelActive(filters);
  filterBtn.classList.toggle('active', panelActive(filters));
  $('#filter-btn-label').textContent = panelActive(filters) ? 'Filters, active' : 'Filters';
}

/** Called every time the board route is entered. */
export function showBoard() {
  setPanel(false);
  renderBoard();
}

/** Attach event listeners once at startup. */
export function initBoard() {
  fillSelect($('#f-category'), CATEGORIES);

  filterBtn.addEventListener('click', () => setPanel(panel.hidden));
  panel.addEventListener('submit', e => { e.preventDefault(); setPanel(false); filterBtn.focus(); });
  panel.addEventListener('keydown', e => { if (e.key === 'Escape') { setPanel(false); filterBtn.focus(); } });
  document.addEventListener('click', e => {
    if (!panel.hidden && !panel.contains(e.target) && !filterBtn.contains(e.target)) setPanel(false);
  });

  // Results update live as the panel fields change.
  ['f-category', 'f-location', 'f-date'].forEach(id => $('#' + id).addEventListener('change', () => {
    filters.category = $('#f-category').value;
    filters.location = $('#f-location').value;
    filters.from = $('#f-date').value;
    renderBoard();
  }));

  $('#f-clear').addEventListener('click', () => {
    filters.category = filters.location = filters.from = '';
    syncPanelFields();
    renderBoard();
  });

  $('#empty-clear').addEventListener('click', () => {
    Object.assign(filters, defaultFilters());
    $('input[name="typeFilter"][value="all"]').checked = true;
    $('#q').value = '';
    syncPanelFields();
    renderBoard();
  });

  document.querySelectorAll('input[name="typeFilter"]').forEach(radio => radio.addEventListener('change', () => {
    filters.type = radio.value;
    renderBoard();
  }));

  $('#q').addEventListener('input', e => { filters.q = e.target.value; renderBoard(); });
}
