const header = document.querySelector(".header");
const hero = document.querySelector(".hero");

let options = {
    rootMargin: "-70px",
}

const intersectionObserver = new IntersectionObserver((entries, callback) => {
    header.classList.add("header--scrolled")
    if (entries[0].isIntersecting == false) return;
    header.classList.remove("header--scrolled")
}, options);

// start observing
if(hero){
    intersectionObserver.observe(hero);
}