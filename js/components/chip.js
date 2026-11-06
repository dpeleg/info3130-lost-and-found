import { el, icon } from '../lib/dom.js';

/** Quick category chip on the board. */
export function quickChip(label, onClick) {
  const chip = el('button', 'chip', label);
  chip.type = 'button';
  chip.addEventListener('click', onClick);
  return chip;
}

/** Active-filter chip with a remove (x) action. */
export function appliedChip(label, onRemove) {
  const chip = el('button', 'chip applied');
  chip.type = 'button';
  chip.append(document.createTextNode(label), icon('x'));
  chip.setAttribute('aria-label', 'Remove filter: ' + label);
  chip.addEventListener('click', onRemove);
  return chip;
}
