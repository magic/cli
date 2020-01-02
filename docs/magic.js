"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _ref = function () {
  var RECYCLED_NODE = 1;
  var LAZY_NODE = 2;
  var TEXT_NODE = 3;
  var EMPTY_OBJ = {};
  var EMPTY_ARR = [];
  var map = EMPTY_ARR.map;
  var isArray = Array.isArray;
  var defer = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : setTimeout;

  var createClass = function createClass(obj) {
    var out = "";
    if (typeof obj === "string") return obj;

    if (isArray(obj) && obj.length > 0) {
      for (var k = 0, tmp; k < obj.length; k++) {
        if ((tmp = createClass(obj[k])) !== "") {
          out += (out && " ") + tmp;
        }
      }
    } else {
      for (var k in obj) {
        if (obj[k]) {
          out += (out && " ") + k;
        }
      }
    }

    return out;
  };

  var merge = function merge(a, b) {
    var out = {};

    for (var k in a) {
      out[k] = a[k];
    }

    for (var k in b) {
      out[k] = b[k];
    }

    return out;
  };

  var batch = function batch(list) {
    return list.reduce(function (out, item) {
      return out.concat(!item || item === true ? 0 : typeof item[0] === "function" ? [item] : batch(item));
    }, EMPTY_ARR);
  };

  var isSameAction = function isSameAction(a, b) {
    return isArray(a) && isArray(b) && a[0] === b[0] && typeof a[0] === "function";
  };

  var shouldRestart = function shouldRestart(a, b) {
    if (a !== b) {
      for (var k in merge(a, b)) {
        if (a[k] !== b[k] && !isSameAction(a[k], b[k])) return true;
        b[k] = a[k];
      }
    }
  };

  var patchSubs = function patchSubs(oldSubs, newSubs, dispatch) {
    for (var i = 0, oldSub, newSub, subs = []; i < oldSubs.length || i < newSubs.length; i++) {
      oldSub = oldSubs[i];
      newSub = newSubs[i];
      subs.push(newSub ? !oldSub || newSub[0] !== oldSub[0] || shouldRestart(newSub[1], oldSub[1]) ? [newSub[0], newSub[1], newSub[0](dispatch, newSub[1]), oldSub && oldSub[2]()] : oldSub : oldSub && oldSub[2]());
    }

    return subs;
  };

  var patchProperty = function patchProperty(node, key, oldValue, newValue, listener, isSvg) {
    if (key === "key") {} else if (key === "style") {
      for (var k in merge(oldValue, newValue)) {
        oldValue = newValue == null || newValue[k] == null ? "" : newValue[k];

        if (k[0] === "-") {
          node[key].setProperty(k, oldValue);
        } else {
          node[key][k] = oldValue;
        }
      }
    } else if (key[0] === "o" && key[1] === "n") {
      if (!((node.actions || (node.actions = {}))[key = key.slice(2).toLowerCase()] = newValue)) {
        node.removeEventListener(key, listener);
      } else if (!oldValue) {
        node.addEventListener(key, listener);
      }
    } else if (!isSvg && key !== "list" && key in node) {
      node[key] = newValue == null ? "" : newValue;
    } else if (newValue == null || newValue === false || key === "class" && !(newValue = createClass(newValue))) {
      node.removeAttribute(key);
    } else {
      node.setAttribute(key, newValue);
    }
  };

  var createNode = function createNode(vdom, listener, isSvg) {
    var ns = "http://www.w3.org/2000/svg";
    var props = vdom.props;
    var node = vdom.type === TEXT_NODE ? document.createTextNode(vdom.name) : (isSvg = isSvg || vdom.name === "svg") ? document.createElementNS(ns, vdom.name, {
      is: props.is
    }) : document.createElement(vdom.name, {
      is: props.is
    });

    for (var k in props) {
      patchProperty(node, k, null, props[k], listener, isSvg);
    }

    for (var i = 0, len = vdom.children.length; i < len; i++) {
      node.appendChild(createNode(vdom.children[i] = getVNode(vdom.children[i]), listener, isSvg));
    }

    return vdom.node = node;
  };

  var getKey = function getKey(vdom) {
    return vdom == null ? null : vdom.key;
  };

  var patch = function patch(parent, node, oldVNode, newVNode, listener, isSvg) {
    if (oldVNode === newVNode) {} else if (oldVNode != null && oldVNode.type === TEXT_NODE && newVNode.type === TEXT_NODE) {
      if (oldVNode.name !== newVNode.name) node.nodeValue = newVNode.name;
    } else if (oldVNode == null || oldVNode.name !== newVNode.name) {
      node = parent.insertBefore(createNode(newVNode = getVNode(newVNode), listener, isSvg), node);

      if (oldVNode != null) {
        parent.removeChild(oldVNode.node);
      }
    } else {
      var tmpVKid;
      var oldVKid;
      var oldKey;
      var newKey;
      var oldVProps = oldVNode.props;
      var newVProps = newVNode.props;
      var oldVKids = oldVNode.children;
      var newVKids = newVNode.children;
      var oldHead = 0;
      var newHead = 0;
      var oldTail = oldVKids.length - 1;
      var newTail = newVKids.length - 1;
      isSvg = isSvg || newVNode.name === "svg";

      for (var i in merge(oldVProps, newVProps)) {
        if ((i === "value" || i === "selected" || i === "checked" ? node[i] : oldVProps[i]) !== newVProps[i]) {
          patchProperty(node, i, oldVProps[i], newVProps[i], listener, isSvg);
        }
      }

      while (newHead <= newTail && oldHead <= oldTail) {
        if ((oldKey = getKey(oldVKids[oldHead])) == null || oldKey !== getKey(newVKids[newHead])) {
          break;
        }

        patch(node, oldVKids[oldHead].node, oldVKids[oldHead], newVKids[newHead] = getVNode(newVKids[newHead++], oldVKids[oldHead++]), listener, isSvg);
      }

      while (newHead <= newTail && oldHead <= oldTail) {
        if ((oldKey = getKey(oldVKids[oldTail])) == null || oldKey !== getKey(newVKids[newTail])) {
          break;
        }

        patch(node, oldVKids[oldTail].node, oldVKids[oldTail], newVKids[newTail] = getVNode(newVKids[newTail--], oldVKids[oldTail--]), listener, isSvg);
      }

      if (oldHead > oldTail) {
        while (newHead <= newTail) {
          node.insertBefore(createNode(newVKids[newHead] = getVNode(newVKids[newHead++]), listener, isSvg), (oldVKid = oldVKids[oldHead]) && oldVKid.node);
        }
      } else if (newHead > newTail) {
        while (oldHead <= oldTail) {
          node.removeChild(oldVKids[oldHead++].node);
        }
      } else {
        for (var i = oldHead, keyed = {}, newKeyed = {}; i <= oldTail; i++) {
          if ((oldKey = oldVKids[i].key) != null) {
            keyed[oldKey] = oldVKids[i];
          }
        }

        while (newHead <= newTail) {
          oldKey = getKey(oldVKid = oldVKids[oldHead]);
          newKey = getKey(newVKids[newHead] = getVNode(newVKids[newHead], oldVKid));

          if (newKeyed[oldKey] || newKey != null && newKey === getKey(oldVKids[oldHead + 1])) {
            if (oldKey == null) {
              node.removeChild(oldVKid.node);
            }

            oldHead++;
            continue;
          }

          if (newKey == null || oldVNode.type === RECYCLED_NODE) {
            if (oldKey == null) {
              patch(node, oldVKid && oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
              newHead++;
            }

            oldHead++;
          } else {
            if (oldKey === newKey) {
              patch(node, oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
              newKeyed[newKey] = true;
              oldHead++;
            } else {
              if ((tmpVKid = keyed[newKey]) != null) {
                patch(node, node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node), tmpVKid, newVKids[newHead], listener, isSvg);
                newKeyed[newKey] = true;
              } else {
                patch(node, oldVKid && oldVKid.node, null, newVKids[newHead], listener, isSvg);
              }
            }

            newHead++;
          }
        }

        while (oldHead <= oldTail) {
          if (getKey(oldVKid = oldVKids[oldHead++]) == null) {
            node.removeChild(oldVKid.node);
          }
        }

        for (var i in keyed) {
          if (newKeyed[i] == null) {
            node.removeChild(keyed[i].node);
          }
        }
      }
    }

    return newVNode.node = node;
  };

  var propsChanged = function propsChanged(a, b) {
    for (var k in a) {
      if (a[k] !== b[k]) return true;
    }

    for (var k in b) {
      if (a[k] !== b[k]) return true;
    }
  };

  var getTextVNode = function getTextVNode(node) {
    return _typeof(node) === "object" ? node : createTextVNode(node);
  };

  var getVNode = function getVNode(newVNode, oldVNode) {
    return newVNode.type === LAZY_NODE ? ((!oldVNode || oldVNode.type !== LAZY_NODE || propsChanged(oldVNode.lazy, newVNode.lazy)) && ((oldVNode = getTextVNode(newVNode.lazy.view(newVNode.lazy))).lazy = newVNode.lazy), oldVNode) : newVNode;
  };

  var createVNode = function createVNode(name, props, children, node, key, type) {
    return {
      name: name,
      props: props,
      children: children,
      node: node,
      type: type,
      key: key
    };
  };

  var createTextVNode = function createTextVNode(value, node) {
    return createVNode(value, EMPTY_OBJ, EMPTY_ARR, node, undefined, TEXT_NODE);
  };

  var recycleNode = function recycleNode(node) {
    return node.nodeType === TEXT_NODE ? createTextVNode(node.nodeValue, node) : createVNode(node.nodeName.toLowerCase(), EMPTY_OBJ, map.call(node.childNodes, recycleNode), node, undefined, RECYCLED_NODE);
  };

  var Lazy = function Lazy(props) {
    return {
      lazy: props,
      type: LAZY_NODE
    };
  };

  var h = function h(name, props) {
    for (var vdom, rest = [], children = [], i = arguments.length; i-- > 2;) {
      rest.push(arguments[i]);
    }

    while (rest.length > 0) {
      if (isArray(vdom = rest.pop())) {
        for (var i = vdom.length; i-- > 0;) {
          rest.push(vdom[i]);
        }
      } else if (vdom === false || vdom === true || vdom == null) {} else {
        children.push(getTextVNode(vdom));
      }
    }

    props = props || EMPTY_OBJ;
    return typeof name === "function" ? name(props, children) : createVNode(name, props, children, undefined, props.key);
  };

  var app = function app(props) {
    var state = {};
    var lock = false;
    var view = props.view;
    var node = props.node;
    var vdom = node && recycleNode(node);
    var subscriptions = props.subscriptions;
    var subs = [];

    var listener = function listener(event) {
      dispatch(this.actions[event.type], event);
    };

    var setState = function setState(newState) {
      if (state !== newState) {
        state = newState;

        if (subscriptions) {
          subs = patchSubs(subs, batch([subscriptions(state)]), dispatch);
        }

        if (view && !lock) defer(render, lock = true);
      }

      return state;
    };

    var dispatch = (props.middleware || function (obj) {
      return obj;
    })(function (action, props) {
      return typeof action === "function" ? dispatch(action(state, props)) : isArray(action) ? typeof action[0] === "function" || isArray(action[0]) ? dispatch(action[0], typeof action[1] === "function" ? action[1](props) : action[1]) : (batch(action.slice(1)).map(function (fx) {
        fx && fx[0](dispatch, fx[1]);
      }, setState(action[0])), state) : setState(action);
    });

    var render = function render() {
      lock = false;
      node = patch(node.parentNode, node, vdom, vdom = getTextVNode(view(state)), listener);
    };

    dispatch(props.init);
  };

  return {
    h: h,
    app: app
  };
}(),
    h = _ref.h,
    app = _ref.app;

