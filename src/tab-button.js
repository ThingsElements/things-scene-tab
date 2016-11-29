var { Component, Container, RectPath, LinearHorizontalLayout, LinearVerticalLayout } = scene



export default class TabButton extends RectPath(Component) {


  get index() {
    return this.model.index
  }

  get activated() {
    return this.parent.activeIndex === this.index
  }

  removed(parent) {
    this.dispose()
  }

  _pre_draw(context) {
    super._pre_draw(context)
    let {
      fillStyle,
      activeFillStyle,
      fontColor,
      activeFontColor
    } = this.model

    if(this._fillStyle == undefined ) {
      this._fillStyle = fillStyle
    }
    if(this._fontColor == undefined) {
      this._fontColor = fontColor
    }

    if(this.activated) {
      this.model.fillStyle = activeFillStyle
      this.model.fontColor = activeFontColor
    } else {
      this.model.fillStyle = this._fillStyle
      this.model.fontColor = this._fontColor
    }
  }

  _draw(context) {
    var {
      left = 0,
      top = 0,
      width,
      height
    } = this.bounds;

    // 컨테이너의 바운드를 표현한다.(컨테이너의 기본 그리기 기능)
    context.beginPath();

    context.rect(left, top, width, height);

    this.drawFill(context)
    this.drawStroke(context)
  }

  _post_draw(context) {
    super._post_draw(context)

    this.model.fillStyle = this._fillStyle
    this.model.fontColor = this._fontColor

    delete this._fillStyle
    delete this._fontColor
  }

  onclick(e) {
    this.parent.activeIndex = this.index
    this.parent.invalidate()
  }

  onchange(after) {
    if(after.hasOwnProperty("fillStyle"))
      this._fillStyle = after.fillStyle

    if(after.hasOwnProperty("fontColor"))
      this._fontColor = after.fontColor

    this.invalidate()
  }
}

Component.register('tab-button', TabButton)
