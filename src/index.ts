/// <reference path="../global.d.ts" />

import 'normalize.css'
import createCanvas from './create-canvas'
import Firework from './Firework'

const viewWidth = window.innerWidth || document.documentElement.clientWidth
const viewHeight = window.innerHeight || document.documentElement.clientHeight
const ctx = createCanvas(viewWidth, viewHeight)

ctx.fillStyle = 'hsla(210, 60%, 5%, 0.9)'
ctx.fillRect(0, 0, viewWidth, viewHeight)

const fireworkTimeRange: { min: number; max: number } = { min: 30, max: 60 }
let fireworkTime = Math.floor(Math.random() * (fireworkTimeRange.max - fireworkTimeRange.min) + fireworkTimeRange.min)
const fireworks: Array<Firework> = []

loop()

function loop () {
  window.requestAnimationFrame(loop)
  ctx.clearRect(0, 0, viewWidth, viewHeight)

  if (--fireworkTime <= 0) {
    fireworkTime = Math.floor(Math.random() * (fireworkTimeRange.max - fireworkTimeRange.min) + fireworkTimeRange.min)
    fireworks.push(new Firework())
  }

  fireworks.forEach((firework, index) => {
    !firework.render(ctx) && fireworks.splice(index, 1)
  })
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
