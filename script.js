const video1 = document.getElementById('video1');
const video2 = document.getElementById('video2');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const actionButton = document.getElementById('action-button');
const backButton = document.getElementById('back-button');
const overlayContainer = document.getElementById('overlay-video-container');
const overlayVideo = document.getElementById('overlay-video');

let currentVideoElement = video1;
let nextVideoElement = video2;

let currentVideo = 1;
let totalVideos = 7;
let isReversed = false;
let isSpecial = false;

let previousVideoData = null;

const overlayVideos = {
  3: 'OverlayA.mp4',
  4: 'Cub3D.mp4',
  5: 'ft_IRC.mp4',
  6: 'OverlayD.mp4'
};

function updateArrows() {
  if (isSpecial) {
    leftArrow.hidden = true;
    rightArrow.hidden = true;
    return;
  }

  if ((currentVideo === 1 && !isReversed) || (currentVideo === 2 && isReversed)) {
    leftArrow.hidden = true;
  } else {
    leftArrow.hidden = false;
  }

  rightArrow.hidden = (currentVideo >= totalVideos && !isReversed);
}

function updateActionButton() {
  const shouldShow =
    !isReversed &&
    !isSpecial &&
    currentVideo >= 3 &&
    currentVideo <= 7 &&
    currentVideoElement.paused;

  actionButton.hidden = !shouldShow;
}

function updateBackButton() {
  backButton.hidden = !previousVideoData;
}

function updateOverlayVideo() {
  console.log('updateOverlayVideo called', {
    isSpecial,
    isReversed,
    currentVideo,
    paused: currentVideoElement.paused
  });

  if (
    isSpecial &&
    isReversed &&
    currentVideo >= 8 &&
    currentVideo <= 11 &&
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
      console.log('Overlay video can play, playing');
      overlayVideo.play().catch(err => console.warn('Overlay play error:', err));
    };
  } else {
    if (!overlayContainer.hidden) {
      console.log('Hiding overlay video');
    }
    overlayVideo.pause();
    overlayVideo.src = '';
    overlayContainer.hidden = true;
  }
}

function loadAndPlayVideo(index, reversed = false, special = false, resumeTime = null, resumePaused = false) {
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

      [currentVideoElement, nextVideoElement] = [nextVideoElement, currentVideoElement];

      isReversed = reversed;
      isSpecial = special;
      currentVideo = index;

      if (currentVideo === 1 && !isReversed && !isSpecial) {
        leftArrow.hidden = true;
        rightArrow.hidden = true;
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

// Flèches
leftArrow.addEventListener('click', () => {
  if (isSpecial) return;

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
  if (isSpecial) return;

  if (isReversed) {
    loadAndPlayVideo(currentVideo, false);
  } else if (currentVideo < totalVideos) {
    currentVideo++;
    loadAndPlayVideo(currentVideo, false);
  }
});

// Bouton "Nouvelle Vidéo"
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

// Bouton "Retour"
backButton.addEventListener('click', () => {
  if (!previousVideoData) return;

  const { index, reversed, special, time, paused } = previousVideoData;
  previousVideoData = null;
  loadAndPlayVideo(index, reversed, special, time, paused);
});

// Fin de vidéo
currentVideoElement.addEventListener('ended', () => {
  updateArrows();
  updateActionButton();
  updateBackButton();
  updateOverlayVideo();
});

// Démarrage
loadAndPlayVideo(currentVideo);
