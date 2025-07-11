import { state, swapVideoElements } from './state.js';
import { getVideoSrc } from './utils.js';
import { updateActionButton, updateArrows, updateBackButton } from './ui.js';
import { updateOverlayVideo } from './overlay.js';
import { actionButton, backButton, overlayVideo, overlayContainer, endingImage } from './elements.js';

const PRELOAD_IMAGE_SECONDS = 0.1;

function setupEndingImageOverlay() {
  state.currentVideoElement.ontimeupdate = (e) => {
    const video = e.target;
    if (!video.duration) return;
    const timeLeft = video.duration - video.currentTime;

    if (timeLeft <= PRELOAD_IMAGE_SECONDS) {
      showEndingImage();
      video.style.opacity = '0.3';
    } else {
      endingImage.style.opacity = '0';
      video.style.opacity = '1';
    }
  };
}

export function loadAndPlayVideo(index, reversed = false, special = false, resumeTime = null, resumePaused = false) {
  const newSrc = getVideoSrc(index, reversed, special);
  state.nextVideoElement.src = newSrc;
  state.lastVideoSrc = newSrc;

  endingImage.style.opacity = '0';
  endingImage.src = '';
  state.nextVideoElement.style.opacity = '1';
  state.nextVideoElement.load();

  state.nextVideoElement.onloadeddata = () => {
    if (resumeTime !== null) {
      state.nextVideoElement.currentTime = resumeTime;
    }
    if (resumePaused) {
      state.nextVideoElement.pause();
    } else {
      state.nextVideoElement.play();
    }

    state.currentVideoElement.classList.remove('active');
    state.nextVideoElement.classList.add('active');
    state.currentVideoElement.pause();

    swapVideoElements();

    state.isReversed = reversed;
    state.isSpecial = special;
    state.currentVideo = index;

    setupEndingImageOverlay();

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

      state.currentVideoElement.style.opacity = '1';
      endingImage.style.opacity = '0';
    };

    state.currentVideoElement.onended = () => {
      updateArrows();
      updateActionButton();
      updateBackButton();
      updateOverlayVideo();

      state.currentVideoElement.style.opacity = '0';
    };
  };
}

function showEndingImage() {
  const videoNumber = state.isSpecial ? 
    (state.lastDirection === 'left' ? state.currentVideo - 4 : state.currentVideo - 5) 
    : state.currentVideo;
  
  endingImage.src = `Images/video${videoNumber}.png`;
  endingImage.style.opacity = '1';
  state.currentVideoElement.style.opacity = '0.3';
}