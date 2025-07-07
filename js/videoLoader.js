import { swapVideos, overlayVideos, totalVideos, currentVideoElement, nextVideoElement, currentVideo, isReversed, isSpecial, previousVideoData } from './state.js';
import { updateArrows, updateActionButton, updateBackButton, updateOverlayVideo } from './uiUpdater.js';

export function loadAndPlayVideo(index, reversed = false, special = false, resumeTime = null, resumePaused = false) {
  const baseName = reversed ? `VideoReversed${index}` : `Video${index}`;
  const newSrc = `Videos/${baseName}.mp4`;

  nextVideoElement.src = newSrc;
  nextVideoElement.load();

  nextVideoElement.onloadeddata = () => {
    if (nextVideoElement.readyState >= 2) {
      if (resumeTime !== null) {
        nextVideoElement.currentTime = resumeTime;
      }

      if (resumePaused) {
        nextVideoElement.pause();
      } else {
        nextVideoElement.play();
      }

      currentVideoElement.classList.remove('active');
      nextVideoElement.classList.add('active');
      currentVideoElement.pause();

      swapVideos();

      Object.assign(globalThis, {
        isReversed: reversed,
        isSpecial: special,
        currentVideo: index
      });

      if (currentVideo === 1 && !reversed && !special) {
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

      currentVideoElement.onpause = () => {
        updateActionButton();
        updateBackButton();
        updateOverlayVideo();
      };

      currentVideoElement.onplay = () => {
        actionButton.hidden = true;
        backButton.hidden = true;
        overlayVideo.pause();
        overlayVideo.src = '';
        overlayContainer.hidden = true;
      };
    }
  };
}
