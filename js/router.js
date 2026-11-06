// Tiny hash router. A route is { path, view, title, enter(params) }.
// `path` supports ":param" segments. `enter` may return false to cancel (after redirecting).
import { $ } from './lib/dom.js';

export const navigate = path => { location.hash = '#' + path; };

const compile = path => {
  const names = [];
  const pattern = path.replace(/:([^/]+)/g, (_, name) => { names.push(name); return '([^/]+)'; });
  return { regex: new RegExp('^' + pattern + '$'), names };
};

export function startRouter(routes) {
  const compiled = routes.map(r => ({ ...r, ...compile(r.path) }));
  const views = [...new Set(routes.map(r => r.view))];
  let first = true;

  function resolve() {
    const path = location.hash.replace(/^#/, '') || '/';
    for (const route of compiled) {
      const match = route.regex.exec(path);
      if (!match) continue;
      const params = Object.fromEntries(route.names.map((n, i) => [n, match[i + 1]]));
      return { route, params };
    }
    return { route: compiled[0], params: {} };
  }

  function render() {
    const { route, params } = resolve();
    if (route.enter && route.enter(params) === false) return;
    views.forEach(selector => { $(selector).hidden = selector !== route.view; });
    document.title = route.title;
    window.scrollTo(0, 0);
    // Move focus to the new view's heading so keyboard and screen-reader users land at the top.
    if (!first) $(route.view).querySelector('h1').focus({ preventScroll: true });
    first = false;
  }

  window.addEventListener('hashchange', render);
  render();
}
