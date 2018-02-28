/**
 * 创建 canvas
 *
 * @param {number} width canvas 的宽度
 * @param {number} height canvas 的高度
 * @param {string} [bgColor='#fff'] canvas 的背景色
 * @returns {HTMLCanvasElement}
 */
function createCanvas (width: number, height: number, bgColor: string = '#fff'): HTMLCanvasElement {
  if (!document && !document.body) {
    console.error('document or body not find')
    return
  }
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.style.backgroundColor = bgColor
  document.body.appendChild(canvas)

  return canvas
}

export default createCanvas
