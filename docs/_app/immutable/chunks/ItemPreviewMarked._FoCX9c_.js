import{s as A,p as q,i as w,n as E,d as o,f as v,h as p,q as b,r as l,a as G,t as P,j as k,c as S,k as C,l as d,m as D}from"./scheduler.Ku3LWE4j.js";import{S as H,i as N}from"./index.jOx7AaNw.js";import{b as m}from"./paths.D5cl698a.js";import{m as M}from"./metadata.BJdOPDzm.js";function V(i){let e,r;return{c(){e=v("img"),this.h()},l(t){e=p(t,"IMG",{src:!0,title:!0,alt:!0,class:!0}),this.h()},h(){b(e.src,r=i[0])||l(e,"src",r),l(e,"title",i[1]),l(e,"alt",i[2]),l(e,"class","svelte-4sl1th")},m(t,a){w(t,e,a)},p(t,a){a&1&&!b(e.src,r=t[0])&&l(e,"src",r),a&2&&l(e,"title",t[1]),a&4&&l(e,"alt",t[2])},d(t){t&&o(e)}}}function z(i){let e,r,t,a,s,f,_,h=M.find(i[5]).label+"",n,g;return{c(){e=v("div"),r=v("a"),t=v("img"),f=G(),_=v("a"),n=P(h),this.h()},l(u){e=p(u,"DIV",{class:!0});var c=k(e);r=p(c,"A",{href:!0,class:!0});var I=k(r);t=p(I,"IMG",{src:!0,title:!0,alt:!0,class:!0}),I.forEach(o),f=S(c),_=p(c,"A",{href:!0,class:!0});var j=k(_);n=C(j,h),j.forEach(o),c.forEach(o),this.h()},h(){b(t.src,a=m+"/data/raw_images/"+i[3]+".jpg")||l(t,"src",a),l(t,"title",i[1]),l(t,"alt",i[2]),l(t,"class","svelte-4sl1th"),l(r,"href",s=m+"/pages/"+i[3]),l(r,"class","svelte-4sl1th"),l(_,"href",g=m+"/pages/"+i[3]),l(_,"class","svelte-4sl1th"),l(e,"class","preview-item svelte-4sl1th")},m(u,c){w(u,e,c),d(e,r),d(r,t),d(e,f),d(e,_),d(_,n)},p(u,c){c&8&&!b(t.src,a=m+"/data/raw_images/"+u[3]+".jpg")&&l(t,"src",a),c&2&&l(t,"title",u[1]),c&4&&l(t,"alt",u[2]),c&8&&s!==(s=m+"/pages/"+u[3])&&l(r,"href",s),c&8&&h!==(h=M.find(u[5]).label+"")&&D(n,h),c&8&&g!==(g=m+"/pages/"+u[3])&&l(_,"href",g)},d(u){u&&o(e)}}}function B(i){let e;function r(s,f){return s[4]?z:V}let t=r(i),a=t(i);return{c(){a.c(),e=q()},l(s){a.l(s),e=q()},m(s,f){a.m(s,f),w(s,e,f)},p(s,[f]){t===(t=r(s))&&a?a.p(s,f):(a.d(1),a=t(s),a&&(a.c(),a.m(e.parentNode,e)))},i:E,o:E,d(s){s&&o(e),a.d(s)}}}function F(i,e,r){let{href:t=""}=e,{title:a=void 0}=e,{text:s=""}=e,f=t,_=!1;/^\!/.test(t)&&(f=f.replace(/^\!/,""),_=!0);const h=n=>n.pid===f;return i.$$set=n=>{"href"in n&&r(0,t=n.href),"title"in n&&r(1,a=n.title),"text"in n&&r(2,s=n.text)},[t,a,s,f,_,h]}class Q extends H{constructor(e){super(),N(this,e,F,B,A,{href:0,title:1,text:2})}}export{Q as I};