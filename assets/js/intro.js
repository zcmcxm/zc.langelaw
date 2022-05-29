let logo = document.querySelector(".site-logo");
let desc = document.querySelector(".description");
let homenav = document.querySelectorAll(".home-nav li");

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    logo.classList.add("active");
    desc.classList.add("active");
    homenav.forEach((nav, idx) => {
      setTimeout(() => {
        nav.classList.add("active");
      }, (idx + 1) * 400);
    });
  });
});
