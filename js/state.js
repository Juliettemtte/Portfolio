export const state = {
  currentVideoElement: null,
  nextVideoElement: null,
  currentVideo: 1,
  totalVideos: 7,
  isReversed: false,
  isSpecial: false,
  previousVideoData: null,
  overlayVideos: {
    3: 'OverlayA.mp4',
    4: 'Cub3D.mp4',
    5: 'ft_IRC.mp4',
    6: 'OverlayD.mp4'
  }
};

export function swapVideoElements() {
  [state.currentVideoElement, state.nextVideoElement] = [state.nextVideoElement, state.currentVideoElement];
}
