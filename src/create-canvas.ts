function createCanvas (width: number, height: number): CanvasRenderingContext2D {
  if (!document && !document.body) {
    console.error('document or body not find')
    return
  }
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  document.body.appendChild(canvas)

  return canvas.getContext('2d')
}

export default createCanvas
