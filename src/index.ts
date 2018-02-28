/// <reference path="../global.d.ts" />

import 'normalize.css'
import createCanvas from './create-canvas'
import startFirework from './start-firework'

const viewWidth = window.innerWidth || document.documentElement.clientWidth
const viewHeight = window.innerHeight || document.documentElement.clientHeight

const ctx = createCanvas(viewWidth, viewHeight, 'hsla(210, 60%, 5%, 0.9)').getContext('2d')

startFirework(ctx)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept(() => {
    // or use this instead of dispose()
    // window.location.reload();
  })

  module.hot.dispose(() => {
    window.location.reload()
  })
}
