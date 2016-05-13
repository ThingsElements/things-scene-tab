var { Component, Container } = scene

export default class Tab extends Container {

  _draw(context) {

    var { tabIndex } = this.model



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

    if(x > 0)
      return

    y /= LABEL_HEIGHT
    y = Math.floor(y)

    if(!this.layoutConfig)
      this.layoutConfig = {}

    if(y > this.components.length)
      return

    /* 생성 버튼이 클릭되면, 새로운 floor를 추가한다. */
    if(y == this.components.length) {
      this.add(Model.compile({
        type: 'floor',
        width: 100,
        height: 100
      }))
    }

    var config = Object.assign({}, this.layoutConfig)

    config.activeIndex = y
    this.set('layoutConfig', config)
  }

  onmousedown(e) {
    this.__down_point = {
      x: e.offsetX,
      y: e.offsetY
    }
  }

}

Component.register('tab', Tab)
