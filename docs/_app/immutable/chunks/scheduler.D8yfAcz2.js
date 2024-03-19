var P=Object.defineProperty;var q=(t,e,n)=>e in t?P(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var f=(t,e,n)=>(q(t,typeof e!="symbol"?e+"":e,n),n);function B(){}const ct=t=>t;function R(t,e){for(const n in e)t[n]=e[n];return t}function O(t){return t()}function lt(){return Object.create(null)}function F(t){t.forEach(O)}function ot(t){return typeof t=="function"}function ut(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let p;function at(t,e){return t===e?!0:(p||(p=document.createElement("a")),p.href=e,t===p.href)}function ft(t){return Object.keys(t).length===0}function G(t,...e){if(t==null){for(const i of e)i(void 0);return B}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function _t(t,e,n){t.$$.on_destroy.push(G(e,n))}function ht(t,e,n,i){if(t){const r=M(t,e,n,i);return t[0](r)}}function M(t,e,n,i){return t[1]&&i?R(n.ctx.slice(),t[1](i(e))):n.ctx}function dt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const l=[],s=Math.max(e.dirty.length,r.length);for(let o=0;o<s;o+=1)l[o]=e.dirty[o]|r[o];return l}return e.dirty|r}return e.dirty}function mt(t,e,n,i,r,l){if(r){const s=M(e,n,i,l);t.p(s,r)}}function pt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function yt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function gt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function bt(t){const e=typeof t=="string"&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return e?[parseFloat(e[1]),e[2]||"px"]:[t,"px"]}let g=!1;function xt(){g=!0}function Et(){g=!1}function z(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function I(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let u=0;u<e.length;u++){const a=e[u];a.claim_order!==void 0&&c.push(a)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let c=0;c<e.length;c++){const u=e[c].claim_order,a=(r>0&&e[n[r]].claim_order<=u?r+1:z(1,r,j=>e[n[j]].claim_order,u))-1;i[c]=n[a]+1;const k=a+1;n[k]=c,r=Math.max(k,r)}const l=[],s=[];let o=e.length-1;for(let c=n[r]+1;c!=0;c=i[c-1]){for(l.push(e[c-1]);o>=c;o--)s.push(e[o]);o--}for(;o>=0;o--)s.push(e[o]);l.reverse(),s.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<s.length;c++){for(;u<l.length&&s[c].claim_order>=l[u].claim_order;)u++;const a=u<l.length?l[u]:null;t.insertBefore(s[c],a)}}function U(t,e){t.appendChild(e)}function W(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Nt(t){const e=v("style");return e.textContent="/* empty */",J(W(t),e),e.sheet}function J(t,e){return U(t.head||t,e),e.sheet}function K(t,e){if(g){for(I(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Q(t,e,n){t.insertBefore(e,n||null)}function V(t,e,n){g&&!n?K(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function N(t){t.parentNode&&t.parentNode.removeChild(t)}function Tt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function v(t){return document.createElement(t)}function X(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function A(t){return document.createTextNode(t)}function wt(){return A(" ")}function vt(){return A("")}function At(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function kt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Ct(t){return t.dataset.svelteH}function Ht(t){return Array.from(t.childNodes)}function S(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function D(t,e,n,i,r=!1){S(t);const l=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const o=t[s];if(e(o)){const c=n(o);return c===void 0?t.splice(s,1):t[s]=c,r||(t.claim_info.last_index=s),o}}for(let s=t.claim_info.last_index-1;s>=0;s--){const o=t[s];if(e(o)){const c=n(o);return c===void 0?t.splice(s,1):t[s]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,o}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function Y(t,e,n,i){return D(t,r=>r.nodeName===e,r=>{const l=[];for(let s=0;s<r.attributes.length;s++){const o=r.attributes[s];n[o.name]||l.push(o.name)}l.forEach(s=>r.removeAttribute(s))},()=>i(e))}function Mt(t,e,n){return Y(t,e,n,v)}function Z(t,e){return D(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>A(e),!0)}function St(t){return Z(t," ")}function C(t,e,n){for(let i=n;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===e)return i}return-1}function Dt(t,e){const n=C(t,"HTML_TAG_START",0),i=C(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new b(e);S(t);const r=t.splice(n,i-n+1);N(r[0]),N(r[r.length-1]);const l=r.slice(1,r.length-1);if(l.length===0)return new b(e);for(const s of l)s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new b(e,l)}function Lt(t,e){e=""+e,t.data!==e&&(t.data=e)}function jt(t,e){t.value=e??""}function Pt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function $(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}function qt(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const l=r.textContent.trim();l===`HEAD_${t}_END`?(i-=1,n.push(r)):l===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}class tt{constructor(e=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=X(n.nodeName):this.e=v(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Q(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(N)}}class b extends tt{constructor(n=!1,i){super(n);f(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)V(this.t,this.n[i],n)}}function Bt(t,e){return new t(e)}let y;function x(t){y=t}function m(){if(!y)throw new Error("Function called outside component initialization");return y}function Rt(t){m().$$.on_mount.push(t)}function Ot(t){m().$$.after_update.push(t)}function Ft(){const t=m();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const l=$(e,n,{cancelable:i});return r.slice().forEach(s=>{s.call(t,l)}),!l.defaultPrevented}return!0}}function Gt(t,e){return m().$$.context.set(t,e),e}function zt(t){return m().$$.context.get(t)}const d=[],H=[];let h=[];const T=[],L=Promise.resolve();let w=!1;function et(){w||(w=!0,L.then(it))}function It(){return et(),L}function nt(t){h.push(t)}function Ut(t){T.push(t)}const E=new Set;let _=0;function it(){if(_!==0)return;const t=y;do{try{for(;_<d.length;){const e=d[_];_++,x(e),rt(e.$$)}}catch(e){throw d.length=0,_=0,e}for(x(null),d.length=0,_=0;H.length;)H.pop()();for(let e=0;e<h.length;e+=1){const n=h[e];E.has(n)||(E.add(n),n())}h.length=0}while(d.length);for(;T.length;)T.pop()();w=!1,E.clear(),x(t)}function rt(t){if(t.fragment!==null){t.update(),F(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(nt)}}function Wt(t){const e=[],n=[];h.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),h=e}export{R as $,It as A,qt as B,Ct as C,Tt as D,W as E,Nt as F,F as G,ot as H,nt as I,$ as J,ct as K,lt as L,it as M,ft as N,Wt as O,y as P,x as Q,O as R,d as S,et as T,xt as U,Et as V,bt as W,At as X,jt as Y,Ut as Z,gt as _,wt as a,yt as a0,zt as a1,b as a2,Dt as a3,Ft as a4,Gt as a5,ht as b,St as c,N as d,dt as e,v as f,pt as g,Mt as h,V as i,Ht as j,Z as k,K as l,Lt as m,B as n,_t as o,vt as p,at as q,kt as r,ut as s,A as t,mt as u,Ot as v,Rt as w,Pt as x,H as y,Bt as z};