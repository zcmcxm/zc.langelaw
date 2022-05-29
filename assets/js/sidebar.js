function openNav() {
  let content = document.querySelector(".sidebar-content");
  content.classList.add("sidebar-active");
}

function closeNav() {
  let content = document.querySelector(".sidebar-content");
  content.classList.remove("sidebar-active");
}
