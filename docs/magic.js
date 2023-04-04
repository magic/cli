function e(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){var n,i;n=e,i=r[t],t in n?Object.defineProperty(n,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[t]=i})}return e}function t(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r})(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}),e}function r(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}(()=>{let{h:n,app:i}=(()=>{var e={},t=[],r=t.map,n=Array.isArray,i="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout,o=function(e){var t="";if("string"==typeof e)return e;if(n(e)&&e.length>0)for(var r,i=0;i<e.length;i++)""!==(r=o(e[i]))&&(t+=(t&&" ")+r);else for(var i in e)e[i]&&(t+=(t&&" ")+i);return t},s=function(e,t){var r={};for(var n in e)r[n]=e[n];for(var n in t)r[n]=t[n];return r},a=function(e){return e.reduce(function(e,t){return e.concat(t&&!0!==t?"function"==typeof t[0]?[t]:a(t):0)},t)},l=function(e,t){if(e!==t)for(var r in s(e,t)){var i,o;if(e[r]!==t[r]&&(i=e[r],o=t[r],!(n(i)&&n(o))||i[0]!==o[0]||"function"!=typeof i[0]))return!0;t[r]=e[r]}},c=function(e,t,r){for(var n,i,o=0,s=[];o<e.length||o<t.length;o++)n=e[o],s.push((i=t[o])?!n||i[0]!==n[0]||l(i[1],n[1])?[i[0],i[1],i[0](r,i[1]),n&&n[2]()]:n:n&&n[2]());return s},p=function(e,t,r,n,i,a){if("key"===t);else if("style"===t)for(var l in s(r,n))r=null==n||null==n[l]?"":n[l],"-"===l[0]?e[t].setProperty(l,r):e[t][l]=r;else"o"===t[0]&&"n"===t[1]?((e.actions||(e.actions={}))[t=t.slice(2)]=n)?r||e.addEventListener(t,i):e.removeEventListener(t,i):!a&&"list"!==t&&t in e?e[t]=null==n?"":n:null!=n&&!1!==n&&("class"!==t||(n=o(n)))?e.setAttribute(t,n):e.removeAttribute(t)},d=function(e,t,r){var n=e.props,i=3===e.type?document.createTextNode(e.name):(r=r||"svg"===e.name)?document.createElementNS("http://www.w3.org/2000/svg",e.name,{is:n.is}):document.createElement(e.name,{is:n.is});for(var o in n)p(i,o,null,n[o],t,r);for(var s=0,a=e.children.length;s<a;s++)i.appendChild(d(e.children[s]=h(e.children[s]),t,r));return e.node=i},u=function(e){return null==e?null:e.key},m=function(e,t,r,n,i,o){if(r===n);else if(null!=r&&3===r.type&&3===n.type)r.name!==n.name&&(t.nodeValue=n.name);else if(null==r||r.name!==n.name)t=e.insertBefore(d(n=h(n),i,o),t),null!=r&&e.removeChild(r.node);else{var a,l,c,g,f=r.props,v=n.props,y=r.children,b=n.children,w=0,x=0,k=y.length-1,j=b.length-1;for(var O in o=o||"svg"===n.name,s(f,v))("value"===O||"selected"===O||"checked"===O?t[O]:f[O])!==v[O]&&p(t,O,f[O],v[O],i,o);for(;x<=j&&w<=k&&null!=(c=u(y[w]))&&c===u(b[x]);)m(t,y[w].node,y[w],b[x]=h(b[x++],y[w++]),i,o);for(;x<=j&&w<=k&&null!=(c=u(y[k]))&&c===u(b[j]);)m(t,y[k].node,y[k],b[j]=h(b[j--],y[k--]),i,o);if(w>k)for(;x<=j;)t.insertBefore(d(b[x]=h(b[x++]),i,o),(l=y[w])&&l.node);else if(x>j)for(;w<=k;)t.removeChild(y[w++].node);else{for(var O=w,C={},$={};O<=k;O++)null!=(c=y[O].key)&&(C[c]=y[O]);for(;x<=j;){if(c=u(l=y[w]),g=u(b[x]=h(b[x],l)),$[c]||null!=g&&g===u(y[w+1])){null==c&&t.removeChild(l.node),w++;continue}null==g||1===r.type?(null==c&&(m(t,l&&l.node,l,b[x],i,o),x++),w++):(c===g?(m(t,l.node,l,b[x],i,o),$[g]=!0,w++):null!=(a=C[g])?(m(t,t.insertBefore(a.node,l&&l.node),a,b[x],i,o),$[g]=!0):m(t,l&&l.node,null,b[x],i,o),x++)}for(;w<=k;)null==u(l=y[w++])&&t.removeChild(l.node);for(var O in C)null==$[O]&&t.removeChild(C[O].node)}}return n.node=t},g=function(e,t){for(var r in e)if(e[r]!==t[r])return!0;for(var r in t)if(e[r]!==t[r])return!0},f=function(e){return"object"==typeof e?e:y(e)},h=function(e,t){return 2===e.type?((!t||!t.lazy||g(t.lazy,e.lazy))&&((t=f(e.lazy.view(e.lazy))).lazy=e.lazy),t):e},v=function(e,t,r,n,i,o){return{name:e,props:t,children:r,node:n,type:o,key:i}},y=function(r,n){return v(r,e,t,n,void 0,3)},b=function(t){return 3===t.nodeType?y(t.nodeValue,t):v(t.nodeName.toLowerCase(),e,r.call(t.childNodes,b),t,void 0,1)};return{h:function(t,r){for(var i,o=[],s=[],a=arguments.length;a-- >2;)o.push(arguments[a]);for(;o.length>0;)if(n(i=o.pop()))for(var a=i.length;a-- >0;)o.push(i[a]);else!1===i||!0===i||null==i||s.push(f(i));return r=r||e,"function"==typeof t?t(r,s):v(t,r,s,void 0,r.key)},app:function(e){var t={},r=!1,o=e.view,s=e.node,l=s&&b(s),p=e.subscriptions,d=[],u=function(e){v(this.actions[e.type],e)},g=function(e){return t!==e&&(t=e,p&&(d=c(d,a([p(t)]),v)),o&&!r&&i(y,r=!0)),t};let{middleware:h=e=>e}=e,v=h((e,r)=>"function"==typeof e?v(e(t,r)):n(e)?"function"==typeof e[0]||n(e[0])?v(e[0],"function"==typeof e[1]?e[1](r):e[1]):(a(e.slice(1)).map(function(e){e&&e[0](v,e[1])},g(e[0])),t):g(e));var y=function(){r=!1,s=m(s.parentNode,s,l,l=f(o(t)),u)};v(e.init)}}})(),o=e=>(t={},r)=>{let i=(e,...t)=>t.some(t=>t===typeof e);if(i(r,"undefined")){if(t.props)return n(e,{},[t]);i(t,"string","number","function")||Array.isArray(t)?(r=t,t={}):i(t.View,"function")&&(r=t.View,t={})}return n(e,t,r)},s=o("a");o("abbr"),o("address"),o("animate"),o("animateMotion"),o("animateTransform"),o("area"),o("article"),o("aside"),o("audio"),o("b"),o("base"),o("bdi"),o("bdo"),o("blockquote"),o("body"),o("br");let a=o("button");o("canvas"),o("caption");let l=o("circle");o("cite"),o("clipPath");let c=o("code");o("col"),o("colgroup"),o("data"),o("datalist"),o("dd"),o("defs"),o("del"),o("desc"),o("description"),o("details"),o("dfn"),o("dialog"),o("discard");let p=o("div");o("dl"),o("dt"),o("ellipse"),o("em"),o("embed"),o("feBlend"),o("feColorMatrix"),o("feComponentTransfer"),o("feComposite"),o("feConvolveMatrix"),o("feDiffuseLighting"),o("feDisplacementMap"),o("feDistantLight"),o("feDropShadow"),o("feFlood"),o("feFuncA"),o("feFuncB"),o("feFuncG"),o("feFuncR"),o("feGaussianBlur"),o("feImage"),o("feMerge"),o("feMergeNode"),o("feMorphology"),o("feOffset"),o("fePointLight"),o("feSpecularLighting"),o("feSpotLight"),o("feTile"),o("feTurbulence"),o("fieldset"),o("figcaption"),o("figure"),o("filter");let d=o("footer");o("foreignObject"),o("form");let u=o("g"),m=o("h1"),g=o("h2"),f=o("h3"),h=o("h4"),v=o("h5");o("h6"),o("hatch"),o("hatchpath"),o("head");let y=o("header");o("hgroup"),o("hr"),o("html"),o("i"),o("iframe"),o("image");let b=o("img"),w=o("input");o("ins"),o("kbd"),o("label"),o("legend");let x=o("li");o("line"),o("linearGradient"),o("link");let k=o("main");o("map"),o("mark"),o("marker"),o("mask"),o("mesh"),o("meshgradient"),o("meshpatch"),o("meshrow"),o("meta"),o("metadata"),o("meter"),o("mpath");let j=o("nav");o("noscript"),o("object"),o("ol"),o("optgroup"),o("option"),o("output");let O=o("p");o("param");let C=o("path");o("pattern"),o("picture"),o("polygon"),o("polyline");let $=o("pre");o("progress"),o("q"),o("radialGradient"),o("rb"),o("rect"),o("rp"),o("rt"),o("rtc"),o("ruby"),o("s"),o("samp"),o("script"),o("section"),o("select"),o("set"),o("small"),o("solidcolor"),o("source");let A=o("span");o("stop"),o("strong"),o("style"),o("sub"),o("summary"),o("sup");let M=o("svg");o("symbol"),o("table"),o("tbody"),o("td"),o("template"),o("text"),o("textPath"),o("textarea"),o("tfoot"),o("th"),o("thead"),o("time"),o("title"),o("tr"),o("track"),o("tspan"),o("u");let P=o("ul");o("unknown"),o("use"),o("video"),o("view"),o("wbr");let S=()=>p({class:"Credits"},["made with a few bits of ",N({to:"https://magic.github.io/",target:"_blank",rel:"noopener"},"magic")]),q=(e,t=[])=>d({class:"Footer"},[p({class:"Container"},[S(),t])]),z=e=>{if("string"==typeof e)e={project:e};else if(!e.project)return;let{branch:t="master",host:r="github"}=e,{project:n=!1}=e,i="",o=n;n.startsWith("@")?(i="@",n=n.substr(1)):o=n.split("/")[1];let s=[["npm",(e=n)=>e&&{to:`https://www.npmjs.com/package/${o}`,src:`https://img.shields.io/npm/v/${i}${e}?color=blue`}],["node",(e=n)=>e&&{src:`https://img.shields.io/node/v/${i}${e}?color=blue`}],["license",(e=n)=>e&&{src:`https://img.shields.io/npm/l/${i}${e}?color=blue`}],["travis",(e=n)=>e&&{to:`https://travis-ci.com/${e}`,src:`https://img.shields.io/travis/com/${e}/${t}`}],["appveyor",(e=n)=>{if(e){let[r,n]=e.split("/");return{to:`https://ci.appveyor.com/project/${r=r.replace(/-/g,"")}/${n}/branch/${t}`,src:`https://img.shields.io/appveyor/ci/${r}/${n}/${t}.svg`}}}],["coveralls",(e=n)=>({to:`https://coveralls.io/${r}/${e}`,src:`https://img.shields.io/coveralls/${r}/${e}/${t}.svg`})],["snyk",(e=n)=>e&&{to:`https://snyk.io/test/${r}/${e}`,src:`https://img.shields.io/snyk/vulnerabilities/github/${e}.svg`}]].map(([t,r])=>r(e[t]));if(s.length)return P({class:"GitBadges"},s.map(({to:e,src:t})=>{if(!t)return;let r=F({src:t,height:"23"});return e?x(N({to:e},r)):x(r)}))},E=(e={},t=[])=>{let{logo:r,menu:n,logotext:i,hash:o,url:s}=e;if(r||n||i)return y({class:"Header"},[W(),i&&O(i),n&&T({url:s,hash:o,menu:n}),t])},F=e=>{if("string"==typeof e&&(e={src:e}),e.src)return e.alt||(e.title?e.alt=e.title:(e.role="presentation",e.alt="",e.loading=e.loading||"lazy")),b(e)},L=(e={})=>M({class:"LightSwitch icon",onclick:V.changeTheme,height:25,width:25,viewBox:"0 0 352 460"},[C({d:"M149 48C96 48 48 95 47 143c-1 13 19 17 20 0-1-35 48-75 83-75 15 0 12-22-1-20z"}),C({d:"M176 0C74 0 0 83 0 176c9 91 84 118 100 204h20c-16-92-97-138-100-204C22 70 105 21 176 20zM95 400c2 68 20 48 40 60h82c20-12 38 8 40-60z"}),C({d:"M175 0c102 0 177 83 177 176-9 91-86 118-102 204h-20c16-92 99-138 102-204-2-106-86-155-157-156z"})]),N=(e,t)=>{var{to:n,action:i=V.go,text:o}=e,a=r(e,["to","action","text"]);let{href:l,nofollow:c,noreferrer:p}=a,d=r(a,["href","nofollow","noreferrer"]);n=n||l||"",d.href=n,o&&t?o=[o,t]:o||(o=t||n);let u="/"===n[0]||"#"===n[0];return u?d.onclick=[i,_.preventDefault]:(d.target="_blank",d.rel="noopener",c&&(d.rel+=" nofollow"),p&&(d.rel+=" noreferrer")),s(d,o)},W=()=>N({to:"/cli/",class:"Logo"},[M({viewBox:"0 0 512 444"},[C({d:"M512 444L256 0 0 444z",fill:"#663695"}),l({cx:"256",cy:"294",r:"130",fill:"#fff"}),l({cx:"256",cy:"281",r:"40",fill:"#663695"}),C({d:"M256 350v44m24-44l1 13c1 27 29 27 29-7m-160-72s46-47 106-47c59 0 106 47 106 47s-47 43-106 43c-60 0-106-43-106-43zm65-75a134 134 0 0189 2",class:"stroke"}),C({d:"M256 81v53m184 270l-43-29M72 404l43-29",class:"stroke white"})])]),T=(r={})=>{let{collapse:n=!0,menu:i,hash:o}=r,{class:s="",url:a}=r;return s.includes("Menu")||(s=`Menu ${s}`.trim()),o&&!a.endsWith(o)&&(a+=`#${o}`),j({className:s},P(i.map(r=>B(t(e({},r),{url:a,collapse:n})))))},B=t=>{let{collapse:n,items:i=[],text:o,url:s}=t,a=r(t,["collapse","items","text","url"]),l={class:{}},{to:c}=a;c===s&&(l.class.active=!0);let p=[],d=!n||s.includes(c);return d&&i.length&&(p=P(i.map(t=>B(e({url:s,collapse:n},t))))),x(l,[c?N(a,o):A(a,o),p])},D=({nospy:e={},cookies:t=[]})=>{let{show:r,title:n="Privacy Notice",content:i="This app neither saves, collects, nor shares any data about you.",buttonText:o="Awesome!"}=e;return r?p({class:"NoSpy"},[p({class:"Background",onclick:V.nospy.toggle}),p({class:"Container"},[n&&f(n),i&&O(i),w({onclick:V.nospy.toggle,value:o,type:"button"})])]):p({class:"NoSpy"},M({class:"icon",onclick:V.nospy.toggle,width:"25",height:"25",viewBox:"0 0 512 512"},[u([C({d:`
M507,208c-1-7-7-12-14-13c-7-1-13,3-16,9
c-5,11-16,19-29,19c-14,0-26-10-30-23c-2-8-11-13-19-11
C393,191,389,192,384,192c-35-0-64-29-64-64c0-5,1-9,2-14
c2-8-3-16-11-19C297,90,288,78,288,64c-0-13,8-24,19-29
c6-3,10-9,9-16c-1-7-6-12-13-14C288,2,272,0,256,0
C115,0,0,115,0,256c0,141,115,256,256,256c141-0,256-115,256-256
C512,239,510,224,507,209z M414,414C374,455,318,480,256,480s-118-25-158-66
C57,374,32,318,32,256S57,138,98,98C138,57,194,32,256,32c3,0,6,0,9,0
C259,42,256,52,256,64c0,24,13,44,33,55C288,122,288,125,288,128
c0,53,43,96,96,96c3,0,6-0,8-0C403,242,424,256,448,256
c11-0,22-3,32-8c0,3,0,6,0,9C480,318,455,374,414,414z
`}),l({cx:"192",cy:"128",r:"32"}),l({cx:"128",cy:"256",r:"32"}),l({cx:"288",cy:"384",r:"32"}),l({cx:"272",cy:"272",r:"16"}),l({cx:"400",cy:"336",r:"16"}),l({cx:"176",cy:"368",r:"16"})])]))},R=({page:e,state:t},r)=>{let n={id:"Magic",class:t.pageClass};return k(n,p({class:{Wrapper:!0}},[E(t),p({class:"Page",id:"page"},e(t)),q(t),r]))},I=(t,r)=>{"string"==typeof t?t={content:t}:r?t=e({content:r},t):Array.isArray(t)&&(t={content:t.join("")});let{content:n,lines:i=!0}=t;return p({class:{Pre:!0,lines:i&&"false"!==i}},[p({class:"menu"},[a({onclick:[V.pre.clip,e=>({e,content:n})]},"copy")]),$(n.trim().split("\n").map(I.Line))])};I.Comment=e=>A({class:"comment"},e),I.Line=e=>c({class:"line"},I.Words(e)),I.Word=e=>{if(!e)return"";let t=e.includes("://"),r=e.startsWith("mailto:")||e.includes("@")&&e.includes(".");if(t||r)return N({to:e,text:e});let n="";return("state"===e?n="state":"actions"===e?n="actions":"effects"===e?n="effects":"subscriptions"===e?n="subscriptions":_.pre.keywords.includes(e)?n="keyword":_.pre.builtins.includes(e)?n="builtin":_.pre.booleans.includes(e)&&(n="boolean"),n)?A({class:n},e):e},I.Words=e=>{let[t,...r]=e.split(_.pre.commentRegex),n=!t.endsWith(":")&&r.length;if(n)return[I.Words(t),I.Comment(r.join("").split(_.pre.wordRegex).map(I.Word))];let i=[],o=e;if(e.replace(_.pre.stringRegex,e=>{if(o){let[t,r]=o.split(e);t&&i.push(t.split(_.pre.wordRegex).map(I.Word).filter(e=>e)),o=r}i.push(A({class:"string"},e))}),o!==e)return o&&i.push(o.split(_.pre.wordRegex).map(I.Word).filter(e=>e)),i;let s=e.split(_.pre.wordRegex).filter(e=>e);return s.map(I.Word)};let _={pre:{booleans:["true","false"],builtins:["Array","Object","String","Number","RegExp","Null","Symbol","Set","WeakSet","Map","WeakMap","setInterval","setTimeout","Promise","JSON","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"],commentRegex:/(\/\/)/gim,keywords:["let","this","long","package","float","goto","private","class","if","short","while","protected","with","debugger","case","continue","volatile","interface","instanceof","super","synchronized","throw","extends","final","export","throws","try","import","double","enum","boolean","abstract","function","implements","typeof","transient","break","default","do","static","void","int","new","async","native","switch","else","delete","null","public","var","await","byte","finally","catch","in","return","for","get","const","char","module","exports","require","npm","install","=>"],stringRegex:/("|')(.*?)\1/gim,wordRegex:/( )/gim},preventDefault:e=>(e.preventDefault(),e)},V={changeTheme:r=>t(e({},r),{pageClass:t(e({},r.pageClass),{light:"dark"===r.theme}),theme:"dark"===r.theme?"light":"dark"}),go:(r,n)=>{let i=n.currentTarget.href.replace(window.location.origin,""),[o,s=""]=i.split("#");if(o===r.url&&s===r.hash)return s&&(window.location.hash=s),r;let a=r.pages&&r.pages[o]&&r.pages[o].title;a&&(document.title=r.title=a),o!==r.url?s||window.scrollTo({top:0}):window.location.hash=s;let{scrollY:l}=window;return window.history.pushState({url:o,hash:s,scrollY:l},r.title,i),t(e({},r),{url:o,hash:s,prev:r.url})},nospy:{toggle:t=>(t.nospy.show=!t.nospy.show,e({},t))},pop:(r,n)=>{let{pathname:i,hash:o}=window.location;o=o.substring(1);let s=0;return n.state&&(i=n.state.url,o=n.state.hash,s=n.state.scrollY||0),o?window.location.hash=o:window.scroll({top:s}),t(e({},r),{url:i,hash:o})},pre:{clip:(e,{content:t})=>{if("undefined"!=typeof document&&"function"==typeof document.execCommand){let e=document.createElement("textarea");e.id="copy",e.innerHTML=t,document.body.appendChild(e);let r=document.getElementById("copy");r.select(),document.execCommand("copy"),document.body.removeChild(r)}return e}}},G={listenPopState:(e,t)=>{let r=r=>e(t,r);return addEventListener("popstate",r),()=>removeEventListener("popstate",r)}},U={"/cli/":e=>[m({id:"magiccli"},"@magic/cli"),O(["declarative cli sanitization and execution for ",N({to:"https://magic.github.io",text:"@magic"})]),O(`sanitizes cli flags from aliases to default names
rewrites process.argv accordingly
provides autogenerated --help output (that can be customized)
also handles commands and environment for you`),O("exports a commonjs file that allows to launch mjs files as clis"),z("@magic/cli"),f({id:"install"},"install"),O("be in a nodejs project"),I({lines:"false"},"npm i --save-dev @magic/cli"),f({id:"caveats"},"caveats"),O("there are some quirks that need some careful consideration when designing a cli api."),O("depending on your requirements, these caveats may or may not apply."),P([x([h({id:"last-argument"},"last argument"),O(`if your last argument does not have a corresponding flag,
it will still be assigned to the last flag prior to it.`),v({id:"workaround"},"workaround"),O("do not design a cli with a trailing command.")]),x([h({id:"option-argument-and-command-name-clash"},"option argument and command name clash"),O(`if one of your options gets an argument that is equal to a command,
this command will be executed.`),v({id:"workaround-1"},"workaround"),O("do not name your commands like the possible arguments.")]),x([h({id:"flag-arguments-can-not-start-with-a-dash"},"flag arguments can not start with a dash"),O("cli arguments that start with a - will always be treated as flags, not values."),v({id:"workaround-2"},"workaround"),O("do not design a cli that accepts arguments that start with a -")])]),O("those issues might get addressed in the future."),f({id:"usage"},"Usage"),O("full api example"),I(`#!/usr/bin/env node

import cli from '@magic/cli/src/index.mjs''

const { argv, env, commands } = cli({
  commands: [
    ['cmd1', 'cmd1alias'],
    'cmd2',
  ],
  options: [
    ['--flag1', '-f1'],
    ['--flag2', '-f2'],
  ],
  default: {
    '--default-key': 'default-value',
  },
  single: [
    '--default-key',
  ],
  required: [
    '--default-key',
  ],
  pure: true, // do neither change process.argv nor process.env
  pureArgv: true, // do not change process.argv
  pureEnv: true, // do not change process.env
})`),f({id:"argv"},"options / argv"),O("argv mappings will handle options and option aliases"),O(["using the ",N({to:"/cli/#usage",text:"cli file"})," above"]),O([`then, in your terminal / bash
`,I({lines:"false"},"bin.mjs -f1 arg1 arg2 -f2")]),O("resulting process.argv"),I(`process.argv = [
  '/path/to/bin/node',
  '/path/to/bin.mjs',
  '--flag1'
  'arg1',
  'arg2',
  '--flag2',
]`),O([`returned javascript object
`,I({lines:"false"},"argv === { '--flag1': ['arg1', arg2], '--flag2': []}")]),f({id:"commands"},"commands"),O("cli commands can be handled too."),I(`import cli from '@magic/cli/src/index.mjs'

const args = {
  commands: [
    ['dev', 'development', 'start'],
    'serve',
  ],
}

const argv = cli(args)

// call
./bin.mjs dev serve

// results:
{
  cmds: ['dev', 'serve'],
  commands: ['dev', 'serve'],
}`),f({id:"help"},"help output"),O("@magic/cli will derive a help text from your configuration."),O("help itself can be configured to provide better error messages."),h({id:"help-simple"},"simple help message"),I(`import cli from '@magic/cli/src/index.mjs'

const args = {
  commands: [['magic', 'm']],
  options: [['--spell', '-s']],
  prepend: 'prepend',
  append: 'append',
  help: 'custom help text',
}

const argv = cli(args)

// running
./bin.mjs
// without arguments

// help output

@magic/cli wrapped cli.

custom help text

cli commands
magic - aliases: ["m"]


possible command line flags:
--spell - aliases: ["-s"]


environment switches:
dev: set NODE_ENV to development - aliases ["development"]`),h({id:"help-detailed"},"detailed help message"),O("the help property will accept an object which maps to the args object."),I(`import cli from '@magic/cli/src/index.mjs'

const args = {
  commands: [['magic', 'm']],
  options: [['--spell', '-s']],
  prepend: 'prepend',
  append: 'append',
  help: {
    name: 'cli name',
    text: 'custom help text',
    commands: {
      magic: 'magic info help text',
    },
    options: {
      '--spell': 'cast a simple spell',
    },
    env: ['dev', 'set environment to development'],
  },
}

const argv = cli(args)

// running
./bin.mjs
// without arguments

// help output

cli name

custom help text

commands:
magic - aliases: ["m"]

flags:
--spell - aliases: ["-s"]

environment switches:
dev: set process.NODE_ENV to development - aliases ["development"]`),h({id:"clean"},"clean"),O("some cli arguments will be expected to return a string instead of a list of arguments."),O("this can be achieved using the single array"),I(`const args = {
  options: [['--single', '-s']],
  single: ['--single'],
}

const res = cli(args)

console.log(res)`),h({id:"required"},"required"),O("some cli arguments will be required."),O("this can be achieved using the required array."),O("if a required field is missing, a error message and the help will be shown."),I(`const args = {
  options: [['--required', '-r']],
  required: ['--required'],
}

const res = cli(args)

console.log(res)`),f({id:"config"},"config"),O("there are some configuration parameters that can be passed to the cli function"),h({id:"config-pure"},"pure"),I(`const args = {
  pure: false,    // set to true to prevent changes to process.argv and process.env
  pureEnv: false, // set to true to prevent changes to process.env
  pureArgv: false, // set to true to prevent changes to process.argv
}

cli(args)`),f({id:"config-prependappend"},"prepend/append"),O("process.argv values can be prepended and appended"),I(`import cli from '@magic/cli/src/index.mjs'

const args = {
  prepend: ['prepended']
  append: ['appended']
}

cli(args)`),h({id:"config-default"},"default"),O("use this to set default process.argv key: value pairs that should be set if they are not"),I(`import cli from '@magic/cli/src/index.mjs'

const args = {
  options: [
    ['--default-key'],
  ],
  default: {
    '--default-key': 'default-value',
  },
}

const argv = cli(args)

// returns
{
  argv: {
    '--default-key': 'default-value',
  },
}`),h({id:"helpers"},"helpers"),O("@magic/cli exports multiple promisified child_process commands."),v({id:"helpers-exec"},"exec"),I(`import cli from '@magic/cli'

const execOptions = {
  // any child_process.exec options
}

const {
  err,
  stderr,
  stdout
} = await cli.exec('cmd --flag Flag', execOptions)`),v({id:"helpers-execfile"},"execFile"),I(`const execFileOptions = {
  // any child_process.execFile options
}

const {
  err,
  stderr,
  stdout,
} = await cli.execFile('/path/to/file.x', ['--flag', 'Flag'], execFileOptions)`),v({id:"helpers-spawn"},"spawn"),I(`const spawnOptions = {
  // any child_process.spawn options
}

const spawnedProcess = cli.spawn('program', ['--flag', 'Flag'], spawnOptions)
`),g({id:"source"},"source"),O([`the source for this page is in the
`,N({to:"https://github.com/magic/cli/tree/master/docsrc",text:"docsrc directory"}),`
and gets built and published to github using `,N({to:"https://github.com/magic/core",text:"@magic/core"})])],"/cli/404/":()=>p("404 - not found.")};i({init:t(e({},{description:"declarative cli wrapper for @magic",logotext:"@magic/cli",menu:[{text:"install",to:"/cli/#install"},{text:"caveats",to:"/cli/#caveats"},{text:"usage",to:"/cli/#usage"},{text:"argv",to:"/cli/#argv"},{text:"commands",to:"/cli/#commands"},{text:"help",to:"/cli/#help"},{items:[{text:"pure",to:"/cli/#config-pure"},{text:"append / prepend",to:"/cli/#config-prependappend"},{text:"default",to:"/cli/#config-default"}],text:"configuration",to:"/cli/#config"},{text:"clean",to:"/cli/#clean"},{text:"required",to:"/cli/#required"},{items:[{text:"cli.exec",to:"/cli/#helpers-exec"},{text:"cli.execFile",to:"/cli/#helpers-execfile"},{text:"cli.spawn",to:"/cli/#helpers-spawn"}],text:"helpers",to:"/cli/#helpers"},{text:"source",to:"/cli/#source"}],nospy:{show:!1},pageClass:{},pages:{"/cli/":{menu:[{text:"install",to:"/cli/#install"},{text:"caveats",to:"/cli/#caveats"},{text:"usage",to:"/cli/#usage"},{text:"argv",to:"/cli/#argv"},{text:"commands",to:"/cli/#commands"},{text:"help",to:"/cli/#help"},{items:[{text:"pure",to:"/cli/#config-pure"},{text:"append / prepend",to:"/cli/#config-prependappend"},{text:"default",to:"/cli/#config-default"}],text:"configuration",to:"/cli/#config"},{text:"clean",to:"/cli/#clean"},{text:"required",to:"/cli/#required"},{items:[{text:"cli.exec",to:"/cli/#helpers-exec"},{text:"cli.execFile",to:"/cli/#helpers-execfile"},{text:"cli.spawn",to:"/cli/#helpers-spawn"}],text:"helpers",to:"/cli/#helpers"},{text:"source",to:"/cli/#source"}]},"/cli/404/":{description:"404 - not found.",title:"404 - not found"}},root:"/cli/",theme:"dark",title:"@magic/cli",url:"/cli/"}),{url:window.location.pathname,hash:window.location.hash.substr(1)}),subscriptions:e=>[[G.listenPopState,V.pop]],view:e=>{let t=U[e.url]?e.url:"/404/",r=U[t],n=e.pages&&e.pages[t];return n&&Object.keys(n).forEach(t=>{e[t]=n[t]}),e.url=t,R({page:r,state:e},[D(e),L(e)])},node:document.getElementById("Magic")})})();