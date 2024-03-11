var f = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var A = f((n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  n.renderAppDDOM = n.template = void 0;
  const l = require("./nest.js");
  function u(t, e, o) {
    let r;
    function s() {
      if (!r) {
        r = document.createElement(t);
        for (const c in e) {
          const i = e[c];
          c.startsWith("on") && typeof i == "function" ? (console.log("somoeone help me", c, i), r.addEventListener(c.substring(2), i)) : r.setAttribute(c, i);
        }
      }
      return o && (r.textContent = `${o}`), r;
    }
    return s();
  }
  n.template = u;
  function a(t, e) {
    t && (0, l.nest)(t, e);
  }
  n.renderAppDDOM = a;
  Object.defineProperty(n, "__esModule", { value: !0 });
  n.nest = void 0;
  function p(t, e) {
    if (Array.isArray(e))
      for (const o of e)
        if (Array.isArray(o))
          for (const r of o)
            t.appendChild(r);
        else
          t.appendChild(o);
    else
      t.appendChild(e);
    return t;
  }
  n.nest = p;
  Object.defineProperty(n, "__esModule", { value: !0 });
  n.createEffect = n.createSignal = void 0;
  const d = [];
  function y(t, e) {
    e.add(t), t.dependencies.add(e);
  }
  function g(t) {
    for (const e of t.dependencies)
      e.delete(t);
    t.dependencies.clear();
  }
  function m(t) {
    const e = /* @__PURE__ */ new Set();
    return [() => {
      const s = d[d.length - 1];
      return s && y(s, e), t;
    }, (s) => {
      t = s;
      for (const c of [...e])
        c.execute();
    }];
  }
  n.createSignal = m;
  function b(t) {
    const e = () => {
      g(o), d.push(o);
      try {
        t();
      } finally {
      }
    }, o = {
      execute: e,
      dependencies: /* @__PURE__ */ new Set()
    };
    e(), console.log(o, d, e);
  }
  n.createEffect = b;
});
export default A();
