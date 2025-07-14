import { getVideoSrc } from './utils.js';
import { state } from './state.js';

export function preloadAllAssets() {
  const total = state.totalVideos;

  for (let i = 1; i <= total; i++) {
    // Vidéos
    preloadVideo(getVideoSrc(i, false));                // normal
    preloadVideo(getVideoSrc(i, true));                 // reversed
    preloadVideo(getVideoSrc(i + 4, false, true));      // special left
    preloadVideo(getVideoSrc(i + 5, false, true));      // special right

    // Images
    preloadImage(`Images/Video${i}.png`);
    preloadImage(`Images/VideoReversed${i}.png`);
    preloadImage(`Images/Video${i}-Special.png`);
  }
}

function preloadVideo(src) {
  const video = document.createElement('video');
  video.src = src;
  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;
  video.style.display = 'none';
  document.body.appendChild(video);

  video.onloadeddata = () => {
    document.body.removeChild(video);
  };
}

function preloadImage(src) {
  const img = new Image();
  img.src = src;
}
