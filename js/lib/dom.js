export const $ = (selector, root = document) => root.querySelector(selector);

const SVGNS = 'http://www.w3.org/2000/svg';
const SPRITE = 'assets/icons.svg';

/** Create an element, optionally with a class and text content (text is never parsed as HTML). */
export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

/** Decorative SVG icon from the sprite in assets/icons.svg. */
export function icon(name) {
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('class', 'i');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS(SVGNS, 'use');
  use.setAttribute('href', `${SPRITE}#i-${name}`);
  svg.appendChild(use);
  return svg;
}
