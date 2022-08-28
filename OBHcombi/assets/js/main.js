document.addEventListener('DOMContentLoaded', function () {
  AOS.init();
});

function animatedShow() {
    const animatedShows = document.querySelectorAll(".animated-show");
    for (let i = 0; i < animatedShows.length; i++) {
      const windowHeight = window.innerHeight;
      const top = animatedShows[i].getBoundingClientRect().top;
      const visible = 150;
  
      if (top < windowHeight - visible) {
        animatedShows[i].classList.add("active");
      } else {
        animatedShows[i].classList.remove("active");
      }
    }
}
  
window.addEventListener("scroll", animatedShow);