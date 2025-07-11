// navigation.js
import { state, swapVideoElements } from './state.js';
import { getVideoSrc } from './utils.js';
import { updateActionButton, updateArrows, updateBackButton } from './ui.js';
import { updateOverlayVideo } from './overlay.js';
import { actionButton, backButton, overlayVideo, overlayContainer, endingImage } from './elements.js';
import { endingTexts } from './text-content.js';

const PRELOAD_IMAGE_SECONDS = 0.5;
let endingContentVisible = false;

function setupEndingImageOverlay() {
  state.currentVideoElement.ontimeupdate = (e) => {
    const video = e.target;
    if (!video.duration) return;
    const timeLeft = video.duration - video.currentTime;

    if (timeLeft <= PRELOAD_IMAGE_SECONDS && !endingContentVisible) {
      showEndingContent();
      endingContentVisible = true;
    }
  };
}

function showEndingContent() {
  const videoPath = state.currentVideoElement.src;
  const videoKey = videoPath.split('/').pop().replace('.mp4', '').replace(/-/g, '').toLowerCase();

  endingImage.src = `Images/${getImageName(videoKey)}.png?t=${Date.now()}`;
  endingImage.onload = () => {
    endingImage.style.opacity = '1';
    state.currentVideoElement.style.opacity = '0.3';
    showEndingText(videoKey);
  };
}

function showEndingText(videoKey) {
  const textContainer = document.getElementById('ending-text-container');
  const titleElement = document.getElementById('ending-title');
  const paragraphsContainer = document.getElementById('ending-paragraphs');

  const textContent = endingTexts[getTextKey(videoKey)];

  if (textContent) {
    titleElement.textContent = textContent.title || '';
    paragraphsContainer.innerHTML = '';

    if (textContent.paragraphs) {
      textContent.paragraphs.forEach(text => {
        const p = document.createElement('p');
        p.className = 'ending-paragraph';
        p.innerHTML = text.replace(/^ {4}/, '&emsp;');
        paragraphsContainer.appendChild(p);
      });
    }

    textContainer.style.display = 'block';
    textContainer.style.opacity = '1';
  } else {
    textContainer.style.display = 'none';
  }
}

function hideEndingContent() {
  endingImage.style.opacity = '0';
  document.getElementById('ending-text-container').style.opacity = '0';
  endingContentVisible = false;
}

function getImageName(videoKey) {
  if (state.isReversed) return `VideoReversed${state.currentVideo}`;
  if (state.isSpecial) return `Video${state.currentVideo}-Special`;
  return `Video${state.currentVideo}`;
}

function getTextKey(videoKey) {
  if (state.isReversed) return `videoreversed${state.currentVideo}`;
  if (state.isSpecial) return `videospecial${state.currentVideo}`;
  return `video${state.currentVideo}`;
}

export function loadAndPlayVideo(index, reversed = false, special = false, resumeTime = null, resumePaused = false) {
  const newSrc = getVideoSrc(index, reversed, special);
  state.nextVideoElement.src = newSrc;
  state.lastVideoSrc = newSrc;

  if (!resumePaused || (!state.isReversed && !state.isSpecial)) {
    hideEndingContent();
    endingImage.src = '';
  }

  state.nextVideoElement.style.opacity = '1';
  state.nextVideoElement.load();

  state.nextVideoElement.onloadeddata = () => {
    if (resumeTime !== null) state.nextVideoElement.currentTime = resumeTime;

    state.nextVideoElement.onplay = () => {
      setupEndingImageOverlay();
    };

    state.nextVideoElement.onpause = () => {
      if (resumePaused && resumeTime !== null) {
        const nearEnd = state.nextVideoElement.duration &&
                        resumeTime >= state.nextVideoElement.duration - PRELOAD_IMAGE_SECONDS;
        if (nearEnd) {
          showEndingContent();
        }
      }
    };

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

    updateUIElements();

    state.currentVideoElement.onended = () => {
      showEndingContent();
      updateUIElements();
    };
  };
}


function updateUIElements() {
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
}
