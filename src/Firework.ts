import Particle from './Particle'

const config = {
  width: window.innerWidth || document.documentElement.clientWidth,
  height: window.innerHeight || document.documentElement.clientHeight,
}

/**
 * 烟花类
 *
 * @class Firework
 */
class Firework {
  private x: number
  private y: number
  private xEnd: number
  private yEnd: number
  private wait: number
  private count: number

  private size: number = 2 // 烟花半径大小
  private velocity: number = -3 // 上升速度

  private opacity: number = 0.8
  private color: string = `hsla(${Math.floor(360 * Math.random())},80%,60%,1)`

  private particles: Array<Particle> = []

  private status: number = 1

  /**
   * Creates an instance of Firework.
   * @param {number} [x=config.width / 8 + Math.random() * config.width * 3 / 4] 发射点 x
   * @param {number} [y=config.height] 发射点 y
   * @param {number} [xEnd] 爆炸点 x
   * @param {number} [yEnd=config.width / 8 + Math.random() * config.width * 3 / 8] 爆炸点 y
   * @param {number} [wait=30 + Math.random() * 30] 升空后等待炸裂时间
   * @param {number} [count=Math.floor(Math.random() * (400 - 250) + 250)] 炸裂后微粒个数
   * @memberof Firework
   */
  constructor (
    x: number = config.width / 8 + Math.random() * config.width * 3 / 4,
    y: number = config.height,
    xEnd?: number,
    yEnd: number = config.width / 8 + Math.random() * config.width * 3 / 8,
    wait: number = 30 + Math.random() * 30,
    count: number = Math.floor(Math.random() * (400 - 250) + 250),
  ) {
    this.x = x
    this.y = y
    this.xEnd = this.xEnd || x
    this.yEnd = yEnd
    this.wait = wait
    this.count = count

    this.createParticles()
  }

  /**
   * 渲染烟花
   *
   * @param {CanvasRenderingContext2D} ctx canvas
   * @returns {boolean}
   * @memberof Firework
   */
  public render (ctx: CanvasRenderingContext2D): boolean {
    switch (this.status) {
      case 1:
        ctx.save()
        ctx.beginPath()
        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha = this.opacity
        ctx.translate(this.x, this.y)
        ctx.scale(0.8, 2.3)
        ctx.translate(-this.x, -this.y)
        ctx.fillStyle = this.color
        ctx.arc(this.x + Math.sin(Math.PI * 2 * Math.random()) / 1.2, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.restore()

        this.rise()
        return true
      case 2:
        // 等待爆炸
        if (--this.wait <= 0) {
          this.opacity = 1
          this.status = 3
        }
        return true
      case 3:
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        this.particles.forEach((particle) => {
          particle.render(ctx)
        })
        ctx.restore()
        this.opacity -= 0.01
        return this.opacity > 0
      default:
        return false
    }
  }

  /**
   * 创建微粒
   *
   * @private
   * @memberof Firework
   */
  private createParticles (): void {
    for (let i = 0; i < this.count; ++i) {
      this.particles.push(new Particle(this.xEnd, this.yEnd))
    }
  }

  /**
   * 升空
   *
   * @private
   * @memberof Firework
   */
  private rise (): void {
    this.y += this.velocity * 1
    this.velocity += 0.005 // 阻力

    // 烟花升空渐隐
    if (this.y - this.yEnd <= 50) {
      this.opacity = (this.y - this.yEnd) / 50
    }

    if (this.y <= this.yEnd) {
      this.status = 2
    }
  }
}

export default Firework
