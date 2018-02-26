/// <reference path="../global.d.ts" />

import 'normalize.css'
import createCanvas from './create-canvas'
import Particle from './Particle'

const viewWidth = window.innerWidth || document.documentElement.clientWidth
const viewHeight = window.innerHeight || document.documentElement.clientHeight
const ctx = createCanvas(viewWidth, viewHeight)

let i = 0
while (i < 100) {
  const x = Math.random() * viewWidth
  const y = Math.random() * viewHeight
  const particle = new Particle(x, y)
  particle.render(ctx)
  ++i
}

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept(() => {
    // or use this instead of dispose()
    // window.location.reload();
  })

  module.hot.dispose(() => {
    window.location.reload()
  })
}
