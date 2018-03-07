import Firework from './Firework'

export default function startFirework (ctx: CanvasRenderingContext2D): void {
  const viewWidth = ctx.canvas.width
  const viewHeight = ctx.canvas.height
  const skyColorConfig: string = 'hsla({hue}, 60%, {lightness}%, 0.2)'

  const fireworkTimeRange: { min: number; max: number } = { min: 30, max: 60 }
  // 创建烟花的时间间隔
  let fireworkTime = Math.floor(Math.random() * (fireworkTimeRange.max - fireworkTimeRange.min) + fireworkTimeRange.min)
  const fireworks: Array<Firework> = []
  let skyColor: { lightness: number; hue: number } = {
    lightness: 0,
    hue: 210,
  }

  loop()

  function loop () {
    window.requestAnimationFrame(loop)

    ctx.fillStyle = skyColorConfig
      .replace('{lightness}', `${5 + skyColor.lightness * 15}`)
      .replace('{hue}', `${skyColor.hue}`)
    ctx.fillRect(0, 0, viewWidth, viewHeight)

    skyColor = {
      lightness: 0,
      hue: 210,
    }

    if (--fireworkTime <= 0) {
      fireworkTime = Math.floor(Math.random() * (fireworkTimeRange.max - fireworkTimeRange.min) + fireworkTimeRange.min)
      fireworks.push(new Firework())
    }

    fireworks.forEach((firework, index) => {
      skyColor =
        skyColor.lightness >= fireworks[index].getSkyColor().lightness ? skyColor : fireworks[index].getSkyColor()
      !firework.render(ctx) && fireworks.splice(index, 1)
    })
  }
}
