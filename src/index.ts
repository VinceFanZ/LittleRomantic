/// <reference path="../global.d.ts" />

import 'normalize.css'
import createCanvas from './create-canvas'

const viewWidth = window.innerWidth || document.documentElement.clientWidth
const viewHeight = window.innerHeight || document.documentElement.clientHeight
const ctx = createCanvas(viewWidth, viewHeight)
console.log(ctx)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept(() => {
    // or use this instead of dispose()
    // window.location.reload();
  })

  module.hot.dispose(() => {
    window.location.reload()
  })
}
