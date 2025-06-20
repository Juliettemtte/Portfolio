document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("intro-video");
  const image = document.getElementById("background-image");

  video.addEventListener("ended", () => {
    video.parentElement.style.display = "none";
    image.style.display = "block";
  });
});

