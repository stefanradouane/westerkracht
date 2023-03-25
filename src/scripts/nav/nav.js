const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const navController = document.querySelector("[data-nav-controller]");

if(nav && navController){
    navController.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = nav.classList.contains("nav--open");
        let action = isOpen ? "remove" : "add"
        nav.classList[action]("nav--open")
        header.classList[action]("header--open")

        if(!isOpen){
            document.body.style.overflow = "hidden" 
        } else {
            document.body.removeAttribute("style")
        }
    })
}