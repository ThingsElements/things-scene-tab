var { Component, Container, Rect, LinearHorizontalLayout, LinearVerticalLayout } = scene

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

  _post_draw(context) {

    super._post_draw(context)

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

    if(reference && reference.components.length !== this.components.length) {
      if(!this.activeIndex)
        this.activeIndex = 0

      let components = reference.components
      let label_height = this.labelHeight

      for(let i in this.components) {
        this.removeComponent(this.components[i])
      }

      for(let i = 0;i < components.length;i++) {
        // this.components.push({
        //   target: 'rect',
        //   text: String(i+1),
        //   fillStyle: '#ffffff'
        // })
        children.push({
          index: i,
          text: String(i+1),
          fillStyle: fillStyle || 'navy',
          activeFillStyle: activeFillStyle || 'red',
          fontColor: fontColor || 'white',
          strokeStyle: strokeStyle || 'red',
          lineWidth: lineWidth,
          left: 0,
          top: 0,
          width: width,
          height: height
        })
      }

      for(let i in children) {
        this.add(new TabButton(children[i], this.app))
      }
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
