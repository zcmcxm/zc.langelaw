let header = document.querySelector("header");
let preYpos = window.pageYOffset;

window.onscroll = function () {
  let curYops = window.pageYOffset;

  // change opacity of the nav bar when it is not at the top of the page
  if (curYops == 0) {
    header.classList.remove("opacified");
  } else {
    header.classList.add("opacified");
  }

  //hide nav bar when scroll down and show it when scroll up
  if (preYpos > curYops) {
    header.style.top = "0";
  } else {
    header.style.top = "-5rem";
  }
  preYpos = curYops;
};
