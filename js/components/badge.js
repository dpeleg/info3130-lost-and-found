import { el, icon } from '../lib/dom.js';

export function typeBadge(type) {
  const badge = el('span', 'badge ' + type);
  badge.append(icon(type === 'lost' ? 'search' : 'check'), document.createTextNode(type === 'lost' ? 'Lost' : 'Found'));
  return badge;
}

export function pendingBadge() {
  const badge = el('span', 'badge pending');
  badge.append(icon('clock'), document.createTextNode('Claim pending'));
  return badge;
}
