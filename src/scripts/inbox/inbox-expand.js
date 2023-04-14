const expandInboxItem = (e) => {
  const nextElement = e.target.parentElement.nextElementSibling;
  const self = e.target;
  const isOpen = self.classList.contains("inbox__row-control--expanded");

  if (isOpen) {
    self.classList.remove("inbox__row-control--expanded");
    nextElement.ariaExpanded = false;
  } else {
    self.classList.add("inbox__row-control--expanded");
    nextElement.ariaExpanded = true;
  }
};

export default expandInboxItem;
