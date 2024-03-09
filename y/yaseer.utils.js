function f(e, t) {
  if (Array.isArray(t))
    for (const n of t)
      if (Array.isArray(n))
        for (const o of n)
          e.appendChild(o);
      else
        e.appendChild(n);
  else
    e.appendChild(t);
  return e;
}
function p(e, t, n) {
  let o;
  function c() {
    if (!o) {
      o = document.createElement(e);
      for (const r in t) {
        const s = t[r];
        r.startsWith("on") && typeof s == "function" ? (console.log("somoeone help me", r, s), o.addEventListener(r.substring(2), s)) : o.setAttribute(r, s);
      }
    }
    return n && (o.textContent = `${n}`), o;
  }
  return c();
}
function a(e, t) {
  e && f(e, t);
}
const i = [];
function u(e, t) {
  t.add(e), e.dependencies.add(t);
}
function d(e) {
  for (const t of e.dependencies)
    t.delete(e);
  e.dependencies.clear();
}
function h(e) {
  const t = /* @__PURE__ */ new Set();
  return [() => {
    const c = i[i.length - 1];
    return c && u(c, t), e;
  }, (c) => {
    e = c;
    for (const r of [...t])
      r.execute();
  }];
}
function y(e) {
  const t = () => {
    d(n), i.push(n);
    try {
      e();
    } finally {
    }
  }, n = {
    execute: t,
    dependencies: /* @__PURE__ */ new Set()
  };
  t(), console.log(n, i, t);
}
function l(e) {
  const t = document.createElement(e.tag);
  for (const [n, o] of Object.entries(e.props))
    t.setAttribute(n, o);
  if (typeof e.children == "string")
    t.textContent = e.children;
  else
    for (const n of e.children)
      f(t, l(n));
  return t;
}
function g(e, t, n) {
  return {
    tag: e,
    props: t,
    children: n
  };
}
function m(e, t) {
  e && f(e, l(t));
}
export {
  y as createEffect,
  h as createSignal,
  g as h,
  f as nest,
  a as renderAppDDOM,
  m as renderAppVDOM,
  p as template
};
