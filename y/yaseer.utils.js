function p(e, t, n) {
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
function h(e, t) {
  e.appendChild(t);
}
function w(e, t) {
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
function u(e, t) {
  t.add(e), e.dependencies.add(t);
}
function f(e) {
  for (const t of e.dependencies)
    t.delete(e);
  e.dependencies.clear();
}
function m(e) {
  const t = /* @__PURE__ */ new Set();
  return [() => {
    const c = r[r.length - 1];
    return c && u(c, t), e;
  }, (c) => {
    e = c;
    for (const s of [...t])
      s.execute();
  }];
}
function y(e) {
  const t = () => {
    f(n), r.push(n);
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
const l = (e) => {
  e = e || window.event, e.preventDefault(), window.history.pushState({}, "", e.target.href), a();
}, d = {
  // 404: '/404',
  // '/': 'Home',
  // '/about': 'About',
  // '/contact': 'Contact'
}, C = (e, t) => {
  const n = document.createElement("a");
  n.href = e;
  const o = document.createTextNode(t);
  return n.appendChild(o), document.body.appendChild(n), n;
}, a = async () => {
  const e = window.location.pathname, t = d[e] || d[404], n = await fetch(t).then((o) => o.text());
  document.body.innerHTML = n;
};
window.onpopstate = a;
window.route = l;
export {
  C as Link,
  y as createEffect,
  m as createSignal,
  w as nest,
  h as renderAppDDOM,
  d as routes,
  p as template
};
