export function popUp(e) {
  e.preventDefault();
  const btnValue = e.target.value;
  const value = e.target.dataset.name;

  const currentPopup = Array.from(
    document.querySelectorAll(`.cm-block__grid-popup`)
  ).find((item) => item.dataset.name == value);

  switch (btnValue) {
    // Open popup
    case "open":
      currentPopup.style.display = "flex";
      break;
    // Close popup
    case "close":
      currentPopup.style.display = "none";
      break;
  }
}
