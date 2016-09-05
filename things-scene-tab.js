(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tab = require('./tab');

Object.defineProperty(exports, 'Tab', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_tab).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./tab":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _scene = scene;
var Component = _scene.Component;
var Container = _scene.Container;
var Rect = _scene.Rect;
var LinearHorizontalLayout = _scene.LinearHorizontalLayout;
var LinearVerticalLayout = _scene.LinearVerticalLayout;

var TabButton = function (_Rect) {
  _inherits(TabButton, _Rect);

  function TabButton() {
    _classCallCheck(this, TabButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TabButton).apply(this, arguments));
  }

  _createClass(TabButton, [{
    key: '_pre_draw',
    value: function _pre_draw(context) {
      var _model = this.model;
      var fillStyle = _model.fillStyle;
      var activeFillStyle = _model.activeFillStyle;


      if (!this._fillStyle) this._fillStyle = fillStyle;

      if (this.activated) {
        this.model.fillStyle = activeFillStyle;
      } else {
        this.model.fillStyle = this._fillStyle;
      }
    }
  }, {
    key: '_post_draw',
    value: function _post_draw(context) {
      _get(Object.getPrototypeOf(TabButton.prototype), '_post_draw', this).call(this, context);
    }
  }, {
    key: 'onmouseup',
    value: function onmouseup(e) {
      this.parent.activeIndex = this.index;
      this.parent.invalidate();
    }
  }, {
    key: 'onmousedown',
    value: function onmousedown(e) {
      e.stopPropagation();
    }
  }, {
    key: 'ondblclick',
    value: function ondblclick(e) {
      e.stopPropagation();
    }
  }, {
    key: 'index',
    get: function get() {
      return this.model.index;
    }
  }, {
    key: 'activated',
    get: function get() {
      return this.parent.activeIndex === this.index;
    }
  }]);

  return TabButton;
}(Rect);

exports.default = TabButton;


Component.register('tab-button', TabButton);

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tabButton = require('./tab-button');

