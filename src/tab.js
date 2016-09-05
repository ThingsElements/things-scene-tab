var { Component, Container, Rect } = scene

export default class Tab extends Rect {

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

  set activeIndex(index) {

    this.set('activeIndex', index)
    if(this.reference) {
      this.reference.activeIndex = index
    }

  }

  _post_draw(context) {

    super._post_draw(context)

    var {
      tabIndex,
      left,
      top,
      width,
      height,
      fillStyle,
      strokeStyle,
      lineWidth
    } = this.model

    var reference = this.reference

    if(reference) {
      if(!this.activeIndex)
        this.activeIndex = 0

      let components = reference.components
      let label_height = this.labelHeight

      for(let i = 0;i < components.length;i++) {

        context.beginPath();

        context.rect(left, top + i * label_height,
          width, label_height)

        context.lineWidth = lineWidth
        context.strokeStyle = strokeStyle

        if(this.activeIndex == i)
          context.fillStyle = 'yellow'
        else
          context.fillStyle = fillStyle

        context.stroke()
        context.fill()

        context.closePath();
      }
    } else {
      // TODO reference 가 잘못되거나 안되어있다는 경고 의미로 뭔가 그려라..
    }
  }

  onmouseup(e) {

    var down_point = this.__down_point
    delete this.__down_point

    if(!down_point
      || down_point.x != e.offsetX
      || down_point.y != e.offsetY) {
      return
    }

    var point = this.transcoordC2S(e.offsetX, e.offsetY);

    var { left, top } = this.model

    var x = point.x - left
    var y = point.y - top

    var label_height = this.labelHeight

    y /= label_height
    y = Math.floor(y)

    this.activeIndex = y
  }

  onmousedown(e) {
    this.__down_point = {
      x: e.offsetX,
      y: e.offsetY
    }
  }

}

Component.register('tab', Tab)
