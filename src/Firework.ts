// 烟花状态：烟花应有三个状态： 升空 等待炸裂 炸裂后
// 烟花：发射点（x, y），爆炸点(xEnd, yEnd)，升空后等待炸裂时间（wait），炸裂后微粒个数（count），烟花半径（radius）
// 烟花炸裂后微粒：自身位置（x, y），自身大小（size），自身速度（rate），最大烟花半径（radius）。

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

  private size: number = 2
  private velocity: number = -3

  private opacity: number = 0.8
  private color: string = `hsla(${Math.floor(360 * Math.random())},80%,60%,1)`

  private particles: Array<any> = []

  private status: number = 1

  /**
   * Creates an instance of Firework.
   * @param {number} [x=config.width / 8 + Math.random() * config.width * 3 / 4] 发射点 x
   * @param {number} [y=config.height] 发射点 y
   * @param {number} [xEnd] 爆炸点 x
   * @param {number} [yEnd=config.width / 8 + Math.random() * config.width * 3 / 8] 爆炸点 y
   * @param {number} [wait=30 + Math.random() * 30] 升空后等待炸裂时间
   * @param {number} [count=300] 炸裂后微粒个数
   * @memberof Firework
   */
  constructor (
    x: number = config.width / 8 + Math.random() * config.width * 3 / 4,
    y: number = config.height,
    xEnd?: number,
    yEnd: number = config.width / 8 + Math.random() * config.width * 3 / 8,
    wait: number = 30 + Math.random() * 30,
    count: number = 300,
  ) {
    this.x = x
    this.y = y
    this.xEnd = this.xEnd || x
    this.yEnd = this.yEnd
    this.wait = wait
    this.count = count

    this.createParticles()
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
}

export default Firework
