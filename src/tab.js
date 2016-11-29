var { Component, Container, Rect, LinearHorizontalLayout, LinearVerticalLayout, Model } = scene

const HANDLE_WIDTH = 25
const HANDLE_HEIGHT = 25

function rgba(r, g, b, a) {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'string',
    label: 'tab-reference',
    name: 'reference',
    property: 'reference'
  }, {
    type: 'number',
    label: 'tab-active-index',
    name: 'activeIndex',
    property: {
      min: 0,
      step: 1
    }
  }, {
    type: 'color',
    label: 'activeFillStyle',
    name: 'activeFillStyle',
    property: 'activeFillStyle'
  }, {
    type: 'color',
    label: 'activeFontColor',
    name: 'activeFontColor',
    property: 'activeFontColor'
  }]
}

import TabButton from './tab-button'

export default class Tab extends Container {

  get layout() {
    let {
      width,
      height
    } = this.model

    if(width >= height) {
      return LinearHorizontalLayout
    } else {
      return LinearVerticalLayout
    }
  }

  get nature() {
    return NATURE
  }

  // 컴포넌트를 임의로 추가 및 삭제할 수 있는 지를 지정하는 속성임.
  get focusible() {
    return false
  }

  get reference() {
    var { reference } = this.model
    if(!reference)
      return null

    return this.root.findById(reference)
  }

  get labelHeight() {
    var components = this.reference.components.length
    var height = this.model.height

    return (components > 0 && height / components) || height
  }

  get activeIndex() {
    return this.get('activeIndex')
  }

  set reference(reference) {
    this.model.reference = reference
  }

  set activeIndex(index) {

    this.set('activeIndex', index)
    if(this.reference) {
      this.reference.activeIndex = index
    }

  }

  _draw(context) {

    super._draw(context)

    this._refComponents = this._refComponents || []

    if(this.reference) {
      this.rebuildTabButtons(context)
    } else {
      // TODO reference 가 잘못되거나 안되어있다는 경고 의미로 뭔가 그려라..
    }
  }

  _post_draw(context) {
    super._post_draw(context)

    if(!this.app.isEditMode)
      return

    var { left, top, width, fillStyle } = this.model


    // 이동 핸들 그리기
    context.beginPath();

    context.rect(left + width, top, HANDLE_WIDTH, HANDLE_HEIGHT)

    let color = 255 - 20 % 255
    context.fillStyle = rgba(color, color, color, 1)
    context.fill()

    context.closePath();
  }

  contains(x, y) {

    if(!this.app.isEditMode)
      return super.contains(x, y)

    if(super.contains(x, y))
      return true

    var { left, top, width } = this.bounds;

    var right = left + width;

    var h = HANDLE_HEIGHT

    return (x < Math.max(right + HANDLE_WIDTH, right ) && x > Math.min(right + HANDLE_WIDTH, right)
      && y < Math.max(top + h, top) && y > Math.min(top + h, top));
  }

  rebuildTabButtons() {
    var {
      tabIndex = 0,
      left,
      top,
      width,
      height,
      fillStyle,
      activeFillStyle,
      strokeStyle,
      fontColor,
      activeFontColor,
      lineWidth
    } = this.model

    var isRefCompChanged = false;
    var reference = this.reference
    let children = []
    if(this._refComponents.length !== this.reference.components.length) {
      isRefCompChanged = true;
    } else {
      for(let i in this.reference.components) {
        if( this._refComponents[i] != this.reference.components[i].serialize() ) {
          isRefCompChanged = true;
          break;
        }
      }
    }

    if(isRefCompChanged) {
      this._refComponents = []

      if(!this.activeIndex)
        this.activeIndex = 0

      let components = reference.components
      let label_height = this.labelHeight

      let componentsLength = this.components.length

      for(var i=componentsLength-1; i>=0; i--) {
        this.removeComponent(this.components[i])
      }

      for(let i = 0;i < components.length;i++) {
        if(components[i].model.type != 'floor')
          continue;

        this._refComponents.push(components[i].serialize());

        children.push(Model.compile({
          type: 'tab-button',
          index: i,
          text: components[i].model.text || String(i+1),
          fillStyle: fillStyle || 'transparent',
          activeFillStyle: activeFillStyle,
          fontColor: fontColor,
          activeFontColor: activeFontColor || fontColor,
          strokeStyle: strokeStyle,
          left: 0,
          top: 0,
          width: width,
          height: height
        }))
      }

      this.add(children)

    }

    this.reflow()
  }

  setTabButtonsStyle() {
    var {
      fillStyle,
      activeFillStyle,
      fontColor,
      activeFontColor
    } = this.model

    var children = this.components

    for (var i in children) {
      var tabBtn = children[i];
      tabBtn.set({
        fillStyle: fillStyle,
        activeFillStyle: activeFillStyle,
        fontColor: fontColor,
        activeFontColor: activeFontColor
      })
    }
  }

  onchange(after, before) {
    if(after.hasOwnProperty("reference")){
      this.reference = after.reference
    }

    if(after.hasOwnProperty("activeFillStyle")
      || after.hasOwnProperty("activeFontColor")
      || after.hasOwnProperty("fillStyle")
      || after.hasOwnProperty("fontColor")) {
      this.setTabButtonsStyle()
    }

    this.invalidate()
  }

}

Component.register('tab', Tab)
