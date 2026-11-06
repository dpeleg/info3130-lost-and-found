// Data layer. Everything that reads or writes listings goes through this file,
// so swapping localStorage for a real API later only touches this module.
import { SEED } from './seed.js';
import { STATUS } from './constants.js';

const KEY = 'lf_items_v1';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* storage unavailable: fall back to seed data */ }
  return SEED.map(item => ({ ...item }));
}

let items = load();

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* ignore */ }
}

export const getOpenItems = () => items.filter(i => i.status !== STATUS.RESOLVED);
export const getItem = id => items.find(i => i.id === id);

/** New posts belong to the current (simulated, logged-in) user. */
export function addItem(data) {
  const item = { id: 'u' + Date.now(), status: STATUS.OPEN, mine: true, ...data };
  items.unshift(item);
  persist();
  return item;
}

export function setStatus(id, status) {
  const item = getItem(id);
  if (!item) return null;
  item.status = status;
  persist();
  return item;
}
