/**
 * 微粒类
 *
 * @class Particle
 */
class Particle {
  private x: number
  private y: number
  private size: number
  private speed: number
  private radian: number
  private vx: number
  private vy: number

  constructor (x: number, y: number, size: number = 1, radius: number = 1.2) {
    this.x = x
    this.y = y
    this.size = size
    this.speed = Math.random() // 微粒速度
    this.radian = Math.PI * 2 * Math.random() // 微粒偏移角度（弧度值）
    this.vx = radius * Math.cos(this.radian) * this.speed
    this.vy = radius * Math.sin(this.radian) * this.speed
  }
  public render (ctx: CanvasRenderingContext2D): void {
    this.go()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    ctx.fill()
  }
  private go (): void {
    this.x += this.vx
    this.y += this.vy
    this.vy += 0.02 // 重力影响 y越大实际越偏下

    // 阻力
    this.vx *= 0.98
    this.vy *= 0.98
  }
}

export default Particle
