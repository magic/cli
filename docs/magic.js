(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
function b(a,b){return j(a)||c(a,b)||f()}function c(a,b){var c=[];var d=!0;var e=!1;var f=undefined;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{!d&&h["return"]!=null&&h["return"]()}finally{if(e)throw f}}return c}function e(a){return j(a)||g(a)||f()}function f(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function g(a){if(Symbol.iterator in Object(a)||Object.prototype.toString.call(a)==="[object Arguments]")return Array.from(a)}function j(a){if(Array.isArray(a))return a}function k(a,b){if(a==null)return{};var c=l(a,b);var d,e;if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(e=0;e<f.length;e++)d=f[e],!(b.indexOf(d)>=0)&&Object.prototype.propertyIsEnumerable.call(a,d)&&(c[d]=a[d])}return c}function l(a,b){if(a==null)return{};var c={};var d=Object.keys(a);var e,f;for(f=0;f<d.length;f++)e=d[f],!(b.indexOf(e)>=0)&&(c[e]=a[e]);return c}function m(a){return m=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function m(a){return typeof a}:function m(a){return a&&typeof Symbol==="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},m(a)}var n=require("hyperapp"),o=n.app,q=n.h;var h=function(a){return function(){var b=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var d=!!(arguments.length>1&&arguments[1]!==undefined)&&arguments[1];var e=function is(a){for(var b=arguments.length,c=Array(b>1?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];return c.some(function(b){return b===m(a)})};return!d&&(e(b,"string","number","function")||Array.isArray(b)?(d=b,b={}):e(b.View,"function")&&(d=b.View,b={})),q(a,b,d)}};var r=h("div");var s=h("button");var t=h("code");var u=h("i");var i=h("pre");var v=h("span");var w=h("a");var a=h("text");var x=function Link(a,b){var c=a.to,d=k(a,["to"]);return function(a,f){var g=d.href,h=d.text,i=d.nofollow,j=d.noreferrer,l=d.onclick,m=k(d,["href","text","nofollow","noreferrer","onclick"]);return c=c||g||"",m.href=c,c&&c.startsWith("/")&&!c.startsWith("//")?m.onclick=function(a){l&&l({e:a,to:c}),f.go({e:a,to:c})}:(m.target="_blank",m.rel="noopener",i&&(m.rel+=" nofollow"),j&&(m.rel+=" noreferrer")),w(m,[h,b])}};var y=h("h2");var z=h("h3");var A=h("h4");var B=h("h5");var C=h("li");var D=h("ol");var E=h("p");var p={View:function View(a){var b=!!(arguments.length>1&&arguments[1]!==undefined)&&arguments[1];return function(c,d){var g="dark";return!b&&c.pre.theme==="dark"&&(g="light"),r({"class":"Pre ".concat(b||c.pre.theme)},[r({"class":"menu"},[!b&&s({onclick:function onclick(){return d.pre.changeTheme(g)}},g),s({onclick:function onclick(){return d.pre.clip(a)}},"copy")]),i(function format(a){var f=function wrapWords(a){if(typeof a!=="string")return a;var e=a.split(/\b/);return a=e.map(function(a,f){if(a!==""){var g="";return a==="state"?g="state":a==="actions"?g="actions":e[f+1]&&e[f+1].includes(":")?g="colon":j(a)?g="html":"let this long package float\ngoto private class if short\nwhile protected with debugger case\ncontinue volatile interface\n\ninstanceof super synchronized throw\nextends final export throws\ntry import double enum\n\nboolean abstract function\nimplements typeof transient break\ndefault do static void\n\nint new async native switch\nelse delete null public var\nawait byte finally catch\nin return for get const char\nmodule exports require".includes(a)?g="keyword":"Array Object String Number RegExp Null Symbol\nSet WeakSet Map WeakMap\nsetInterval setTimeout\nPromise\nJSON\nInt8Array Uint8Array Uint8ClampedArray\nInt16Array Uint16Array\nInt32Array Uint32Array\nFloat32Array Float64Array".includes(a)?g="builtin":"true false".includes(a)?g="boolean":e[f-1]==="."?g="property":e[f+1]==="."&&(g="object"),g&&(a=v({"class":g},a)),a}}),a};var h={canvas:1,video:1};var i=function wordsByLine(a){if(a.trim().startsWith("//"))return t({"class":"line comment"},a);if(a.includes("//")){var m=a.split("//");m[0]=i(m[0]);for(var n=1;n<m.length;n++)m[n]=t({"class":"comment"},"//".concat(m[n]));return t({"class":"line"},m)}var b=a.replace(/"/g,"'");var c=b.split("'"),d=e(c),g=d[0],h=d[1],j=d.slice(2);var k=j;k.length===1?k=i(k[0]):k.length>1&&(k=i(k.join("'")));var l=[];return l=typeof h==="undefined"?f(a):[f(g),v({"class":"string"},"'".concat(h,"'")),k],l};var j=function isHtmlTag(a){if(h.hasOwnProperty(a))return!0;try{var b=typeof global==="undefined"?document.createElement(a).toString()==="[object HTMLDivElement]":Object.keys(o.dependencies).includes(a);if(b)return h[a]=!0,!0}catch(a){}};a=a.replace(/^\n|\n$/g,"");var k=a.split("\n").map(function(a){return t({"class":"line"},i(a))});return k}(a))])}}};var F=h("img");var G=function Img(a){return function(){if(typeof a==="string"&&(a={src:a}),!!a.src)return!a.alt&&(a.title?a.alt=a.title:(a.role="presentation",a.alt="")),F(a)}};var H=h("ul");var I=function GitBadges(a){var c=a.project,d=c!==void 0&&c,e=a.branch,f=e===void 0?"master":e;var g=Object.entries({npm:function npm(){var a=arguments.length>0&&arguments[0]!==undefined?arguments[0]:d;return a&&{to:"https://www.npmjs.com/package/@".concat(a),src:"https://img.shields.io/npm/v/@".concat(a,".svg")}},travis:function travis(){var a=arguments.length>0&&arguments[0]!==undefined?arguments[0]:d;return a&&{to:"https://travis-ci.com/".concat(a),src:"https://travis-ci.com/".concat(a,".svg?branch=").concat(f)}},appveyor:function appveyor(){var a=arguments.length>0&&arguments[0]!==undefined?arguments[0]:d;return a&&{to:"https://ci.appveyor.com/project/".concat(a,"/branch/").concat(f),src:"https://img.shields.io/appveyor/ci/".concat(a,"/").concat(f,".svg")}},coveralls:function coveralls(){var a=arguments.length>0&&arguments[0]!==undefined?arguments[0]:d;return a&&{to:"https://coveralls.io/github/".concat(a),src:"https://coveralls.io/repos/github/".concat(a,"/badge.svg")}},greenkeeper:function greenkeeper(){var a=arguments.length>0&&arguments[0]!==undefined?arguments[0]:d;return a&&{to:"https://greenkeeper.io",src:"https://badges.greenkeeper.io/".concat(a,".svg")}},snyk:function snyk(){var a=arguments.length>0&&arguments[0]!==undefined?arguments[0]:d;return a&&{to:"https://snyk.io/test/github/".concat(a),src:"https://snyk.io/test/github/".concat(a,"/badge.svg")}}}).map(function(c){var d=b(c,2),e=d[0],f=d[1];return f(a[e])}).filter(function(b){return b.to&&b.src});return g.length?H({"class":"GitBadges"},g.map(function(a){var b=a.to,c=a.src;return C([x({to:b},G({src:c}))])})):void 0};var J={View:function View(){return K({"class":"main"},[r({"class":"wrapper"},["made with a few bits of ",x({to:"https://github.com/magic/core",target:"_blank",rel:"noopener"},"magic")])])}};var K=h("footer");var L={View:function View(){var a=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"menu";return function(b){typeof a==="string"&&(a={name:a});var c=a,d=c.name,e=d===void 0?"menu":d,f=c["class"],g=f===void 0?"Menu":f,h=c.items,i=h===void 0?[]:h;var j=b.url,l=b[e],m=l===void 0?[]:l;if(i=i.length?i:m,!!i.length){b.hash&&(j+="#".concat(b.hash));var n=function Item(a){var b=a.text,c=a.items,d=c===void 0?[]:c,e=k(a,["text","items"]);if(e.to||b){var f={};e.to===j&&(f["class"]="active");var g;return d&&j.startsWith(e.to)&&(g=H(d.map(function(a){return n(a)}))),C(f,[e.to?x(e,b):v(e,b),g])}};return M({"class":g.includes("Menu")?g:"Menu ".concat(g)},H(i.map(function(a){return n(a)})))}}}};var M=h("nav");var N=h("header");var O=function PageHead(a){return(a.logo||a.menu||a.tagline)&&N({"class":"main"},[(a.logo||a.logotext)&&x({to:"/cli/","class":"logo-wrapper"},[a.logo&&G({"class":"logo",src:a.logo}),a.logotext&&v({"class":"logo-text"},a.logotext)]),L.View])};var P={"/cli/":function cli(){return[y("@magic/cli"),E("declarative cli sanitization and execution for [@magic](https://magic.github.io/cli)"),E("sanitizes cli flags from aliases to default names"),E("rewrites process.argv accordingly"),E("provides autogenerated --help output (that can be customized)"),E("also handles commands and environment for you"),E([x({to:"https://magic.github.io/cli/"},"html-docs")]),I({project:"magic/cli",appveyor:"jaeh/cli"}),z({id:"dependencies"},"dependencies:"),E([x({to:"https://github.com/magic/log"},"@magic/log"),": console.log wrapper with loglevels"]),E([x({to:"https://github.com/magic/types"},"@magic/types"),": type checking library"]),E("@magic/log and @magic/types have no dependencies."),z({id:"install"},"install"),E("be in a nodejs project"),p.View("npm i --save-dev @magic/cli"),z({id:"caveats"},"caveats"),E(["there are some quirks that need some careful consideration when designing a cli api"," depending on your requirements, these caveats should seldomly apply."]),D([C([B("last argument"),E(["if your last argument does not have a corresponding flag,"," it will still be assigned to the last flag prior to it."])]),C([B("option argument and command name clash"),E(["if one of your options gets an argument that is equal to a command, "," this command will be executed"])]),C([B("flag arguments can not start with a dash"),E("cli arguments that start with a - will always be treated as flags, not values.")])]),E("those issues might get addressed in the future."),z({id:"usage"},"Usage"),E("full api example"),p.View("\n// ./bin.js\n\n#!/usr/bin/env node\nconst cli = require('@magic/cli')\n\nconst { argv, env, commands } = cli({\n  commands: [\n    ['cmd1', 'cmd1alias'],\n    'cmd2',\n  ],\n  options: [\n    ['--flag1', '-f1'],\n    ['--flag2', '-f2'],\n  ],\n  default: [\n    ['--default-key', 'default-value'],\n  ],\n  env: [[['--production', '--prod', '--p', '-p'], 'NODE_ENV', 'production']],\n  pure: true, // do neither change process.argv nor process.env\n  pureArgv: true, // do not change process.argv\n  pureEnv: true, // do not change process.env\n})"),z({id:"argv"},"options / argv"),E("argv mappings will handle options and option aliases"),E(["using the ",x({to:"/cli/#usage"},"cli file")," above"]),E("then, in your terminal / bash"),p.View("bin.js -f1 arg1 arg2 -f2"),E("resulting process.argv"),p.View("\nprocess.argv = [\n  '/path/to/bin/node',\n  '/path/to/bin.js',\n  '--flag1'\n  'arg1',\n  'arg2',\n  '--flag2',\n]"),E("returned javascript object"),p.View("argv === { '--flag1': ['arg1', arg2], '--flag2': []}"),z({id:"commands"},"commands"),E("cli commands can be handled too."),p.View("\nconst cli = require('@magic/cli')\n\nconst args = {\n  commands: [\n    ['dev', 'development', 'start'],\n    'serve',\n  ],\n}\n\nconst argv = cli(args)\n\n// call\n./bin.js dev serve\n\n// results:\n{\n  cmds: ['dev', 'serve'],\n  commands: ['dev', 'serve'],\n}"),z({id:"help"},"help output"),E(["@magic/cli will derive a help text from your configuration.","help itself can be configured to provide better error messages"]),A({id:"help-simple"},"simple help message"),p.View("\nconst cli = require('@magic/cli')\n\nconst args = {\n  commands: [['magic', 'm']],\n  options: [['--spell', '-s']],\n  env: [[['dev', 'development'], 'NODE_ENV', 'development']],\n  prepend: 'prepend',\n  append: 'append',\n  help: 'custom help text',\n}\n\nconst argv = cli(args)\n\n// running\n./bin.js\n// without arguments\n\n// help output\n`\n@magic/cli wrapped cli.\n\ncustom help text\n\ncli commands\nmagic - aliases: [\"m\"]\n\n\npossible command line flags:\n--spell - aliases: [\"-s\"]\n\n\nenvironment switches:\ndev: set NODE_ENV to development - aliases [\"development\"]\n`"),A({id:"help-detailed"},"detailed help message"),E("the help property will accept an object which maps to the args object"),p.View("\nconst cli = require('@magic/cli')\n\nconst args = {\n  commands: [['magic', 'm']],\n  options: [['--spell', '-s']],\n  env: [[['dev', 'development'], 'NODE_ENV', 'development']],\n  prepend: 'prepend',\n  append: 'append',\n  help: {\n    name: 'cli name',\n    text: 'custom help text',\n    commands: {\n      magic: 'magic info help text',\n    },\n    options: {\n      '--spell': 'cast a simple spell',\n    },\n    env: ['dev', 'set environment to development'],\n  },\n}\n\nconst argv = cli(args)\n\n// running\n./bin.js\n// without arguments\n\n// help output\n`\ncli name\n\ncustom help text\n\ncommands:\nmagic - aliases: [\"m\"]\n\nflags:\n--spell - aliases: [\"-s\"]\n\nenvironment switches:\ndev: set process.NODE_ENV to development - aliases [\"development\"]\n`"),z({id:"config"},"configuration"),E("there are some configuration parameters that can be passed to the cli function"),A({id:"configuration-pure"},"pure"),p.View("\nconst args = {\n  pure: false,    // set to true to prevent changes to process.argv and process.env\n  pureEnv: false, // set to true to prevent changes to process.env\n  pureArgv: false, // set to true to prevent changes to process.argv\n}\n\ncli(args)"),z({id:"prepend-append"},"prepend/append"),E("process.argv values can be prepended and appended"),p.View("\nconst cli = require('@magic/cli)\n\nconst args = {\n  prepend: ['prepended']\n  append: ['appended']\n}\n\ncli(args)"),A({id:"default"},"default"),E("use this to set default process.argv key: value pairs that should be set if they are not"),p.View("\nconst cli = require('@magic/cli')\n\nconst args = {\n  options: [\n    ['--default-key'],\n  ],\n  default: [\n    ['--default-key', 'default-value']\n  ],\n}\n\nconst argv = cli(args)\n\n// returns\n{\n  argv: {\n    '--default-key': 'default-value',\n  },\n}")]},"/404/":function _(){return r("404 - not found")}};var Q={"url":"/cli/","root":"/cli/","logotext":"@magic/cli","menu":[{to:"/cli/#dependencies","text":"dependencies"},{to:"/cli/#install","text":"install"},{to:"/cli/#caveats","text":"caveats"},{to:"/cli/#usage","text":"usage"},{to:"/cli/#argv","text":"argv"},{to:"/cli/#commands","text":"commands"},{to:"/cli/#help","text":"help"},{to:"/cli/#configuration","text":"config","items":[{to:"/cli/#configuration-pure","text":"pure"},{to:"/cli/#prepend-append","text":"append / prepend"},{to:"/cli/#default","text":"default"}]}],"pre":{"theme":"light"}};Q.url=window.location.pathname,Q.root="/cli/";var R={"go":function go(a){return function(c){if(typeof window==="undefined"||!window.history)return!0;var d=a.to;var f=a.e?a.e:a;f.preventDefault();var e=c.url;var g=e.split("#"),h=b(g,2),i=h[0],j=h[1],k=j===void 0?"":j;if(d){e=d.replace(window.location.origin,"");var l=e.split("#"),m=b(l,2),n=m[0],o=m[1],p=o===void 0?"":o;i=n,k=p;var q=c.hash?"#".concat(c.hash):"";var r=c.url+q;e!==r&&(window.history&&window.history.pushState({uri:i},"",e),!k&&window.scrollTo(0,0))}else i=f.state?f.state.uri:"/";return k&&window.location&&(window.location.hash=k),{url:i,hash:k,prev:c.url}}},"pre":{"changeTheme":function changeTheme(a){return{theme:a}},"clip":function clip(a){if(typeof document!=="undefined"&&typeof document.execCommand==="function"){var b=document.createElement("textarea");b.id="copy",b.innerHTML=a,document.body.appendChild(b);var c=document.getElementById("copy");c.select(),document.execCommand("copy"),document.body.removeChild(c)}}}};var S=function view(a,b){var c=P[a.url]?a.url:"/404/";var d=P[c];if(a.pages){var e=a.pages[c];for(var f in e)a[f]=e[f]}if(b.pages){var g=b.pages[c];for(var h in g)b[h]=g[h]}return r({"class":"wrapper",oncreate:function oncreate(){typeof window!=="undefined"&&b.go&&window.addEventListener("popstate",b.go)}},[O,d?r({"class":"page"},d(a,b)):r({"class":"page"},"404 - not found"),J.View])};var T=document;var d=T.getElementById("magic");!d&&(d=T.createElement("div"),d.id="magic",T.body.appendChild(d)),o(Q,R,S,d);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"hyperapp":2}],2:[function(require,module,exports){
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.hyperapp={})}(this,function(e){"use strict";e.h=function(e,n){for(var t=[],r=[],o=arguments.length;2<o--;)t.push(arguments[o]);for(;t.length;){var l=t.pop();if(l&&l.pop)for(o=l.length;o--;)t.push(l[o]);else null!=l&&!0!==l&&!1!==l&&r.push(l)}return"function"==typeof e?e(n||{},r):{nodeName:e,attributes:n||{},children:r,key:n&&n.key}},e.app=function(e,n,t,r){var o,l=[].map,u=r&&r.children[0]||null,i=u&&function n(e){return{nodeName:e.nodeName.toLowerCase(),attributes:{},children:l.call(e.childNodes,function(e){return 3===e.nodeType?e.nodeValue:n(e)})}}(u),f=[],m=!0,a=v(e),c=function e(r,o,l){for(var n in l)"function"==typeof l[n]?function(e,t){l[e]=function(e){var n=t(e);return"function"==typeof n&&(n=n(h(r,a),l)),n&&n!==(o=h(r,a))&&!n.then&&d(a=p(r,v(o,n),a)),n}}(n,l[n]):e(r.concat(n),o[n]=v(o[n]),l[n]=v(l[n]));return l}([],a,v(n));return d(),c;function g(e){return"function"==typeof e?g(e(a,c)):null!=e?e:""}function s(){o=!o;var e=g(t);for(r&&!o&&(u=function e(n,t,r,o,l){if(o===r);else if(null==r||r.nodeName!==o.nodeName){var u=k(o,l);n.insertBefore(u,t),null!=r&&T(n,t,r),t=u}else if(null==r.nodeName)t.nodeValue=o;else{x(t,r.attributes,o.attributes,l=l||"svg"===o.nodeName);for(var i={},f={},a=[],c=r.children,s=o.children,d=0;d<c.length;d++){a[d]=t.childNodes[d];var v=N(c[d]);null!=v&&(i[v]=[a[d],c[d]])}for(var d=0,p=0;p<s.length;){var v=N(c[d]),h=N(s[p]=g(s[p]));if(f[v])d++;else if(null==h||h!==N(c[d+1]))if(null==h||m)null==v&&(e(t,a[d],c[d],s[p],l),p++),d++;else{var y=i[h]||[];v===h?(e(t,y[0],y[1],s[p],l),d++):y[0]?e(t,t.insertBefore(y[0],a[d]),y[1],s[p],l):e(t,a[d],null,s[p],l),f[h]=s[p],p++}else null==v&&T(t,a[d],c[d]),d++}for(;d<c.length;)null==N(c[d])&&T(t,a[d],c[d]),d++;for(var d in i)f[d]||T(t,i[d][0],i[d][1])}return t}(r,u,i,i=e)),m=!1;f.length;)f.pop()()}function d(){o||(o=!0,setTimeout(s))}function v(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function p(e,n,t){var r={};return e.length?(r[e[0]]=1<e.length?p(e.slice(1),n,t[e[0]]):n,v(t,r)):n}function h(e,n){for(var t=0;t<e.length;)n=n[e[t++]];return n}function N(e){return e?e.key:null}function y(e){return e.currentTarget.events[e.type](e)}function b(e,n,t,r,o){if("key"===n);else if("style"===n)if("string"==typeof t)e.style.cssText=t;else for(var l in"string"==typeof r&&(r=e.style.cssText=""),v(r,t)){var u=null==t||null==t[l]?"":t[l];"-"===l[0]?e.style.setProperty(l,u):e.style[l]=u}else"o"===n[0]&&"n"===n[1]?(n=n.slice(2),e.events?r||(r=e.events[n]):e.events={},(e.events[n]=t)?r||e.addEventListener(n,y):e.removeEventListener(n,y)):n in e&&"list"!==n&&"type"!==n&&"draggable"!==n&&"spellcheck"!==n&&"translate"!==n&&!o?e[n]=null==t?"":t:null!=t&&!1!==t&&e.setAttribute(n,t),null!=t&&!1!==t||e.removeAttribute(n)}function k(e,n){var t="string"==typeof e||"number"==typeof e?document.createTextNode(e):(n=n||"svg"===e.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",e.nodeName):document.createElement(e.nodeName),r=e.attributes;if(r){r.oncreate&&f.push(function(){r.oncreate(t)});for(var o=0;o<e.children.length;o++)t.appendChild(k(e.children[o]=g(e.children[o]),n));for(var l in r)b(t,l,r[l],null,n)}return t}function x(e,n,t,r){for(var o in v(n,t))t[o]!==("value"===o||"checked"===o?e[o]:n[o])&&b(e,o,t[o],n[o],r);var l=m?t.oncreate:t.onupdate;l&&f.push(function(){l(e,n)})}function T(e,n,t){function r(){e.removeChild(function e(n,t){var r=t.attributes;if(r){for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(n)}return n}(n,t))}var o=t.attributes&&t.attributes.onremove;o?o(n,r):r()}}});

},{}]},{},[1]);