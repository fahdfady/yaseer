(function(o,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(o=typeof globalThis<"u"?globalThis:o||self,i(o.yaseer={}))})(this,function(o){"use strict";var b=Object.defineProperty;var w=(o,i,r)=>i in o?b(o,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[i]=r;var d=(o,i,r)=>(w(o,typeof i!="symbol"?i+"":i,r),r);function i(t,e,n){let s;function a(){if(!s){s=document.createElement(t);for(const c in e){const u=e[c];c.startsWith("on")&&typeof u=="function"?(console.log("somoeone help me",c,u),s.addEventListener(c.substring(2),u)):s.setAttribute(c,u)}}return n&&(s.textContent=`${n}`),s}return a()}function r(t,e){let n;Array.isArray(e)?n=e.map(s=>s.outerHTML):n=[e.outerHTML],t.innerHTML=n.join("")}function h(t,e){if(Array.isArray(e))for(const n of e)if(Array.isArray(n))for(const s of n)t.appendChild(s);else t.appendChild(n);else t.appendChild(e);return t}const l=[];function f(t,e){e.add(t),t.dependencies.add(e)}function p(t){for(const e of t.dependencies)e.delete(t);t.dependencies.clear()}function y(t){const e=new Set;return[()=>{const a=l[l.length-1];return a&&f(a,e),t},a=>{t=a;for(const c of[...e])c.execute()}]}function g(t){const e=()=>{p(n),l.push(n);try{t()}finally{}},n={execute:e,dependencies:new Set};e()}class m{constructor(){d(this,"routes");d(this,"currentPath");d(this,"previousPath");this.routes={},this.currentPath=window.location.pathname,this.previousPath=null;const e=this.handlePopstate.bind(this),n=this.handleClick.bind(this);window.addEventListener("popstate",e),window.addEventListener("click",n)}on(e,n){this.routes[e]=n}navigateTo(e){history.pushState({},"",e),this.handleRoute()}handlePopstate(){this.handleRoute()}handleClick(e){e.target instanceof HTMLAnchorElement&&e.target.href&&(e.preventDefault(),this.navigateTo(e.target.href))}handleRoute(){const e=window.location.pathname;if(this.currentPath===e)return;this.previousPath=this.currentPath,this.currentPath=e;const n=this.routes[e];n?n():console.error("404: ",e)}}const P=new m;o.createEffect=g,o.createSignal=y,o.nest=h,o.renderAppDDOM=r,o.router=P,o.template=i,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
