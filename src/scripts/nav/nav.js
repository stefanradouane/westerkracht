const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const navController = document.querySelector("[data-nav-controller]");

if (nav && navController) {
  navController.addEventListener("click", (e) => {
    e.preventDefault();
    const isOpen = nav.classList.contains("nav--open");
    let action = isOpen ? "remove" : "add";
    nav.classList[action]("nav--open");
    header.classList[action]("header--open");

    if (!isOpen) {
      // document.body.style.overflow = "hidden";
    } else {
      // document.body.removeAttribute("style");
    }
  });
}

// ADMIN NAV
const sidebar = document.querySelector("[data-admin-sidebar]");
const content = document.querySelector(".admin__content");

if (sidebar && navController) {
  navController.addEventListener("click", (e) => {
    e.preventDefault();
    const isOpen = sidebar.classList.contains("admin__sidebar--open");
    let action = isOpen ? "remove" : "add";
    sidebar.classList[action]("admin__sidebar--open");
    header.classList[action]("header--open");

    if (!isOpen) {
      content.style.transform = `translateX(min(100%, 300px))`;
      // document.body.style.overflow = "hidden";
    } else {
      // document.body.removeAttribute("style");
      content.removeAttribute("style");
    }
  });
}
