var { Component, Container, Rect, LinearHorizontalLayout, LinearVerticalLayout } = scene

export default class TabButton extends Rect {


  get index() {
    return this.model.index
  }

  get activated() {
    return this.parent.activeIndex === this.index
  }

  _pre_draw(context) {
    let {
      fillStyle,
      activeFillStyle
    } = this.model

    if(!this._fillStyle) this._fillStyle = fillStyle

    if(this.activated) {
      this.model.fillStyle = activeFillStyle
    } else {
      this.model.fillStyle = this._fillStyle
    }
  }

  _post_draw(context) {
    super._post_draw(context)
  }

  onclick(e) {
    this.parent.activeIndex = this.index
    this.parent.invalidate()
  }
}

Component.register('tab-button', TabButton)
