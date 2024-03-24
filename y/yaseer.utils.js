var h = Object.defineProperty;
var l = (t, e, n) => e in t ? h(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var a = (t, e, n) => (l(t, typeof e != "symbol" ? e + "" : e, n), n);
function P(t, e, n) {
  let o;
  function r() {
    if (!o) {
      o = document.createElement(t);
      for (const s in e) {
        const i = e[s];
        s.startsWith("on") && typeof i == "function" ? (console.log("somoeone help me", s, i), o.addEventListener(s.substring(2), i)) : o.setAttribute(s, i);
      }
    }
    return n && (o.textContent = `${n}`), o;
  }
  return r();
}
function g(t, e) {
  let n;
  Array.isArray(e) ? n = e.map((o) => o.outerHTML) : n = [e.outerHTML], t.innerHTML = n.join("");
}
function w(t, e) {
  if (Array.isArray(e))
    for (const n of e)
      if (Array.isArray(n))
        for (const o of n)
          t.appendChild(o);
      else
        t.appendChild(n);
  else
    t.appendChild(e);
  return t;
}
const c = [];
function u(t, e) {
  e.add(t), t.dependencies.add(e);
}
function d(t) {
  for (const e of t.dependencies)
    e.delete(t);
  t.dependencies.clear();
}
function y(t) {
  const e = /* @__PURE__ */ new Set();
  return [() => {
    const r = c[c.length - 1];
    return r && u(r, e), t;
  }, (r) => {
    t = r;
    for (const s of [...e])
      s.execute();
  }];
}
function m(t) {
  const e = () => {
    d(n), c.push(n);
    try {
      t();
    } finally {
    }
  }, n = {
    execute: e,
    dependencies: /* @__PURE__ */ new Set()
  };
  e();
}
class f {
  constructor() {
    /**
     * Class to handle routing
     * 
     * @constructor
     */
    a(this, "routes");
    a(this, "currentPath");
    a(this, "previousPath");
    this.routes = {}, this.currentPath = window.location.pathname, this.previousPath = null;
    const e = this.handlePopstate.bind(this), n = this.handleClick.bind(this);
    window.addEventListener("popstate", e), window.addEventListener("click", n);
  }
  on(e, n) {
    this.routes[e] = n;
  }
  navigateTo(e) {
    history.pushState({}, "", e), this.handleRoute();
  }
  handlePopstate() {
    this.handleRoute();
  }
  /**
   * Handles the click event and prevents default behavior for anchor elements.
   *
   * @param {MouseEvent} e - The click event
   * @return {void} 
   */
  handleClick(e) {
    e.target instanceof HTMLAnchorElement && e.target.href && (e.preventDefault(), this.navigateTo(e.target.href));
  }
  /**
   * Handles the route change.
   *
   * If the route exists in the registered routes, it calls the callback function.
   * Otherwise it logs a 404 error message to the console.
   */
  handleRoute() {
    const e = window.location.pathname;
    if (this.currentPath === e)
      return;
    this.previousPath = this.currentPath, this.currentPath = e;
    const n = this.routes[e];
    n ? n() : console.error("404: ", e);
  }
}
new f();
export {
  m as createEffect,
  y as createSignal,
  w as nest,
  g as renderAppDDOM,
  P as template
};
