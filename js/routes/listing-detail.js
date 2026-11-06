import { $, el, icon } from '../lib/dom.js';
import { formatDate } from '../lib/dates.js';
import { button, linkButton } from '../components/button.js';
import { typeBadge, pendingBadge } from '../components/badge.js';
import { showToast } from '../components/toast.js';
import { openConfirm } from '../components/confirm-dialog.js';
import { getItem, setStatus } from '../features/listings/store.js';
import { STATUS, TYPE } from '../features/listings/constants.js';
import { navigate } from '../router.js';

const notice = (iconName, message, variant = '') => {
  const box = el('div', 'notice ' + variant);
  box.append(icon(iconName), el('span', null, message));
  return box;
};

const row = (iconName, text) => {
  const r = el('div', 'd-row');
  r.append(icon(iconName), el('span', null, text));
  return r;
};

export function renderDetail(id) {
  const body = $('#detail-body');
  const actions = $('#detail-actions');
  body.replaceChildren();
  actions.replaceChildren();

  const item = getItem(id);
  if (!item || item.status === STATUS.RESOLVED) {
    body.appendChild(notice('alert', item ? 'This post has been closed.' : "We couldn't find that listing.", 'info'));
    actions.appendChild(linkButton('Back to board', '#/'));
    return;
  }

  const hero = el('div', 'hero');
  hero.setAttribute('role', 'img');
  hero.setAttribute('aria-label', 'No photo available');
  hero.appendChild(icon('photo'));

  const badges = el('div', 'badges');
  badges.appendChild(typeBadge(item.type));
  badges.appendChild(item.status === STATUS.PENDING ? pendingBadge() : el('span', 'muted', 'Posted ' + formatDate(item.date)));

  body.append(hero, badges, el('h2', 'd-title', item.title), row('pin', item.location), row('tag', item.category));
  if (item.description) body.appendChild(el('p', null, item.description));

  const status = el('div');
  status.setAttribute('role', 'status');
  body.appendChild(status);

  const back = () => linkButton('Back to board', '#/');

  if (item.mine) {
    // Owner view: close the post once the item is back with its owner.
    if (item.status === STATUS.PENDING) {
      status.appendChild(notice('clock', 'Someone responded to your post. Mark it as returned once the item is back with its owner.', 'info'));
    }
    const returned = button('Item returned', 'primary', 'cc');
    returned.addEventListener('click', () => openConfirm(returned, () => {
      setStatus(item.id, STATUS.RESOLVED);
      showToast('Post closed. It no longer appears on the board.');
      navigate('/');
    }));
    actions.append(returned, back());
  } else if (item.status === STATUS.PENDING) {
    status.appendChild(notice('cc', 'Done. The person who posted this has been notified.'));
    actions.appendChild(back());
  } else {
    // Visitor view: tag the listing (the email to the poster is simulated).
    const claim = button(item.type === TYPE.FOUND ? 'This is mine' : 'I found it', 'primary', 'cc');
    claim.addEventListener('click', () => {
      setStatus(item.id, STATUS.PENDING);
      renderDetail(id);
      const confirmation = $('#detail-body [role="status"] .notice');
      confirmation.tabIndex = -1;
      confirmation.focus();
    });
    actions.append(claim, back());
  }
}
