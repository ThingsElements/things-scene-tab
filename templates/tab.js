export default {
  name: 'tab',
    /* 다국어 키 표현을 어떻게.. */
  description: '...',
  /* 다국어 키 표현을 어떻게.. */
  group: 'container',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon: '../',
  /* 또는, Object */
  template: {
    type: 'tab',
    model: {
      type: 'tab',
      left: 100,
      top: 100,
      width: 100,
      height: 400,
      lineWidth: 5,
      fillStyle: 'navy',
      activeFillStyle: 'red',
      strokeStyle: 'white',
      fontColor: 'white'
    }
  }
}
