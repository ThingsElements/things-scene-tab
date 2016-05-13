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

},{"./tab":2}],2:[function(require,module,exports){
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

var Tab = function (_Rect) {
  _inherits(Tab, _Rect);

  function Tab() {
    _classCallCheck(this, Tab);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Tab).apply(this, arguments));
  }

  _createClass(Tab, [{
    key: '_draw',
    value: function _draw(context) {

      _get(Object.getPrototypeOf(Tab.prototype), '_draw', this).call(this, context);

      var _model = this.model;
      var tabIndex = _model.tabIndex;
      var left = _model.left;
      var top = _model.top;
      var width = _model.width;
      var height = _model.height;
      var fillStyle = _model.fillStyle;
      var strokeStyle = _model.strokeStyle;
      var lineWidth = _model.lineWidth;


      var reference = this.reference;

      if (reference) {
        var components = reference.components;
        var label_height = this.labelHeight;

        for (var i = 0; i < components.length; i++) {

          context.beginPath();

          context.rect(left, top + i * label_height, width, label_height);

          context.lineWidth = lineWidth;
          context.strokeStyle = strokeStyle;
          context.fillStyle = fillStyle;

          context.stroke();
          context.fill();

          context.closePath();
        }
      } else {
        // TODO reference 가 잘못되거나 안되어있다는 경고 의미로 뭔가 그려라..
      }
    }
  }, {
    key: 'onmouseup',
    value: function onmouseup(e) {

      var down_point = this.__down_point;
      delete this.__down_point;

      if (!down_point || down_point.x != e.offsetX || down_point.y != e.offsetY) {
        return;
      }

      var point = this.transcoordC2S(e.offsetX, e.offsetY);

      var _model2 = this.model;
      var left = _model2.left;
      var top = _model2.top;


      var x = point.x - left;
      var y = point.y - top;

      var label_height = this.labelHeight;

      y /= label_height;
      y = Math.floor(y);

      this.activeIndex = y;
    }
  }, {
    key: 'onmousedown',
    value: function onmousedown(e) {
      this.__down_point = {
        x: e.offsetX,
        y: e.offsetY
      };
    }
  }, {
    key: 'reference',
    get: function get() {
      var reference = this.model.reference;

      if (!reference) return null;

      return this.root.findById(reference);
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
      if (this.reference) this.reference.activeIndex = index;
    }
  }]);

  return Tab;
}(Rect);

exports.default = Tab;


Component.register('tab', Tab);

},{}]},{},[1,2]);
