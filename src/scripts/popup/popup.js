export function popUp (e) {
    e.preventDefault()
    const btnValue = e.target.value;
    const coachValue = e.target.dataset.name
    const form = e.target.form
    // const item = e.target.form.dataset.value

    const currentPopup = document.querySelector(`.cm-block__grid-popup[data-name=${coachValue}]`)

    switch (btnValue) {
        // Open popup
        case "open":
            console.log("open")
            currentPopup.style.display = "flex"
            break;
        // Close popup
        case "close":
            currentPopup.style.display = "none"
            console.log("close")
            break;
        // Remove coach
        case "remove":
            console.log("test")
            break;
    }
}