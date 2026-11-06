import { $ } from './dom.js';

/** Replace a <select>'s options (keeping the first placeholder option) and keep the selection if still valid. */
export function fillSelect(select, values) {
  const keep = select.value;
  while (select.options.length > 1) select.remove(1);
  values.forEach(v => select.add(new Option(v, v)));
  select.value = values.includes(keep) ? keep : '';
}

/** Show or clear the inline error under a field. Expects `#<id>-err` with a <span> for the message. */
export function setFieldError(id, message) {
  const input = $('#' + id);
  const error = $('#' + id + '-err');
  if (message) {
    error.querySelector('span').textContent = message;
    error.hidden = false;
    input.setAttribute('aria-invalid', 'true');
  } else {
    error.hidden = true;
    input.removeAttribute('aria-invalid');
  }
}