var C = function C(n) {
  return function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var is = function is(ele) {
      for (var _len = arguments.length, types = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        types[_key - 1] = arguments[_key];
      }

      return types.some(function (type) {
        return type === _typeof(ele);
      });
    };

    if (!c) {
      if (is(props, 'string', 'number', 'function') || Array.isArray(props)) {
        c = props;
        props = {};
      } else if (is(props.View, 'function')) {
        c = props.View;
        props = {};
      } else if (props.props || props.c) {
        return h(n, {}, props);
      }
    }

    return h(n, props, c);
  };
};

var a = C('a');
var button = C('button');
var circle = C('circle');
var code = C('code');
var div = C('div');
var footer = C('footer');
var g = C('g');
var h2 = C('h2');
var h3 = C('h3');
var h4 = C('h4');
var h5 = C('h5');
var header = C('header');
var img = C('img');
var input = C('input');
var label = C('label');
var li = C('li');
var link = C('link');
var main = C('main');
var meta = C('meta');
var nav = C('nav');
var ol = C('ol');
var p = C('p');
var path = C('path');
var pre = C('pre');
var script = C('script');
var span = C('span');
var svg = C('svg');
var title = C('title');
var ul = C('ul');
var view = C('view');
var initialState = {
  'description': 'declarative cli wrapper for @magic',
  'gdpr': {
    'allowed': [],
    'show': true
  },
  'logotext': '@magic/cli',
  'menu': [{
    'text': 'install',
    'to': '/#install'
  }, {
    'text': 'caveats',
    'to': '/#caveats'
  }, {
    'text': 'usage',
    'to': '/#usage'
  }, {
    'text': 'argv',
    'to': '/#argv'
  }, {
    'text': 'commands',
    'to': '/#commands'
  }, {
    'text': 'help',
    'to': '/#help'
  }, {
    'items': [{
      'text': 'pure',
      'to': '-pure'
    }, {
      'text': 'append / prepend',
      'to': '-prepend-append'
    }, {
      'text': 'default',
      'to': '-default'
    }],
    'text': 'configuration',
    'to': '/#config'
  }, {
    'text': 'source',
    'to': '/#source'
  }],
  'pageClass': {},
  'root': '/cli/',
  'theme': 'dark',
  'title': '@magic/cli',
  'url': '/cli/'
};
var helpers = {
  'listenPopState': function listenPopState(dispatch, action) {
    var listener = function listener(e) {
      return dispatch(action, e);
    };

    addEventListener('popstate', listener);
    return function () {
      return removeEventListener('popstate', listener);
    };
  }
};

