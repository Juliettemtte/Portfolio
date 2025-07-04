const video1 = document.getElementById('video1');
const video2 = document.getElementById('video2');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

let currentVideoElement = video1;
let nextVideoElement = video2;

let currentVideo = 1;
let totalVideos = 7;
let isReversed = false;

function updateArrows() {
  if ((currentVideo === 1 && !isReversed) || (currentVideo === 2 && isReversed)) {
    leftArrow.hidden = true;
  } else {
    leftArrow.hidden = false;
  }

  rightArrow.hidden = (currentVideo >= totalVideos && !isReversed);
}


function loadAndPlayVideo(index, reversed = false) {
  const baseName = reversed ? `VideoReversed${index}` : `Video${index}`;
  const newSrc = `Videos/${baseName}.mp4`;

  nextVideoElement.src = newSrc;
  nextVideoElement.load();

  nextVideoElement.onloadeddata = () => {
    if (nextVideoElement.readyState >= 4) {
      currentVideoElement.classList.remove('active');
      nextVideoElement.classList.add('active');

      nextVideoElement.play();
      currentVideoElement.pause();
      currentVideoElement.currentTime = 0;

      [currentVideoElement, nextVideoElement] = [nextVideoElement, currentVideoElement];

      isReversed = reversed;

      if (currentVideo === 1 && !isReversed) {
        leftArrow.hidden = true;
        rightArrow.hidden = true;
        setTimeout(() => {
          updateArrows();
        }, 5800);
      } else {
        updateArrows();
      }
    }
  };

  nextVideoElement.oncanplaythrough = () => {
    if (nextVideoElement.classList.contains('active')) {
      nextVideoElement.play();
    }
  };
}


leftArrow.addEventListener('click', () => {
  if (isReversed) {
    if (currentVideo > 1) {
      currentVideo--;
      loadAndPlayVideo(currentVideo, true);
    }
  } else {
    loadAndPlayVideo(currentVideo, true);
  }
});

rightArrow.addEventListener('click', () => {
  if (isReversed) {
    loadAndPlayVideo(currentVideo, false);
  } else if (currentVideo < totalVideos) {
    currentVideo++;
    loadAndPlayVideo(currentVideo, false);
  }
});

currentVideoElement.addEventListener('ended', updateArrows);

loadAndPlayVideo(currentVideo);
