function p(e, t, n) {
  let o;
  function c() {
    if (!o) {
      o = document.createElement(e);
      for (const r in t) {
        const s = t[r];
        r.startsWith("on") && typeof s == "function" ? o.addEventListener(r.substring(2), s) : o.setAttribute(r, s);
      }
    }
    return n && (o.textContent = `${n}`), o;
  }
  return c();
}
function h(e, t) {
  e.appendChild(t);
}
function m(e, t) {
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
const d = [];
function l(e, t) {
  t.add(e), e.dependencies.add(t);
}
function u(e) {
  for (const t of e.dependencies)
    t.delete(e);
  e.dependencies.clear();
}
function w(e) {
  const t = /* @__PURE__ */ new Set();
  return [() => {
    const c = d[d.length - 1];
    return c && l(c, t), e;
  }, (c) => {
    e = c;
    for (const r of [...t])
      r.execute();
  }];
}
function y(e) {
  const t = () => {
    u(n), d.push(n);
    try {
      e();
    } finally {
    }
  }, n = {
    execute: t,
    dependencies: /* @__PURE__ */ new Set()
  };
  t();
}
const f = (e) => {
  e = e || window.event, e.preventDefault(), window.history.pushState({}, "", e.target.href), a();
}, i = {
  // 404: '/404',
  // '/': 'Home',
  // '/about': 'About',
  // '/contact': 'Contact'
}, g = (e, t) => {
  const n = document.createElement("a");
  n.href = e;
  const o = document.createTextNode(t);
  return n.appendChild(o), document.body.appendChild(n), n;
}, a = async () => {
  console.log("handleLocationTEST");
  const e = window.location.pathname, n = `./pages/${i[e] || i[404]}`;
  console.log(n);
  try {
    const o = await import(n);
    typeof o.default == "function" ? o.default() : console.error(`Module '${n}' does not have a default export function.`);
  } catch (o) {
    console.error(`Failed to import module '${n}':`, o);
  }
  console.log("handleLocationTEST22222");
};
window.onpopstate = a;
console.log("Routing loaded.");
window.route = f;
export {
  g as Link,
  y as createEffect,
  w as createSignal,
  m as nest,
  h as renderAppDDOM,
  i as routes,
  p as template
};
