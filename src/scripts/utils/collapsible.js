const collapsible = (controller, aria, className) => {
  console.log(aria);
  const isOpen = controller.classList.contains(className);
  if (isOpen) {
    aria.setAttribute("aria-expanded", "false");
    controller.classList.remove(className);
  } else {
    aria.setAttribute("aria-expanded", "true");
    controller.classList.add(className);
  }
};

export default collapsible;
