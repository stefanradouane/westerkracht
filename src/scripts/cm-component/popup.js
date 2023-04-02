export function popUp(e) {
  e.preventDefault();
  const btnValue = e.target.value;
  const coachValue = e.target.dataset.name;

  const currentPopup = document.querySelector(
    `.cm-block__grid-popup[data-name=${coachValue}]`
  );

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
