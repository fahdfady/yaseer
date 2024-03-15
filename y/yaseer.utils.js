function u(e, t, n) {
  let o;
  function c() {
    if (!o) {
      o = document.createElement(e);
      for (const s in t) {
        const i = t[s];
        s.startsWith("on") && typeof i == "function" ? o.addEventListener(s.substring(2), i) : o.setAttribute(s, i);
      }
    }
    return n && (o.textContent = `${n}`), o;
  }
  return c();
}
function l(e, t) {
  e.appendChild(t);
}
function p(e, t) {
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
const r = [];
function f(e, t) {
  t.add(e), e.dependencies.add(t);
}
function d(e) {
  for (const t of e.dependencies)
    t.delete(e);
  e.dependencies.clear();
}
function a(e) {
  const t = /* @__PURE__ */ new Set();
  return [() => {
    const c = r[r.length - 1];
    return c && f(c, t), e;
  }, (c) => {
    e = c;
    for (const s of [...t])
      s.execute();
  }];
}
function y(e) {
  const t = () => {
    d(n), r.push(n);
    try {
      e();
    } finally {
    }
  }, n = {
    execute: t,
    dependencies: /* @__PURE__ */ new Set()
  };
  t(), console.log(n, r, t);
}
export {
  y as createEffect,
  a as createSignal,
  p as nest,
  l as renderAppDDOM,
  u as template
};
