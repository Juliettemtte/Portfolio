import { leftArrow, rightArrow, actionButton, backButton, overlayContainer, overlayVideo } from './elements.js';
import { isReversed, isSpecial, currentVideo, totalVideos, previousVideoData, overlayVideos, currentVideoElement } from './state.js';

export function updateArrows() {
  if (isSpecial) {
    leftArrow.hidden = true;
    rightArrow.hidden = true;
    return;
  }
  leftArrow.hidden = (currentVideo === 1 && !isReversed) || (currentVideo === 2 && isReversed);
  rightArrow.hidden = (currentVideo >= totalVideos && !isReversed);
}

export function updateActionButton() {
  const shouldShow =
    !isReversed && !isSpecial &&
    currentVideo >= 3 && currentVideo <= 7 &&
    currentVideoElement.paused;

  actionButton.hidden = !shouldShow;
}

export function updateBackButton() {
  backButton.hidden = !previousVideoData;
}

export function updateOverlayVideo() {
  if (
    isSpecial && isReversed &&
    currentVideo >= 8 && currentVideo <= 11 &&
    currentVideoElement.paused
  ) {
    const overlaySrc = `Videos/${overlayVideos[currentVideo]}`;
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
