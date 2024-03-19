import{b as V,t as j,S as C,i as D,c as W,a as X,m as Y,d as Z}from"./index.BOwWw9MP.js";import{G as ee,s as N,b as B,f as $,h as g,j as b,d as u,r as v,i as P,u as J,g as K,e as Q,C as te,n as M,t as z,a as L,k as F,c as O,l as d}from"./scheduler.D8yfAcz2.js";import{b as T}from"./paths.CyuiMlvz.js";function he(l){return(l==null?void 0:l.length)!==void 0?l:Array.from(l)}function me(l,e){l.d(1),e.delete(l.key)}function pe(l,e){V(l,1,1,()=>{e.delete(l.key)})}function _e(l,e,a,n,t,s,i,m,p,S,h,_){let r=l.length,f=s.length,o=r;const y={};for(;o--;)y[l[o].key]=o;const k=[],A=new Map,H=new Map,x=[];for(o=f;o--;){const c=_(t,s,o),E=a(c);let w=i.get(E);w?n&&x.push(()=>w.p(c,e)):(w=S(E,c),w.c()),A.set(E,k[o]=w),E in y&&H.set(E,Math.abs(o-y[E]))}const q=new Set,U=new Set;function G(c){j(c,1),c.m(m,h),i.set(c.key,c),h=c.first,f--}for(;r&&f;){const c=k[f-1],E=l[r-1],w=c.key,I=E.key;c===E?(h=c.first,r--,f--):A.has(I)?!i.has(w)||q.has(w)?G(c):U.has(I)?r--:H.get(w)>H.get(I)?(U.add(w),G(c)):(q.add(I),r--):(p(E,i),r--)}for(;r--;){const c=l[r];A.has(c.key)||p(c,i)}for(;f;)G(k[f-1]);return ee(x),k}function se(l){let e,a;const n=l[1].default,t=B(n,l,l[0],null);return{c(){e=$("section"),t&&t.c(),this.h()},l(s){e=g(s,"SECTION",{class:!0});var i=b(e);t&&t.l(i),i.forEach(u),this.h()},h(){v(e,"class","general")},m(s,i){P(s,e,i),t&&t.m(e,null),a=!0},p(s,[i]){t&&t.p&&(!a||i&1)&&J(t,n,s,s[0],a?Q(n,s[0],i,null):K(s[0]),null)},i(s){a||(j(t,s),a=!0)},o(s){V(t,s),a=!1},d(s){s&&u(e),t&&t.d(s)}}}function ae(l,e,a){let{$$slots:n={},$$scope:t}=e;return l.$$set=s=>{"$$scope"in s&&a(0,t=s.$$scope)},[t,n]}class ve extends C{constructor(e){super(),D(this,e,ae,se,N,{})}}function le(l){let e,a=`<ul class="menu-list no-select svelte-sibp3f"><li class="svelte-sibp3f"><a class="silent-link" href="${T}">Portada</a></li> <li class="svelte-sibp3f"><a class="silent-link" href="${T}/pages#main-title">Explorar</a></li> <li class="svelte-sibp3f"><a class="silent-link" href="${T}/tour#main-title">Tour</a></li> <li class="svelte-sibp3f"><a class="silent-link" href="${T}/metadata#main-title">Metadatos</a></li></ul>`;return{c(){e=$("nav"),e.innerHTML=a},l(n){e=g(n,"NAV",{"data-svelte-h":!0}),te(e)!=="svelte-un2p5d"&&(e.innerHTML=a)},m(n,t){P(n,e,t)},p:M,i:M,o:M,d(n){n&&u(e)}}}class ne extends C{constructor(e){super(),D(this,e,null,le,N,{})}}const R={lang:"es",base:"https://srsergiorodriguez.github.io",baseurl:"/serie-mini",title:"Serie Mini",subtitle:"Una plantilla para mini colecciones digitales",credits:"Por Sergio Rodríguez Gómez. Hecho con Serie Mini",copyright:"Todos los derechos reservados, 2024",pages:{iiifViewer:!0,metadataToShow:[{key:"label",label:"Nombre",type:"text"},{key:"autor",label:"Autor",type:"text"},{key:"fecha",label:"Fecha",type:"text"}],metadataToIndex:["label","autor","fecha"]}};function ie(l){let e,a,n,t,s=R.title+"",i,m,p,S=R.subtitle+"",h,_,r,f;return r=new ne({}),{c(){e=$("header"),a=$("div"),n=$("h1"),t=$("a"),i=z(s),m=L(),p=$("span"),h=z(S),_=L(),W(r.$$.fragment),this.h()},l(o){e=g(o,"HEADER",{class:!0});var y=b(e);a=g(y,"DIV",{});var k=b(a);n=g(k,"H1",{class:!0,id:!0});var A=b(n);t=g(A,"A",{href:!0,class:!0});var H=b(t);i=F(H,s),H.forEach(u),A.forEach(u),m=O(k),p=g(k,"SPAN",{class:!0});var x=b(p);h=F(x,S),x.forEach(u),k.forEach(u),_=O(y),X(r.$$.fragment,y),y.forEach(u),this.h()},h(){v(t,"href",T),v(t,"class","svelte-uloeko"),v(n,"class","main-title svelte-uloeko"),v(n,"id","main-title"),v(p,"class","main-subtitle"),v(e,"class","main-header svelte-uloeko")},m(o,y){P(o,e,y),d(e,a),d(a,n),d(n,t),d(t,i),d(a,m),d(a,p),d(p,h),d(e,_),Y(r,e,null),f=!0},p:M,i(o){f||(j(r.$$.fragment,o),f=!0)},o(o){V(r.$$.fragment,o),f=!1},d(o){o&&u(e),Z(r)}}}class $e extends C{constructor(e){super(),D(this,e,null,ie,N,{})}}function oe(l){let e,a;const n=l[1].default,t=B(n,l,l[0],null);return{c(){e=$("section"),t&&t.c(),this.h()},l(s){e=g(s,"SECTION",{class:!0});var i=b(e);t&&t.l(i),i.forEach(u),this.h()},h(){v(e,"class","content-slot svelte-p67v15")},m(s,i){P(s,e,i),t&&t.m(e,null),a=!0},p(s,[i]){t&&t.p&&(!a||i&1)&&J(t,n,s,s[0],a?Q(n,s[0],i,null):K(s[0]),null)},i(s){a||(j(t,s),a=!0)},o(s){V(t,s),a=!1},d(s){s&&u(e),t&&t.d(s)}}}function re(l,e,a){let{$$slots:n={},$$scope:t}=e;return l.$$set=s=>{"$$scope"in s&&a(0,t=s.$$scope)},[t,n]}class ge extends C{constructor(e){super(),D(this,e,re,oe,N,{})}}function ce(l){let e,a,n,t=R.credits+"",s,i,m,p=R.copyright+"",S;return{c(){e=$("header"),a=$("a"),n=$("p"),s=z(t),i=L(),m=$("p"),S=z(p),this.h()},l(h){e=g(h,"HEADER",{class:!0});var _=b(e);a=g(_,"A",{href:!0});var r=b(a);n=g(r,"P",{class:!0});var f=b(n);s=F(f,t),f.forEach(u),r.forEach(u),i=O(_),m=g(_,"P",{class:!0});var o=b(m);S=F(o,p),o.forEach(u),_.forEach(u),this.h()},h(){v(n,"class","main-title no-select"),v(a,"href",T+"/credits"),v(m,"class","main-title no-select"),v(e,"class","main-footer svelte-jm9aa3")},m(h,_){P(h,e,_),d(e,a),d(a,n),d(n,s),d(e,i),d(e,m),d(m,S)},p:M,i:M,o:M,d(h){h&&u(e)}}}class be extends C{constructor(e){super(),D(this,e,null,ce,N,{})}}export{ge as C,ve as D,be as F,$e as H,R as c,me as d,he as e,pe as o,_e as u};
