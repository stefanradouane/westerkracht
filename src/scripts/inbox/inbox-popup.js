const inboxPopup = () => {
  const inboxPopup = document.querySelector(".inbox__popup");
  const isOpen = inboxPopup.open;

  if (isOpen) {
    inboxPopup.close();
  } else {
    inboxPopup.showModal();
  }
};

export default inboxPopup;
