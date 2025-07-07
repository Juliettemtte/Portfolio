// App state
export let currentVideoElement = video1;
export let nextVideoElement = video2;

export let currentVideo = 1;
export const totalVideos = 7;

export let isReversed = false;
export let isSpecial = false;

export let previousVideoData = null;

export const overlayVideos = {
  3: 'OverlayA.mp4',
  4: 'Cub3D.mp4',
  5: 'ft_IRC.mp4',
  6: 'OverlayD.mp4'
};

// Utility to switch active video elements
export function swapVideos() {
  [currentVideoElement, nextVideoElement] = [nextVideoElement, currentVideoElement];
}
