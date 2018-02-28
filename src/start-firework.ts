import Firework from './Firework'

export default function startFirework (ctx: CanvasRenderingContext2D): void {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth
  const viewHeight = window.innerHeight || document.documentElement.clientHeight

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
}
