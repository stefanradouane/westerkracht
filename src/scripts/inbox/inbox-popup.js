import createPopup from "../utils/popup";

const inboxPopup = (e, body, options) => {
  const inboxPopup = document.querySelector(".inbox__popup");
  const isOpen = inboxPopup.open;

  if (isOpen) {
    inboxPopup.close();
  } else {
    createPopup(body, options);
    inboxPopup.showModal();
  }
};

export default inboxPopup;
