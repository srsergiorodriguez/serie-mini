import{s as S,n as _,d as q}from"../chunks/scheduler.CrsDffe0.js";import{S as x,i as j,e as f,n as d,s as k,f as g,o as h,p as v,k as u,h as y,j as m,q as $,r as E}from"../chunks/index.D8ICPSc6.js";import{s as C}from"../chunks/entry.CD1lD-ha.js";const H=()=>{const s=C;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},P={subscribe(s){return H().page.subscribe(s)}};function w(s){var b;let t,r=s[0].status+"",o,n,i,p=((b=s[0].error)==null?void 0:b.message)+"",l;return{c(){t=f("h1"),o=d(r),n=k(),i=f("p"),l=d(p)},l(e){t=g(e,"H1",{});var a=h(t);o=v(a,r),a.forEach(u),n=y(e),i=g(e,"P",{});var c=h(i);l=v(c,p),c.forEach(u)},m(e,a){m(e,t,a),$(t,o),m(e,n,a),m(e,i,a),$(i,l)},p(e,[a]){var c;a&1&&r!==(r=e[0].status+"")&&E(o,r),a&1&&p!==(p=((c=e[0].error)==null?void 0:c.message)+"")&&E(l,p)},i:_,o:_,d(e){e&&(u(t),u(n),u(i))}}}function z(s,t,r){let o;return q(s,P,n=>r(0,o=n)),[o]}let F=class extends x{constructor(t){super(),j(this,t,z,w,S,{})}};export{F as component};