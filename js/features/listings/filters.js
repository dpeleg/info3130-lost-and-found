// Pure filtering logic (no DOM), easy to test on its own.
export const defaultFilters = () => ({ type: 'all', q: '', category: '', location: '', from: '' });

/** Filters that live in the filter panel (they get a dot on the button and applied chips). */
export const panelActive = f => !!(f.category || f.location || f.from);

export const anyActive = f => panelActive(f) || f.type !== 'all' || !!f.q.trim();

export function applyFilters(items, f) {
  const q = f.q.trim().toLowerCase();
  return items
    .filter(i => f.type === 'all' || i.type === f.type)
    .filter(i => !f.category || i.category === f.category)
    .filter(i => !f.location || i.location === f.location)
    .filter(i => !f.from || i.date >= f.from)
    .filter(i => !q || [i.title, i.description, i.location, i.category].join(' ').toLowerCase().includes(q))
    .sort((a, b) => b.date.localeCompare(a.date));
}