var BlogMonth = function BlogMonth(state) {
  var blog = state.blog,
      link = state.link,
      month = state.month,
      url = state.url,
      year = state.year;
  var months = Object.entries(blog[year][month]);
  var to;
  var title = [month];

  if (link) {
    to = "".concat(link).concat(month, "/");
  } else {
    title.push(' - ', year);
  }

  return [h3(to ? Link({
    to: to
  }, title) : title), months.map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        day = _ref5[0],
        posts = _ref5[1];

    return posts.map(function (post) {
      return BlogTeaser(_objectSpread({}, state, {}, post.state, {
        name: post.name,
        link: to,
        day: day
      }));
    });
  })];
};

var BlogTeaser = function BlogTeaser(state) {
  return div([h4([state.day, '-', state.month, '-', state.year, ' - ', Link({
    to: state.name
  }, state.title)]), p(state.description)]);
};

var BlogYear = function BlogYear(state) {
  var link = state.link,
      year = state.year,
      blog = state.blog,
      url = state.url;
  var to;

  if (link) {
    to = "".concat(link).concat(year, "/");
  } else if (url.endsWith("".concat(year, "/"))) {
    to = url;
  }

  return div([h2(link ? Link({
    to: to
  }, year) : year), Object.entries(blog[year]).map(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
        month = _ref7[0],
        days = _ref7[1];

    return BlogMonth(_objectSpread({}, state, {
      month: month,
      days: days,
      link: to
    }));
  })]);
};

var Footer = function Footer(state) {
  var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return footer({
    "class": 'Footer'
  }, [div({
    "class": 'Container'
  }, [children, div({
    "class": 'Credits'
  }, ['made with a few bits of ', Link({
    to: 'https://github.com/magic/core',
    target: '_blank',
    rel: 'noopener'
  }, 'magic')])])]);
};

