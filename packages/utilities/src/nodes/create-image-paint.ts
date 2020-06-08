export function createImagePaint(bytes: Uint8Array): ImagePaint {
  const image = figma.createImage(bytes)
  return {
    imageHash: image.hash,
    scaleMode: 'FILL',
    scalingFactor: 0.5,
    type: 'IMAGE'
  }
}
