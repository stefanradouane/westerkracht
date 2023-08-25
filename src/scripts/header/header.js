// import setUrl from "../setUrl/setUrl";

const header = document.querySelector(".header");
const hero = document.querySelector(".hero");
const coaches = document.querySelector("#coaches");
const info = document.querySelector("#westerkracht");

const navItems = document.querySelectorAll("[data-nav-item]");

let options = {
  rootMargin: "-70px",
};

let currentScroll = 0;

const observerOne = new IntersectionObserver((entries, callback) => {
  entries.forEach((entry) => {
    if (entry.target.classList.contains("hero")) {
      if (!entry.isIntersecting) {
        currentScroll = 1;
      } else {
        currentScroll = 0;
      }
    } else if (currentScroll == 1) {
      if (entry.target.id == "westerkracht") {
        if (entry.isIntersecting) {
          currentScroll = 1;
        } else {
          currentScroll = 2;
        }
      }
    } else if (currentScroll == 2) {
      if (entry.target.id == "westerkracht") {
        if (entry.isIntersecting) {
          currentScroll = 1;
        } else {
          currentScroll = 2;
        }
      }
    }
  });

  navItems.forEach((item, i) => {
    item.classList.remove("nav__list-item--active");

    if (i == currentScroll) {
      // const url = new URL(item.querySelector("a").href);
      // setUrl(url);
      item.classList.add("nav__list-item--active");
    }
  });
}, options);

// start observing
if (hero && info) {
  observerOne.observe(hero);
  observerOne.observe(info);
}

// Add a window scroll event listener
window.addEventListener("scroll", function () {
  colorHeader();
});

window.addEventListener("load", () => {
  colorHeader();
});

function colorHeader() {
  if (window.scrollY <= 10) {
    header.classList.add("header--top");
  } else {
    header.classList.remove("header--top");
  }
}