var Gdpr = function Gdpr(_ref8) {
  var _ref8$gdpr = _ref8.gdpr,
      gdpr = _ref8$gdpr === void 0 ? {} : _ref8$gdpr,
      _ref8$cookies = _ref8.cookies,
      cookies = _ref8$cookies === void 0 ? [] : _ref8$cookies;
  var show = gdpr.show,
      _gdpr$title = gdpr.title,
      title = _gdpr$title === void 0 ? 'Privacy Information' : _gdpr$title,
      _gdpr$content = gdpr.content,
      content = _gdpr$content === void 0 ? 'This app neither saves, collects, nor shares any data about you.' : _gdpr$content,
      _gdpr$noDataText = gdpr.noDataText,
      noDataText = _gdpr$noDataText === void 0 ? 'Awesome.' : _gdpr$noDataText,
      _gdpr$allowTitle = gdpr.allowTitle,
      allowTitle = _gdpr$allowTitle === void 0 ? 'Allow:' : _gdpr$allowTitle,
      _gdpr$allowAllText = gdpr.allowAllText,
      allowAllText = _gdpr$allowAllText === void 0 ? 'All' : _gdpr$allowAllText,
      _gdpr$allowText = gdpr.allowText,
      allowText = _gdpr$allowText === void 0 ? 'Selected' : _gdpr$allowText,
      _gdpr$denyText = gdpr.denyText,
      denyText = _gdpr$denyText === void 0 ? 'None' : _gdpr$denyText;

  if (!show) {
    return div({
      "class": 'Gdpr'
    }, svg({
      "class": 'ShowHide',
      onclick: [actions.gdpr.show, {
        show: true
      }],
      viewBox: '0 0 512 512'
    }, [g([path({
      d: "\nM507,208c-1-7-7-12-14-13c-7-1-13,3-16,9\nc-5,11-16,19-29,19c-14,0-26-10-30-23c-2-8-11-13-19-11\nC393,191,389,192,384,192c-35-0-64-29-64-64c0-5,1-9,2-14\nc2-8-3-16-11-19C297,90,288,78,288,64c-0-13,8-24,19-29\nc6-3,10-9,9-16c-1-7-6-12-13-14C288,2,272,0,256,0\nC115,0,0,115,0,256c0,141,115,256,256,256c141-0,256-115,256-256\nC512,239,510,224,507,209z M414,414C374,455,318,480,256,480s-118-25-158-66\nC57,374,32,318,32,256S57,138,98,98C138,57,194,32,256,32c3,0,6,0,9,0\nC259,42,256,52,256,64c0,24,13,44,33,55C288,122,288,125,288,128\nc0,53,43,96,96,96c3,0,6-0,8-0C403,242,424,256,448,256\nc11-0,22-3,32-8c0,3,0,6,0,9C480,318,455,374,414,414z\n"
    }), circle({
      cx: '192',
      cy: '128',
      r: '32'
    }), circle({
      cx: '128',
      cy: '256',
      r: '32'
    }), circle({
      cx: '288',
      cy: '384',
      r: '32'
    }), circle({
      cx: '272',
      cy: '272',
      r: '16'
    }), circle({
      cx: '400',
      cy: '336',
      r: '16'
    }), circle({
      cx: '176',
      cy: '368',
      r: '16'
    })])]));
  }

  var hasCookies = !!cookies.length;
  return div({
    "class": 'Gdpr'
  }, [input({
    type: 'checkbox',
    name: 'show-hide',
    id: 'show-hide',
    checked: !show
  }), div({
    "class": 'Container'
  }, [title && h3(title), content && p(content), hasCookies && [ul(cookies.map(function (_ref9) {
    var name = _ref9.name,
        title = _ref9.title,
        content = _ref9.content,
        _ref9$allowed = _ref9.allowed,
        allowed = _ref9$allowed === void 0 ? false : _ref9$allowed;
    return li({
      "class": 'Cookie'
    }, [input({
      type: 'checkbox',
      title: "allow ".concat(name, " data"),
      id: name,
      checked: gdpr.allowed.includes(name),
      onchange: [actions.gdpr.toggleAllow, {
        name: name
      }]
    }), (title || content) && label({
      "for": name
    }, [title && h4(title), content && p(content)])]);
  }))], hasCookies ? [h5(allowTitle), label({
    "class": 'button allow all',
    "for": 'show-hide',
    onclick: actions.gdpr.allow
  }, allowAllText), label({
    "class": 'button allow',
    "for": 'show-hide',
    onclick: actions.gdpr.close
  }, allowText), label({
    "class": 'button allow none',
    "for": 'show-hide',
    onclick: actions.gdpr.deny
  }, denyText)] : label({
    "class": 'button',
    "for": 'show-hide',
    onclick: actions.gdpr.close
  }, noDataText)])]);
};

var GitBadges = function GitBadges(props) {
  if (typeof props === 'string') {
    props = {
      project: props
    };
  } else if (!props.project) {
    return;
  }

  var _props = props,
      _props$project = _props.project,
      project = _props$project === void 0 ? false : _props$project,
      _props$branch = _props.branch,
      branch = _props$branch === void 0 ? 'master' : _props$branch,
      _props$host = _props.host,
      host = _props$host === void 0 ? 'github' : _props$host;
  var urls = [['npm', function () {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : project;
    return v && {
      to: "https://www.npmjs.com/package/@".concat(v),
      src: "https://img.shields.io/npm/v/@".concat(v, ".svg")
    };
  }], ['travis', function () {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : project;
    return v && {
      to: "https://travis-ci.com/".concat(v),
      src: "https://img.shields.io/travis/com/".concat(v, "/").concat(branch)
    };
  }], ['appveyor', function () {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : project;

    if (v) {
      var _v$split = v.split('/'),
          _v$split2 = _slicedToArray(_v$split, 2),
          org = _v$split2[0],
          repo = _v$split2[1];

      org = org.replace(/-/g, '');
      return {
        to: "https://ci.appveyor.com/project/".concat(org, "/").concat(repo, "/branch/").concat(branch),
        src: "https://img.shields.io/appveyor/ci/".concat(org, "/").concat(repo, "/").concat(branch, ".svg")
      };
    }
  }], ['coveralls', function () {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : project;
    return {
      to: "https://coveralls.io/".concat(host, "/").concat(v),
      src: "https://img.shields.io/coveralls/".concat(host, "/").concat(v, "/").concat(branch, ".svg")
    };
  }], ['greenkeeper', function () {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : project;
    return v && {
      to: "https://greenkeeper.io",
      src: "https://badges.greenkeeper.io/".concat(v, ".svg")
    };
  }], ['snyk', function () {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : project;
    return v && {
      to: "https://snyk.io/test/".concat(host, "/").concat(v),
      src: "https://img.shields.io/snyk/vulnerabilities/github/".concat(v, ".svg")
    };
  }]].map(function (_ref10) {
    var _ref11 = _slicedToArray(_ref10, 2),
        name = _ref11[0],
        fn = _ref11[1];

    return fn(props[name]);
  }).filter(function (a) {
    return a.to && a.src;
  });

  if (!urls.length) {
    return;
  }

  return ul({
    "class": 'GitBadges'
  }, urls.map(function (_ref12) {
    var to = _ref12.to,
        src = _ref12.src;
    return li([Link({
      to: to
    }, Img({
      src: src
    }))]);
  }));
};

var Header = function Header() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var logo = props.logo,
      menu = props.menu,
      logotext = props.logotext,
      state = _objectWithoutProperties(props, ["logo", "menu", "logotext"]);

  if (!logo && !menu && !logotext) {
    return;
  }

  return header({
    "class": 'Header'
  }, [(logo || logotext) && Link({
    to: state.root,
    "class": 'Logo'
  }, [logo && Img(logo), logotext && span(logotext)]), menu && Menu({
    state: state,
    items: menu
  }), children]);
};

