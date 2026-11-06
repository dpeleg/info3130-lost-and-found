import { $ } from '../lib/dom.js';
import { today } from '../lib/dates.js';
import { fillSelect, setFieldError } from '../lib/forms.js';
import { addItem } from '../features/listings/store.js';
import { CATEGORIES } from '../features/listings/constants.js';

const form = $('#post-form');

const REQUIRED = [
  { id: 'p-title', message: 'Enter a title' },
  { id: 'p-category', message: 'Choose a category' },
  { id: 'p-location', message: 'Enter a location' },
  { id: 'p-date', message: 'Choose a date' }
];

const currentType = () => form.elements.type.value;

function syncTypeLabels() {
  $('#p-location-label').textContent = currentType() === 'lost' ? 'Last seen at' : 'Found at';
}

/** Called every time the form route is entered. */
export function resetForm() {
  form.reset();
  $('#p-date').value = today();
  $('#p-date').max = today();
  REQUIRED.forEach(r => setFieldError(r.id, ''));
  syncTypeLabels();
}

function validate() {
  let firstInvalid = null;
  REQUIRED.forEach(({ id, message }) => {
    const input = $('#' + id);
    let error = '';
    if (!input.value.trim()) error = message;
    else if (id === 'p-date' && input.value > today()) error = 'Choose today or an earlier date';
    setFieldError(id, error);
    if (error && !firstInvalid) firstInvalid = input;
  });
  return firstInvalid;
}

export function initPostForm({ onPosted }) {
  fillSelect($('#p-category'), CATEGORIES);

  form.querySelectorAll('input[name="type"]').forEach(r => r.addEventListener('change', syncTypeLabels));

  // Clear a field's error as soon as the user fixes it.
  REQUIRED.forEach(({ id }) => {
    const input = $('#' + id);
    const clear = () => { if (input.value.trim()) setFieldError(id, ''); };
    input.addEventListener('input', clear);
    input.addEventListener('change', clear);
  });

  // The photo upload is a visual placeholder only.
  $('.upload').addEventListener('click', e => e.preventDefault());

  form.addEventListener('submit', e => {
    e.preventDefault();
    const firstInvalid = validate();
    if (firstInvalid) { firstInvalid.focus(); return; }
    const item = addItem({
      type: currentType(),
      title: $('#p-title').value.trim(),
      category: $('#p-category').value,
      location: $('#p-location').value.trim(),
      date: $('#p-date').value,
      description: $('#p-desc').value.trim()
    });
    onPosted(item);
  });
}
