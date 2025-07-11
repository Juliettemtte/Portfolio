export async function preloadMedia(videoSrc, imageSrc) {
  const videoPromise = new Promise((resolve) => {
    const tempVideo = document.createElement('video');
    tempVideo.src = videoSrc;
    tempVideo.preload = 'auto';
    tempVideo.onloadeddata = () => resolve();
    tempVideo.onerror = () => resolve(); // fail silently
  });

  const imagePromise = new Promise((resolve) => {
    const tempImage = new Image();
    tempImage.src = imageSrc;
    tempImage.onload = () => resolve();
    tempImage.onerror = () => resolve(); // fail silently
  });

  await Promise.all([videoPromise, imagePromise]);
}