var Img = function Img(props) {
  if (typeof props === 'string') {
    props = {
      src: props
    };
  }

  if (!props.src) {
    return;
  }

  if (!props.alt) {
    if (props.title) {
      props.alt = props.title;
    } else {
      props.role = 'presentation';
      props.alt = '';
    }
  }

  return img(props);
};

var LightSwitch = function LightSwitch() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return button({
    "class": 'LightSwitch',
    onclick: actions.changeTheme
  });
};

var Link = function Link(_ref13, children) {
  var to = _ref13.to,
      p = _objectWithoutProperties(_ref13, ["to"]);

  var href = p.href,
      text = p.text,
      nofollow = p.nofollow,
      noreferrer = p.noreferrer,
      props = _objectWithoutProperties(p, ["href", "text", "nofollow", "noreferrer"]);

  to = to || href || '';
  props.href = to;
  var isLocal = to[0] === '/' || to[0] === '#';

  if (isLocal) {
    props.onclick = [actions.go, lib.preventDefault];
  } else {
    props.target = '_blank';
    props.rel = 'noopener';

    if (nofollow) {
      props.rel += ' nofollow';
    }

    if (noreferrer) {
      props.rel += ' noreferrer';
    }
  }

  return a(props, [text, children]);
};

var Menu = function Menu() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _props$class = props["class"],
      className = _props$class === void 0 ? 'Menu' : _props$class,
      _props$collapse = props.collapse,
      collapse = _props$collapse === void 0 ? true : _props$collapse,
      items = props.items,
      state = props.state;
  var url = state.url,
      hash = state.hash,
      root = state.root;

  if (hash && !url.endsWith(hash)) {
    url += "#".concat(hash);
  }

  return nav({
    className: className
  }, ul(items.map(function (item) {
    return MenuItem(_objectSpread({}, item, {
      url: url,
      root: root,
      collapse: collapse
    }));
  })));
};

