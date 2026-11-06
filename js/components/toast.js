import { $ } from '../lib/dom.js';

let timer;

/** Short confirmation message (announced to screen readers via role="status"). */
export function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(timer);
  timer = setTimeout(() => { toast.hidden = true; }, 4000);
}
