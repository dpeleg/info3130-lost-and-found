import { $ } from '../lib/dom.js';

const dialog = $('#close-dialog');
let trigger = null;
let onConfirm = null;

$('#dlg-cancel').addEventListener('click', () => dialog.close());

$('#dlg-confirm').addEventListener('click', () => {
  const callback = onConfirm;
  trigger = null;
  onConfirm = null;
  dialog.close();
  if (callback) callback();
});

// Native <dialog> traps focus and closes on Escape; we also return focus to the opener.
dialog.addEventListener('close', () => {
  if (trigger && document.contains(trigger)) trigger.focus();
});

/** Open the "Close this post?" dialog. `opener` gets focus back when it closes. */
export function openConfirm(opener, callback) {
  trigger = opener;
  onConfirm = callback;
  dialog.showModal();
}
