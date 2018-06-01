/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { Component, Container, RectPath, LinearHorizontalLayout, LinearVerticalLayout } from '@hatiolab/things-scene'

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

  prerender(context) {
    super.prerender(context)
    let {
      fillStyle,
      activeFillStyle,
      activeLineColor,
      activeLineWidth,
      fontColor,
      activeFontColor
    } = this.model

    // backup style
    if (!this.hasOwnProperty('_fillStyle')) {
      this._fillStyle = fillStyle
    }
    if (!this.hasOwnProperty('_fontColor')) {
      this._fontColor = fontColor
    }

    if (this.activated) {
      this.model.fillStyle = activeFillStyle
      this.model.fontColor = activeFontColor
      this.model.strokeStyle = activeLineColor
      this.model.lineWidth = activeLineWidth
    } else {
      this.model.fillStyle = this._fillStyle
      this.model.fontColor = this._fontColor
      this.model.strokeStyle = this._strokeStyle
      this.model.lineWidth = this._lineWidth
    }
  }

  render(context) {
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

  postrender(context) {
    super.postrender(context)

    // restore style
    this.model.fillStyle = this._fillStyle
    this.model.fontColor = this._fontColor
    this.model.strokeStyle = this._strokeStyle
    this.model.lineWidth = this._lineWidth

    delete this._fillStyle
    delete this._fontColor
    delete this._strokeStyle
    delete this._lineWidth
  }

  onclick(e) {
    this.parent.activeIndex = this.index
    this.parent.invalidate()
  }

  onchange(after) {
    if (after.hasOwnProperty("fillStyle"))
      this._fillStyle = after.fillStyle

    if (after.hasOwnProperty("fontColor"))
      this._fontColor = after.fontColor

    if (after.hasOwnProperty("strokeStyle"))
      this._fontColor = after.fontColor

    if (after.hasOwnProperty("lineWidth"))
      this._fontColor = after.fontColor


    if (after.hasOwnProperty('text')) {
      this.parent.reference.getAt(this.index).set('text', after.text)
    }

    this.invalidate()
  }
}

Component.register('tab-button', TabButton)
