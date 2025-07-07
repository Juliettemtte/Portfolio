import { state } from './state.js';
import { leftArrow, rightArrow, actionButton, backButton } from './elements.js';

export function updateArrows() {
  if (state.isSpecial) {
    leftArrow.hidden = true;
    rightArrow.hidden = true;
    return;
  }
  leftArrow.hidden = (state.currentVideo === 1 && !state.isReversed) || (state.currentVideo === 2 && state.isReversed);
  rightArrow.hidden = (state.currentVideo >= state.totalVideos && !state.isReversed);
}

export function updateActionButton() {
  const shouldShow =
    !state.isReversed &&
    !state.isSpecial &&
    state.currentVideo >= 3 &&
    state.currentVideo <= 7 &&
    state.currentVideoElement.paused;

  actionButton.hidden = !shouldShow;
}

export function updateBackButton() {
  backButton.hidden = !state.previousVideoData;
}
