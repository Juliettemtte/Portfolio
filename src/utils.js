export function getVideoSrc(index, reversed, special = false) {
  const baseName = reversed ? `VideoReversed${index}` : `Video${index}`;
  return `Videos/${baseName}.mp4`;
}

export function getOverlayVideoSrc(index) {
  return `OverlayVideos/Overlay${index}.mp4`;
}
