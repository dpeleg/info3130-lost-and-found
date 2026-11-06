import { el, icon } from '../lib/dom.js';
import { formatDate } from '../lib/dates.js';
import { typeBadge, pendingBadge } from './badge.js';
import { STATUS } from '../features/listings/constants.js';

/** One listing in the board list. Links to the detail view. */
export function listingCard(item) {
  const li = el('li');
  const link = el('a', 'card');
  link.href = '#/item/' + item.id;

  const thumb = el('div', 'thumb');
  thumb.setAttribute('aria-hidden', 'true');
  thumb.appendChild(icon('photo'));

  const info = el('div', 'info');
  const badges = el('div', 'badges');
  badges.appendChild(typeBadge(item.type));
  if (item.status === STATUS.PENDING) badges.appendChild(pendingBadge());

  const meta = el('div', 'meta');
  meta.append(icon('pin'), document.createTextNode(`${item.location} · ${formatDate(item.date)}`));

  info.append(badges, el('h2', null, item.title), meta);
  link.append(thumb, info);
  li.appendChild(link);
  return li;
}
