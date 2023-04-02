const details = document.querySelectorAll("[data-details]");
const summary = document.querySelectorAll("[data-summary]");

if(details && summary){
    setHeightOnDetails()
    window.addEventListener("resize", setHeightOnDetails)
    
    function setHeightOnDetails () {
        details.forEach((element, i) => {
            element.style.height = element.querySelector("summary").clientHeight + summary[i].clientHeight + 'px'
        })
    }
}