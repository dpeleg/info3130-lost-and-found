import { el, icon } from '../lib/dom.js';

/** <button> styled as .btn. variant: "primary" | "secondary". */
export function button(label, variant, iconName) {
  const b = el('button', 'btn ' + variant);
  b.type = 'button';
  if (iconName) b.appendChild(icon(iconName));
  b.appendChild(document.createTextNode(label));
  return b;
}

/** <a> styled as .btn (for navigation). */
export function linkButton(label, href, variant = 'secondary') {
  const a = el('a', 'btn ' + variant, label);
  a.href = href;
  return a;
}