var MenuItem = function MenuItem(props) {
  var text = props.text,
      _props$items = props.items,
      items = _props$items === void 0 ? [] : _props$items,
      url = props.url,
      root = props.root,
      _props$parentTo = props.parentTo,
      parentTo = _props$parentTo === void 0 ? undefined : _props$parentTo,
      collapse = props.collapse,
      item = _objectWithoutProperties(props, ["text", "items", "url", "root", "parentTo", "collapse"]);

  var p = {
    "class": {}
  };
  var to = item.to;

  if (to.startsWith('/#')) {
    to = to.substr(1);
  }

  var first = item.to[0];
  var isLocal = first === '/' || first === '-' || first === '#';

  if (parentTo && isLocal) {
    if (first === '-' || first === '#') {
      to = parentTo + to;
    } else {
      var start = to.split('/')[1];

      if (start) {
        var startsLikeParentEnds = parentTo.endsWith("/".concat(start, "/"));

        if (!startsLikeParentEnds && isLocal) {
          to = parentTo + to;
        }
      }
    }
  }

  var isRooted = to.startsWith(root);

  if (root && isLocal && !isRooted) {
    to = root + to;
  }

  item.to = to.replace(/\/\//g, '/');

  if (item.to === url) {
    p["class"].active = true;
  }

  var children = [];
  var active = url.startsWith(item.to) || !collapse;

  if (active) {
    children = ul(items.map(function (i) {
      return MenuItem(_objectSpread({
        parentTo: item.to,
        url: url,
        root: root,
        collapse: collapse
      }, i));
    }));
  }

  return li(p, [item.to ? Link(item, text) : span(item, text), children]);
};

var Page = function Page(_ref14, children) {
  var page = _ref14.page,
      state = _ref14.state;
  page = page ? page(state) : '404 - not found';
  var magicProps = {
    id: 'Magic',
    "class": state.pageClass
  };
  var wrapperProps = {
    "class": {
      Wrapper: true
    }
  };
  return main(magicProps, div(wrapperProps, [Route({
    state: state,
    page: page
  }), children]));
};

var Pre = function Pre(props, str) {
  if (typeof props === 'string') {
    props = {
      content: props
    };
  } else if (str) {
    props = _objectSpread({
      content: str
    }, props);
  }

  var _props2 = props,
      content = _props2.content,
      _props2$lines = _props2.lines,
      lines = _props2$lines === void 0 ? true : _props2$lines;
  var classes = {
    Pre: true,
    lines: lines
  };
  return div({
    "class": classes
  }, [div({
    "class": 'menu'
  }, [button({
    onclick: [actions.pre.clip, function (e) {
      return {
        e: e,
        content: content
      };
    }]
  }, 'copy')]), pre(lib.pre.format(content))]);
};

var Route = function Route(_ref15) {
  var page = _ref15.page,
      state = _ref15.state;
  return [Header(state), div({
    "class": 'Page',
    id: 'page'
  }, page), Footer(state)];
};

var lib = {
  db: function () {
    var init = function init() {
      return typeof window !== 'undefined' && window.localStorage || {};
    };

    var set = function set(dispatch, _ref16) {
      var action = _ref16.action,
          key = _ref16.key,
          value = _ref16.value;
      var store = lib.db.init();
      var res = lib.json.stringify(value);

      if (typeof res === 'Error') {
        dispatch(action, new Error("db:write ".concat(key)));
        return;
      }

      store[key] = res;
      dispatch(action, {
        key: key,
        value: value
      });
    };

    var get = function get(dispatch, _ref17) {
      var action = _ref17.action,
          key = _ref17.key;
      var store = lib.db.init();
      var value = undefined;

      if (key && store[key]) {
        value = lib.json.parse(store[key]);

        if (typeof res === 'Error') {
          dispatch(action, new Error("db:read ".concat(key)));
          return;
        }
      }

      dispatch(action, {
        key: key,
        value: value
      });
    };

    var del = function del(dispatch, _ref18) {
      var action = _ref18.action,
          key = _ref18.key;
      var store = lib.db.init();

      if (key && store[key]) {
        store.removeItem(key);
      }

      dispatch(action, {
        key: key,
        value: undefined
      });
    };

    return {
      set: set,
      get: get,
      del: del,
      init: init
    };
  }(),
  json: function () {
    var tryCatch = function tryCatch(fn) {
      return function () {
        try {
          return fn.apply(void 0, arguments);
        } catch (e) {
          return e;
        }
      };
    };

    var parse = tryCatch(JSON.parse);
    var stringify = tryCatch(JSON.stringify);
    return {
      parse: parse,
      stringify: stringify
    };
  }(),
  pre: function () {
    var keywords = "\nlet this long package float\ngoto private class if short\nwhile protected with debugger case\ncontinue volatile interface\n\ninstanceof super synchronized throw\nextends final throws\ntry import double enum\n\nboolean abstract function\nimplements typeof transient break\ndefault do static void\n\nint new async native switch\nelse delete null public var\nawait byte finally catch\nin return for get const char\nmodule exports require\n".trim().split(/\b/g).map(function (w) {
      return w.trim();
    });
    var builtins = "\nArray Object String Number RegExp Null Symbol\nSet WeakSet Map WeakMap\nsetInterval setTimeout\nPromise\nJSON\nInt8Array Uint8Array Uint8ClampedArray\nInt16Array Uint16Array\nInt32Array Uint32Array\nFloat32Array Float64Array\n".trim().split(/\b/g).map(function (w) {
      return w.trim();
    });
    var booleans = ['true', 'false'];

    var wrapWords = function wrapWords(string) {
      if (typeof string !== 'string') {
        return string;
      }

      var matched = string.split(/\b/);
      string = matched.map(function (word, i) {
        if (word === '') {
          return;
        }

        var cl = '';

        if (word === 'state') {
          cl = 'state';
        } else if (word === 'actions') {
          cl = 'actions';
        } else if (matched[i + 1] && matched[i + 1].includes(':')) {
          cl = 'colon';
        } else if (keywords.includes(word)) {
          cl = 'keyword';
        } else if (builtins.includes(word)) {
          cl = 'builtin';
        } else if (booleans.includes(word)) {
          cl = 'boolean';
        } else if (matched[i - 1] === '.') {
          cl = 'property';
        } else if (matched[i + 1] === '.') {
          cl = 'object';
        }

        if (cl) {
          word = span({
            "class": cl
          }, word);
        }

        return word;
      });
      return string;
    };

    var mailRegex = /([a-zA-Z0-9:+._-]+@[a-zA-Z0-9._-]+)/g;

    var wrapEmails = function wrapEmails(line) {
      return line.split(mailRegex).map(function (part) {
        if (mailRegex.test(part)) {
          var to = part.startsWith('mailto:') ? part : "mailto:".concat(part);

          var _text = part.replace('mailto:', '');

          return Link({
            "class": 'email',
            to: to
          }, _text);
        }

        return wrapWords(part);
      });
    };

    var wrapComments = function wrapComments(line, i) {
      return [wordsByLine(line.substring(0, i)), wordsByLine(line.substring(i))];
    };

    var wrapLinks = function wrapLinks(line) {
      return line.split(/(?= )/).map(function (word) {
        if (!word.includes('://')) {
          return wordsByLine(word);
        }

        var _word$split = word.split('://'),
            _word$split2 = _slicedToArray(_word$split, 2),
            protocol = _word$split2[0],
            url = _word$split2[1];

        if (protocol.match(/[a-z]/g)) {
          return word;
        }

        return Link({
          to: word
        }, word);
      });
    };

    var wrapUrls = function wrapUrls(line) {
      if (line.includes('://') && !line.includes('@')) {
        return wrapLinks(line);
      } else {
        return wrapEmails(line);
      }
    };

    var wrapStrings = function wrapStrings(line) {
      var cleaned = line.replace(/"/g, "'");

      var _cleaned$split = cleaned.split("'"),
          _cleaned$split2 = _toArray(_cleaned$split),
          start = _cleaned$split2[0],
          str = _cleaned$split2[1],
          rest = _cleaned$split2.slice(2);

      var end = rest;

      if (end.length === 1) {
        end = wordsByLine(end[0]);
      } else if (end.length > 1) {
        end = wordsByLine(end.join("'"));
      }

      var words = [];

      if (typeof str !== 'undefined') {
        words = [wrapWords(start), span({
          "class": 'string'
        }, ["'", wrapUrls(str), "'"]), end];
      } else {
        words = wrapWords(line);
      }

      return words;
    };

    var wordsByLine = function wordsByLine(line) {
      var idx = line.indexOf('//');
      var trimmed = line.trim();

      if (trimmed.startsWith('//')) {
        var indentIdx = line.search(/\S|$/);
        var indent = '';

        for (var _i2 = 0; _i2 < indentIdx; _i2++) {
          indent += ' ';
        }

        if (!trimmed.startsWith('// ')) {
          line = "".concat(indent, "// ").concat(trimmed.substr(2));
        }

        return span({
          "class": 'comment'
        }, [indent, '// ', wordsByLine(trimmed.substring(3))]);
      } else if (idx > -1 && line[idx - 1] !== ':') {
        return wrapComments(line, idx);
      } else if (line.indexOf('://') > 2) {
        return wrapLinks(line);
      } else if (line.indexOf('@') && line.includes('.') && !line.trim().includes(' ')) {
        return wrapEmails(line);
      }

      return wrapStrings(line);
    };

    var wrapLine = function wrapLine(line) {
      return code({
        "class": 'line'
      }, wordsByLine(line));
    };

    var format = function format(content) {
      return content.trim().split('\n').map(wrapLine);
    };

    return {
      format: format
    };
  }(),
  preventDefault: function () {
    var preventDefault = function preventDefault(e) {
      e.preventDefault();
      return e;
    };

    return preventDefault;
  }()
};
var actions = {
  'changeTheme': function changeTheme(state) {
    return _objectSpread({}, state, {
      pageClass: _objectSpread({}, state.pageClass, {
        light: state.theme === 'dark'
      }),
      theme: state.theme === 'dark' ? 'light' : 'dark'
    });
  },
  'gdpr': {
    'allow': function allow(state) {
      return [_objectSpread({}, state, {
        gdpr: _objectSpread({}, state.gdpr, {
          allowed: state.cookies.map(function (c) {
            return c.name;
          }),
          show: false
        })
      }), [lib.db.set, {
        key: 'magic-gdpr',
        value: {
          allowed: state.cookies.map(function (c) {
            return c.name;
          }),
          show: false
        },
        action: [actions.gdpr.show, {
          show: false
        }]
      }]];
    },
    'close': function close(state) {
      return [_objectSpread({}, state, {
        gdpr: _objectSpread({}, state.gdpr, {
          show: false
        })
      }), [lib.db.set, {
        key: 'magic-gdpr',
        value: {
          allowed: state.gdpr.allowed,
          show: false
        },
        action: [actions.gdpr.show, {
          show: false
        }]
      }]];
    },
    'deny': function deny(state) {
      return [_objectSpread({}, state, {
        gdpr: _objectSpread({}, state.gdpr, {
          allowed: []
        })
      }), [lib.db.set, {
        key: 'magic-gdpr',
        value: {
          allowed: [],
          show: false
        },
        action: [actions.gdpr.show, {
          show: false
        }]
      }]];
    },
    'show': function show(state, props) {
      var show = props.show;

      if (props.value) {
        show = props.value.show;
      }

      if (typeof show === 'boolean') {
        state.gdpr.show = show;
        return _objectSpread({}, state);
      }

      return state;
    },
    'toggleAllow': function toggleAllow(state, _ref19) {
      var name = _ref19.name;
      var gdpr = state.gdpr;
      var active = gdpr.allowed.includes(name);

      if (!active) {
        gdpr.allowed.push(name);
      } else {
        gdpr.allowed = gdpr.allowed.filter(function (c) {
          return c !== name;
        });
      }

      return _objectSpread({}, state, {
        gdpr: gdpr
      });
    }
  },
  'go': function go(state, e) {
    var to = e.currentTarget.href.replace(window.location.origin, '');

    var _to$split = to.split('#'),
        _to$split2 = _slicedToArray(_to$split, 2),
        url = _to$split2[0],
        _to$split2$ = _to$split2[1],
        hash = _to$split2$ === void 0 ? '' : _to$split2$;

    if (url === state.url && hash === state.hash) {
      return state;
    }

    window.history.pushState({
      url: url,
      hash: hash
    }, '', to);

    if (!hash) {
      window.scroll(0, 0);
    } else {
      window.location.hash = hash;
    }

    return _objectSpread({}, state, {
      url: url,
      hash: hash,
      prev: state.url
    });
  },
  'pop': function pop(state, e) {
    var _window$location = window.location,
        url = _window$location.pathname,
        hash = _window$location.hash;
    hash = hash.substring(1);

    if (e.state) {
      url = e.state.url;
      hash = e.state.hash;
    }

    if (hash) {
      window.location.hash = hash;
    } else {
      window.scroll(0, 0);
    }

    return _objectSpread({}, state, {
      url: url,
      hash: hash
    });
  },
  'pre': {
    'clip': function clip(state, _ref20) {
      var content = _ref20.content;

      if (typeof document !== 'undefined' && typeof document.execCommand === 'function') {
        var copy = document.createElement('textarea');
        copy.id = 'copy';
        copy.innerHTML = content;
        document.body.appendChild(copy);
        var child = document.getElementById('copy');
        child.select();
        document.execCommand('copy');
        document.body.removeChild(child);
      }

      return state;
    }
  }
};
var pages = {
  '/cli/': function cli(state) {
    return [h2('@magic/cli'), p(['declarative cli sanitization and execution for ', Link({
      to: 'https://magic.github.io'
    }, '@magic')]), p('sanitizes cli flags from aliases to default names'), p('rewrites process.argv accordingly'), p('provides autogenerated --help output (that can be customized)'), p('also handles commands and environment for you'), p("exports a commonjs file that allows to launch mjs files as cli's"), GitBadges('magic/cli'), h3({
      id: 'install'
    }, 'install'), p('be in a nodejs project'), Pre('npm i --save-dev @magic/cli'), h3({
      id: 'caveats'
    }, 'caveats'), p(['there are some quirks that need some careful consideration when designing a cli api', ' depending on your requirements, these caveats may or may not apply.']), ol([li([h4('last argument'), p(['if your last argument does not have a corresponding flag,', ' it will still be assigned to the last flag prior to it.', h5('workaround'), p('do not design a cli with a trailing command.'), p('TODO: add a config bool.')])]), li([h4('option argument and command name clash'), p(['if one of your options gets an argument that is equal to a command, ', ' this command will be executed', h5('workaround'), p('do not name your commands like the possible arguments.')])]), li([h4('flag arguments can not start with a dash'), p('cli arguments that start with a - will always be treated as flags, not values.'), h5('workaround'), p('do not design a cli that accepts arguments that start with a -')])]), p('those issues might get addressed in the future.'), h3({
      id: 'usage'
    }, 'Usage'), p('full api example'), Pre("\n#!/usr/bin/env node\n\n// ./bin.js\nconst spawnCli = require('@magic/cli')\n\nconst argv = ['--flag1', '--flag2', '/file/path/cli.mjs']\n\nconst cmd = 'node' // default\n\nspawnCli(argv, cmd)\n"), Pre("\n// ./bin.mjs\n\nimport cli from '@magic/cli/src/index.mjs''\n\nconst { argv, env, commands } = cli({\n  commands: [\n    ['cmd1', 'cmd1alias'],\n    'cmd2',\n  ],\n  options: [\n    ['--flag1', '-f1'],\n    ['--flag2', '-f2'],\n  ],\n  default: {\n    '--default-key': 'default-value',\n  },\n  env: [[['--production', '--prod', '--p', '-p'], 'NODE_ENV', 'production']],\n  pure: true, // do neither change process.argv nor process.env\n  pureArgv: true, // do not change process.argv\n  pureEnv: true, // do not change process.env\n})"), h3({
      id: 'argv'
    }, 'options / argv'), p('argv mappings will handle options and option aliases'), p(['using the ', Link({
      to: '/#usage'
    }, 'cli file'), ' above']), p('then, in your terminal / bash'), Pre('bin.js -f1 arg1 arg2 -f2'), p('resulting process.argv'), Pre("\nprocess.argv = [\n  '/path/to/bin/node',\n  '/path/to/bin.js',\n  '--flag1'\n  'arg1',\n  'arg2',\n  '--flag2',\n]"), p('returned javascript object'), Pre("argv === { '--flag1': ['arg1', arg2], '--flag2': []}"), h3({
      id: 'commands'
    }, 'commands'), p('cli commands can be handled too.'), Pre("\nimport cli from '@magic/cli/src/index.mjs''\n\nconst args = {\n  commands: [\n    ['dev', 'development', 'start'],\n    'serve',\n  ],\n}\n\nconst argv = cli(args)\n\n// call\n./bin.js dev serve\n\n// results:\n{\n  cmds: ['dev', 'serve'],\n  commands: ['dev', 'serve'],\n}"), h3({
      id: 'help'
    }, 'help output'), p(['@magic/cli will derive a help text from your configuration.', 'help itself can be configured to provide better error messages']), h4({
      id: 'help-simple'
    }, 'simple help message'), Pre("\nimport cli from '@magic/cli/src/index.mjs''\n\nconst args = {\n  commands: [['magic', 'm']],\n  options: [['--spell', '-s']],\n  env: [[['dev', 'development'], 'NODE_ENV', 'development']],\n  prepend: 'prepend',\n  append: 'append',\n  help: 'custom help text',\n}\n\nconst argv = cli(args)\n\n// running\n./bin.js\n// without arguments\n\n// help output\n`\n@magic/cli wrapped cli.\n\ncustom help text\n\ncli commands\nmagic - aliases: [\"m\"]\n\n\npossible command line flags:\n--spell - aliases: [\"-s\"]\n\n\nenvironment switches:\ndev: set NODE_ENV to development - aliases [\"development\"]\n`"), h4({
      id: 'help-detailed'
    }, 'detailed help message'), p('the help property will accept an object which maps to the args object'), Pre("\nimport cli from '@magic/cli/src/index.mjs''\n\nconst args = {\n  commands: [['magic', 'm']],\n  options: [['--spell', '-s']],\n  env: [[['dev', 'development'], 'NODE_ENV', 'development']],\n  prepend: 'prepend',\n  append: 'append',\n  help: {\n    name: 'cli name',\n    text: 'custom help text',\n    commands: {\n      magic: 'magic info help text',\n    },\n    options: {\n      '--spell': 'cast a simple spell',\n    },\n    env: ['dev', 'set environment to development'],\n  },\n}\n\nconst argv = cli(args)\n\n// running\n./bin.js\n// without arguments\n\n// help output\n`\ncli name\n\ncustom help text\n\ncommands:\nmagic - aliases: [\"m\"]\n\nflags:\n--spell - aliases: [\"-s\"]\n\nenvironment switches:\ndev: set process.NODE_ENV to development - aliases [\"development\"]\n`"), h3({
      id: 'config'
    }, 'configuration'), p('there are some configuration parameters that can be passed to the cli function'), h4({
      id: 'config-pure'
    }, 'pure'), Pre("\nconst args = {\n  pure: false,    // set to true to prevent changes to process.argv and process.env\n  pureEnv: false, // set to true to prevent changes to process.env\n  pureArgv: false, // set to true to prevent changes to process.argv\n}\n\ncli(args)"), h3({
      id: 'config-prepend-append'
    }, 'prepend/append'), p('process.argv values can be prepended and appended'), Pre("\nimport cli from '@magic/cli/src/index.mjs'\n\nconst args = {\n  prepend: ['prepended']\n  append: ['appended']\n}\n\ncli(args)"), h4({
      id: 'config-default'
    }, 'default'), p('use this to set default process.argv key: value pairs that should be set if they are not'), Pre("\nimport cli from '@magic/cli/src/index.mjs''\n\nconst args = {\n  options: [\n    ['--default-key'],\n  ],\n  default: {\n    '--default-key': 'default-value',\n  },\n}\n\nconst argv = cli(args)\n\n// returns\n{\n  argv: {\n    '--default-key': 'default-value',\n  },\n}"), h2({
      id: 'changelog'
    }, 'changelog'), h3('0.0.3'), p('error if spawned process errors. (process.exit(1)'), h3('0.0.4'), p('console output now aligns'), h3('0.0.5'), p('node 12.4.0 does not have --experimental-node-modules flag.'), h3('0.0.6'), p('readd --experimental-node-modules flag for 13.1.0+'), h3('0.0.7'), p('bump node version'), p('update @magic/log'), h3('0.0.8'), p('help is shown if commands exist but none are given'), h3('0.0.9'), p('update dependencies'), h3('0.0.10'), p('update dependencies'), h2({
      id: 'source'
    }, 'source'), p(['the source for this page is in the ', Link({
      to: 'https://github.com/magic/cli/tree/master/example'
    }, 'example directory'), ' and gets built and published to github using ', Link({
      to: 'https://github.com/magic/core'
    }, '@magic/core')])];
  },
  '/cli/404/': function cli404() {
    return div('404 - not found');
  }
};
app({
  init: [_objectSpread({}, initialState, {
    url: window.location.pathname,
    hash: window.location.hash.substr(1)
  }), [[lib.db.get, {
    key: 'magic-gdpr',
    action: actions.gdpr.show
  }]]],
  subscriptions: function subscriptions(state) {
    return [[helpers.listenPopState, actions.pop]];
  },
  view: function view(state) {
    var url = pages[state.url] ? state.url : '/404/';
    var page = pages[url];
    var s = state.pages && state.pages[url];

    if (s) {
      Object.keys(s).forEach(function (key) {
        state[key] = s[key];
      });
    }

    return Page({
      page: page,
      state: state
    }, [Gdpr(state), LightSwitch(state)]);
  },
  node: document.getElementById('Magic')
});