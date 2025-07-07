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
  if (state.isSpecial) {
    actionButton.hidden = true;
    return;
  }

  const minVideo = state.lastDirection === 'left' ? 4 : 3;
  const maxVideo = state.lastDirection === 'left' ? 7 : 6;

  const shouldShow =
    state.currentVideo >= minVideo &&
    state.currentVideo <= maxVideo &&
    state.currentVideoElement.paused;

  actionButton.hidden = !shouldShow;
}


export function updateBackButton() {
  backButton.hidden = !state.previousVideoData;
}
