import { $ } from '../lib/dom.js';

export function renderSuccess(item) {
  const title = item.title.toLowerCase();
  $('#success-text').textContent = item.type === 'lost'
    ? `Anyone on campus can now see your lost ${title} on the board.`
    : `Anyone on campus can now see the ${title} you found on the board.`;
}