var _tabButton2 = _interopRequireDefault(_tabButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _scene = scene;
var Component = _scene.Component;
var Container = _scene.Container;
var Rect = _scene.Rect;
var LinearHorizontalLayout = _scene.LinearHorizontalLayout;
var LinearVerticalLayout = _scene.LinearVerticalLayout;

var Tab = function (_Container) {
  _inherits(Tab, _Container);

  function Tab() {
    _classCallCheck(this, Tab);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Tab).apply(this, arguments));
  }

  _createClass(Tab, [{
    key: '_post_draw',


    // _pre_draw(context) {
    //
    //   super._pre_draw(context)
    //
    //   var {
    //     tabIndex,
    //     left,
    //     top,
    //     width,
    //     height,
    //     fillStyle,
    //     strokeStyle,
    //     lineWidth
    //   } = this.model
    //
    //   let children = []
    //
    //   var reference = this.reference
    //
    //   if(reference && reference.components.length !== this.components.length) {
    //     if(!this.activeIndex)
    //       this.activeIndex = 0
    //
    //     let components = reference.components
    //     let label_height = this.labelHeight
    //
    //     for(let i in this.components) {
    //       this.removeComponent(this.components[i])
    //     }
    //
    //     for(let i = 0;i < components.length;i++) {
    //       // this.components.push({
    //       //   target: 'rect',
    //       //   text: String(i+1),
    //       //   fillStyle: '#ffffff'
    //       // })
    //       children.push({
    //         type: 'rect',
    //         text: String(i+1),
    //         fillStyle: 'navy',
    //         fontColor: 'white',
    //         left: 0,
    //         top: 0,
    //         width: width,
    //         height: height
    //       })
    //     }
    //
    //     for(let i in children) {
    //       this.add(new Rect(children[i], this.app))
    //     }
    //   }
    // }

    value: function _post_draw(context) {

      _get(Object.getPrototypeOf(Tab.prototype), '_post_draw', this).call(this, context);

      // var {
      //   tabIndex,
      //   left,
      //   top,
      //   width,
      //   height,
      //   fillStyle,
      //   strokeStyle,
      //   lineWidth
      // } = this.model
      //
      // let children = this.hierarchy.components
      //
      // var reference = this.reference
      //
      // if(reference) {
      //   if(!this.activeIndex)
      //     this.activeIndex = 0
      //
      //   let components = reference.components
      //   let label_height = this.labelHeight
      //
      //   for(let i = 0;i < components.length;i++) {
      //
      //
      //
      //     context.beginPath();
      //
      //     context.rect(left, top + i * label_height,
      //       width, label_height)
      //
      //     context.lineWidth = lineWidth
      //     context.strokeStyle = strokeStyle
      //
      //     if(this.activeIndex == i)
      //       context.fillStyle = 'yellow'
      //     else
      //       context.fillStyle = fillStyle
      //
      //     context.stroke()
      //     context.fill()
      //
      //     context.closePath();
      //   }
      // } else {
      //   // TODO reference 가 잘못되거나 안되어있다는 경고 의미로 뭔가 그려라..
      // }

      var _model = this.model;
      var tabIndex = _model.tabIndex;
      var left = _model.left;
      var top = _model.top;
      var width = _model.width;
      var height = _model.height;
      var fillStyle = _model.fillStyle;
      var activeFillStyle = _model.activeFillStyle;
      var strokeStyle = _model.strokeStyle;
      var fontColor = _model.fontColor;
      var lineWidth = _model.lineWidth;


      var children = [];

      var reference = this.reference;

      if (reference && reference.components.length !== this.components.length) {
        if (!this.activeIndex) this.activeIndex = 0;

        var components = reference.components;
        var label_height = this.labelHeight;

        for (var i in this.components) {
          this.removeComponent(this.components[i]);
        }

        for (var _i = 0; _i < components.length; _i++) {
          // this.components.push({
          //   target: 'rect',
          //   text: String(i+1),
          //   fillStyle: '#ffffff'
          // })
          children.push({
            index: _i,
            text: String(_i + 1),
            fillStyle: fillStyle || 'navy',
            activeFillStyle: activeFillStyle || 'red',
            fontColor: fontColor || 'white',
            strokeStyle: strokeStyle || 'red',
            lineWidth: lineWidth,
            left: 0,
            top: 0,
            width: width,
            height: height
          });
        }

        for (var _i2 in children) {
          this.add(new _tabButton2.default(children[_i2], this.app));
        }
      }
    }
  }, {
    key: 'onchange',
    value: function onchange(after, before) {
      if (after.hasOwnProperty("reference")) {
        this.reference = after.reference;
        // if(this.reference) {
        //   this.activeIndex = this.get('activeIndex') || 0
        // }
      }

      this.invalidate();
    }
  }, {
    key: 'layout',
    get: function get() {
      var _model2 = this.model;
      var width = _model2.width;
      var height = _model2.height;


      if (width >= height) {
        return LinearHorizontalLayout;
      } else {
        return LinearVerticalLayout;
      }
    }
  }, {
    key: 'reference',
    get: function get() {
      var reference = this.model.reference;

      if (!reference) return null;

      return this.root.findById(reference);
    },
    set: function set(reference) {
      this.model.reference = reference;
    }
  }, {
    key: 'labelHeight',
    get: function get() {
      var components = this.reference.components.length;
      var height = this.model.height;

      return components > 0 && height / components || height;
    }
  }, {
    key: 'activeIndex',
    get: function get() {
      return this.get('activeIndex');
    },
    set: function set(index) {

      this.set('activeIndex', index);
      if (this.reference) {
        this.reference.activeIndex = index;
      }
    }
  }]);

  return Tab;
}(Container);

exports.default = Tab;


Component.register('tab', Tab);

},{"./tab-button":2}]},{},[1,3]);
