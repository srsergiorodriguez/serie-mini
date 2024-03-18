import{t as V,S as P,i as x,b as R,c as W,a as X,m as Y,d as Z}from"./index.jOx7AaNw.js";import{E as ee,s as L,b as U,f as p,h as _,j as b,d as u,r as E,i as k,u as B,g as K,e as Q,C as te,n as S,t as G,a as J,k as I,c as O,l as d}from"./scheduler.Ku3LWE4j.js";import{b as M}from"./paths.fnXjubxN.js";function de(l){return(l==null?void 0:l.length)!==void 0?l:Array.from(l)}function me(l,e){l.d(1),e.delete(l.key)}function pe(l,e,a,i,t,s,n,z,h,v,f,A){let c=l.length,m=s.length,o=c;const $={};for(;o--;)$[l[o].key]=o;const w=[],C=new Map,T=new Map,H=[];for(o=m;o--;){const r=A(t,s,o),g=a(r);let y=n.get(g);y?i&&H.push(()=>y.p(r,e)):(y=v(g,r),y.c()),C.set(g,w[o]=y),g in $&&T.set(g,Math.abs(o-$[g]))}const j=new Set,q=new Set;function F(r){V(r,1),r.m(z,f),n.set(r.key,r),f=r.first,m--}for(;c&&m;){const r=w[m-1],g=l[c-1],y=r.key,D=g.key;r===g?(f=r.first,c--,m--):C.has(D)?!n.has(y)||j.has(y)?F(r):q.has(D)?c--:T.get(y)>T.get(D)?(q.add(y),F(r)):(j.add(D),c--):(h(g,n),c--)}for(;c--;){const r=l[c];C.has(r.key)||h(r,n)}for(;m;)F(w[m-1]);return ee(H),w}function se(l){let e,a;const i=l[1].default,t=U(i,l,l[0],null);return{c(){e=p("section"),t&&t.c(),this.h()},l(s){e=_(s,"SECTION",{class:!0});var n=b(e);t&&t.l(n),n.forEach(u),this.h()},h(){E(e,"class","general")},m(s,n){k(s,e,n),t&&t.m(e,null),a=!0},p(s,[n]){t&&t.p&&(!a||n&1)&&B(t,i,s,s[0],a?Q(i,s[0],n,null):K(s[0]),null)},i(s){a||(V(t,s),a=!0)},o(s){R(t,s),a=!1},d(s){s&&u(e),t&&t.d(s)}}}function ae(l,e,a){let{$$slots:i={},$$scope:t}=e;return l.$$set=s=>{"$$scope"in s&&a(0,t=s.$$scope)},[t,i]}class _e extends P{constructor(e){super(),x(this,e,ae,se,L,{})}}function le(l){let e,a=`<ul class="menu-list no-select svelte-1cz1myu"><li class="svelte-1cz1myu"><a href="${M}" class="svelte-1cz1myu">Portada</a></li> <li class="svelte-1cz1myu"><a href="${M}/pages" class="svelte-1cz1myu">Explorar</a></li> <li class="svelte-1cz1myu"><a href="${M}/tour" class="svelte-1cz1myu">Tour</a></li> <li class="svelte-1cz1myu"><a href="${M}/metadata" class="svelte-1cz1myu">Metadatos</a></li></ul>`;return{c(){e=p("nav"),e.innerHTML=a},l(i){e=_(i,"NAV",{"data-svelte-h":!0}),te(e)!=="svelte-13ek70"&&(e.innerHTML=a)},m(i,t){k(i,e,t)},p:S,i:S,o:S,d(i){i&&u(e)}}}class ne extends P{constructor(e){super(),x(this,e,null,le,L,{})}}const N={lang:"es",base:"https://ssergiorodriguezz.github.io",baseurl:"/serie-mini",title:"Serie L",subtitle:"Una mini colección digital",credits:"Hecho con Serie L",copyright:"Todos los derechos reservados, 2024",pages:{iiifViewer:!0,metadataToShow:[{key:"label",label:"Label",type:"text"},{key:"autor",label:"Autor",type:"text"}],metadataToIndex:["fecha"]}};function ie(l){let e,a,i,t,s=N.title+"",n,z,h,v=N.subtitle+"",f,A,c,m;return c=new ne({}),{c(){e=p("header"),a=p("div"),i=p("h1"),t=p("a"),n=G(s),z=J(),h=p("span"),f=G(v),A=J(),W(c.$$.fragment),this.h()},l(o){e=_(o,"HEADER",{class:!0});var $=b(e);a=_($,"DIV",{});var w=b(a);i=_(w,"H1",{class:!0});var C=b(i);t=_(C,"A",{href:!0,class:!0});var T=b(t);n=I(T,s),T.forEach(u),C.forEach(u),z=O(w),h=_(w,"SPAN",{class:!0});var H=b(h);f=I(H,v),H.forEach(u),w.forEach(u),A=O($),X(c.$$.fragment,$),$.forEach(u),this.h()},h(){E(t,"href",M),E(t,"class","svelte-nz2s45"),E(i,"class","main-title svelte-nz2s45"),E(h,"class","main-subtitle"),E(e,"class","main-header svelte-nz2s45")},m(o,$){k(o,e,$),d(e,a),d(a,i),d(i,t),d(t,n),d(a,z),d(a,h),d(h,f),d(e,A),Y(c,e,null),m=!0},p:S,i(o){m||(V(c.$$.fragment,o),m=!0)},o(o){R(c.$$.fragment,o),m=!1},d(o){o&&u(e),Z(c)}}}class ve extends P{constructor(e){super(),x(this,e,null,ie,L,{})}}function ce(l){let e,a;const i=l[1].default,t=U(i,l,l[0],null);return{c(){e=p("section"),t&&t.c(),this.h()},l(s){e=_(s,"SECTION",{class:!0});var n=b(e);t&&t.l(n),n.forEach(u),this.h()},h(){E(e,"class","content-slot svelte-p67v15")},m(s,n){k(s,e,n),t&&t.m(e,null),a=!0},p(s,[n]){t&&t.p&&(!a||n&1)&&B(t,i,s,s[0],a?Q(i,s[0],n,null):K(s[0]),null)},i(s){a||(V(t,s),a=!0)},o(s){R(t,s),a=!1},d(s){s&&u(e),t&&t.d(s)}}}function oe(l,e,a){let{$$slots:i={},$$scope:t}=e;return l.$$set=s=>{"$$scope"in s&&a(0,t=s.$$scope)},[t,i]}class $e extends P{constructor(e){super(),x(this,e,oe,ce,L,{})}}function re(l){let e,a,i=N.credits+"",t,s,n,z=N.copyright+"",h;return{c(){e=p("header"),a=p("p"),t=G(i),s=J(),n=p("p"),h=G(z),this.h()},l(v){e=_(v,"HEADER",{class:!0});var f=b(e);a=_(f,"P",{class:!0});var A=b(a);t=I(A,i),A.forEach(u),s=O(f),n=_(f,"P",{class:!0});var c=b(n);h=I(c,z),c.forEach(u),f.forEach(u),this.h()},h(){E(a,"class","main-title no-select"),E(n,"class","main-title no-select"),E(e,"class","main-footer svelte-1mbdmk8")},m(v,f){k(v,e,f),d(e,a),d(a,t),d(e,s),d(e,n),d(n,h)},p:S,i:S,o:S,d(v){v&&u(e)}}}class ge extends P{constructor(e){super(),x(this,e,null,re,L,{})}}const ye=[{pid:"AdriaenCollaert",label:"America Tortuga",autor:"Adriaen Collaert",fecha:"1586"},{pid:"JohannSadeler",label:"America Loro",autor:"Johann Sadeler",fecha:"1581"},{pid:"PhilipsGalle",label:"America Composición",autor:"Philips Galle",fecha:"1547"},{pid:"PhilipsGalle2",label:"America Cabeza",autor:"Philips Galle",fecha:"1585"}];export{$e as C,_e as D,ge as F,ve as H,N as c,me as d,de as e,ye as m,pe as u};
