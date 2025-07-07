import { leftArrow, rightArrow, actionButton, backButton } from './elements.js';
import { currentVideo, isReversed, isSpecial, currentVideoElement, previousVideoData } from './state.js';
import { loadAndPlayVideo } from './videoLoader.js';

leftArrow.addEventListener('click', () => {
  if (isSpecial) return;
  if (isReversed && currentVideo > 1) {
    loadAndPlayVideo(currentVideo - 1, true);
  } else {
    loadAndPlayVideo(currentVideo, true);
  }
});

rightArrow.addEventListener('click', () => {
  if (isSpecial) return;
  if (isReversed) {
    loadAndPlayVideo(currentVideo, false);
  } else if (currentVideo < 7) {
    loadAndPlayVideo(currentVideo + 1, false);
  }
});

actionButton.addEventListener('click', () => {
  if (!isSpecial) {
    previousVideoData = {
      index: currentVideo,
      reversed: isReversed,
      special: isSpecial,
      time: currentVideoElement.currentTime,
      paused: currentVideoElement.paused
    };
    const specialVideo = currentVideo + 5;
    loadAndPlayVideo(specialVideo, false, true);
  } else {
    const reversedIndex = parseInt(currentVideoElement.src.match(/(\d+)\.mp4$/)?.[1]);
    if (reversedIndex) {
      loadAndPlayVideo(reversedIndex, true, true);
    }
  }
});

backButton.addEventListener('click', () => {
  if (!previousVideoData) return;
  const { index, reversed, special, time, paused } = previousVideoData;
  previousVideoData = null;
  loadAndPlayVideo(index, reversed, special, time, paused);
});
