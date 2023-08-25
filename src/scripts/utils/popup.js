import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

/**
 * Create a popup dialog based on the parameters
 * @param {String} body Description of the popup
 * @param {Boolean} options Define if the popup is a confirmation popup
 */
const createPopup = (body, options) => {
  console.log(body, options);
  const popup = document.querySelector(".inbox__popup");
  popup.innerHTML = body;
};
export default createPopup;
