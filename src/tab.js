var { Component, Container, Rect, LinearHorizontalLayout, LinearVerticalLayout, Model } = scene

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

    var {
      tabIndex,
      left,
      top,
      width,
      height,
      fillStyle,
      activeFillStyle,
      strokeStyle,
      fontColor,
      lineWidth
    } = this.model

    let children = []

    var reference = this.reference

    var isRefCompChanged = false;

    this._refComponents = this._refComponents || []

    if(reference) {
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

          children.push({
            type: 'tab-button',
            index: i,
            text: components[i].model.text || String(i+1),
            fillStyle: fillStyle,
            activeFillStyle: activeFillStyle,
            fontColor: fontColor,
            strokeStyle: strokeStyle,
            margin: {
              top: 5,
              left: 5,
              right: 5,
              bottom: 5
            },
            left: 0,
            top: 0,
            width: width,
            height: height
          })
        }

        for(let i in children) {
          this.addComponent(Model.compile(children[i]))
        }
      }

    } else {
      // TODO reference 가 잘못되거나 안되어있다는 경고 의미로 뭔가 그려라..
    }
  }

  onchange(after, before) {
    if(after.hasOwnProperty("reference")){
      this.reference = after.reference
      // if(this.reference) {
      //   this.activeIndex = this.get('activeIndex') || 0
      // }
    }

    this.invalidate()
  }

}

Component.register('tab', Tab)
