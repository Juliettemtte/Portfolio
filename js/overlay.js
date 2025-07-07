import { state } from './state.js';
import { overlayVideo, overlayContainer } from './elements.js';

export function updateOverlayVideo() {
  if (
    state.isSpecial &&
    state.isReversed &&
    state.currentVideo >= 8 &&
    state.currentVideo <= 11 &&
    state.currentVideoElement.paused
  ) {
    const overlaySrc = `Videos/${state.overlayVideos[state.currentVideo]}`;
    if (overlayVideo.src !== overlaySrc) {
      overlayVideo.src = overlaySrc;
      overlayVideo.load();
    }

    overlayVideo.playbackRate = 0.7;
    overlayContainer.hidden = false;

    overlayVideo.oncanplay = () => {
      overlayVideo.play().catch(err => console.warn('Overlay play error:', err));
    };
  } else {
    overlayVideo.pause();
    overlayVideo.src = '';
    overlayContainer.hidden = true;
  }
}
