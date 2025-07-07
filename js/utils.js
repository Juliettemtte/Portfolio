export function getVideoSrc(index, reversed, special = false) {
  const baseName = reversed ? `VideoReversed${index}` : `Video${index}`;
  return `Videos/${baseName}.mp4`;
}
