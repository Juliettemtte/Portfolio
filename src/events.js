import { state } from './state.js';
import { leftArrow, rightArrow, actionButton, backButton } from './elements.js';
import { loadAndPlayVideo } from './navigation.js';

leftArrow.addEventListener('click', () => {
  if (state.isSpecial) return;
  state.lastDirection = 'left';
  if (state.isReversed) {
    if (state.currentVideo > 1) {
      loadAndPlayVideo(state.currentVideo - 1, true);
    }
  } else {
    loadAndPlayVideo(state.currentVideo, true);
  }
});

rightArrow.addEventListener('click', () => {
  if (state.isSpecial) return;
  state.lastDirection = 'right';
  if (state.isReversed) {
    loadAndPlayVideo(state.currentVideo, false);
  } else if (state.currentVideo < state.totalVideos) {
    loadAndPlayVideo(state.currentVideo + 1, false);
  }
});

actionButton.addEventListener('click', () => {
  if (!state.isSpecial) {
    state.previousVideoData = {
      index: state.currentVideo,
      reversed: state.isReversed,
      special: state.isSpecial,
      time: state.currentVideoElement.currentTime,
      paused: state.currentVideoElement.paused
    };

    const offset = state.lastDirection === 'left' ? 4 : 5;
    const specialVideo = state.currentVideo + offset;
    loadAndPlayVideo(specialVideo, false, true);
  } else {
    const match = state.currentVideoElement.src.match(/(\d+)\.mp4$/);
    if (match) {
      const reversedIndex = parseInt(match[1]);
      loadAndPlayVideo(reversedIndex, true, true);
    }
  }
});

backButton.addEventListener('click', () => {
  if (!state.previousVideoData) return;

  const { index, reversed, special, time, paused } = state.previousVideoData;
  state.previousVideoData = null;
  loadAndPlayVideo(index, reversed, special, time, paused);
});
