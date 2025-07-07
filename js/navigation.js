import { state, swapVideoElements } from './state.js';
import { getVideoSrc } from './utils.js';
import { updateActionButton, updateArrows, updateBackButton } from './ui.js';
import { updateOverlayVideo } from './overlay.js';
import { actionButton, backButton, overlayVideo, overlayContainer } from './elements.js';

export function loadAndPlayVideo(index, reversed = false, special = false, resumeTime = null, resumePaused = false) {
  const newSrc = getVideoSrc(index, reversed, special);
  state.nextVideoElement.src = newSrc;
  state.nextVideoElement.load();

  state.nextVideoElement.onloadeddata = () => {
    if (resumeTime !== null) state.nextVideoElement.currentTime = resumeTime;
    resumePaused ? state.nextVideoElement.pause() : state.nextVideoElement.play();

    state.currentVideoElement.classList.remove('active');
    state.nextVideoElement.classList.add('active');

    state.currentVideoElement.pause();

    swapVideoElements();

    state.isReversed = reversed;
    state.isSpecial = special;
    state.currentVideo = index;

    if (state.currentVideo === 1 && !state.isReversed && !state.isSpecial) {
      setTimeout(() => {
        updateArrows();
        updateActionButton();
        updateBackButton();
        updateOverlayVideo();
      }, 5800);
    } else {
      updateArrows();
      updateActionButton();
      updateBackButton();
      updateOverlayVideo();
    }

    state.currentVideoElement.onpause = () => {
      updateActionButton();
      updateBackButton();
      updateOverlayVideo();
    };

    state.currentVideoElement.onplay = () => {
      actionButton.hidden = true;
      backButton.hidden = true;
      overlayVideo.pause();
      overlayVideo.src = '';
      overlayContainer.hidden = true;
    };
  };
}
