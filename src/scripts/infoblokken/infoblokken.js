import React from "react";
import { createRoot } from "react-dom/client";
import CM_Component from "../cm-component/cm-component";

const container = document.querySelector(".infoblokken-container");

if (container) {
  const root = createRoot(container);
  root.render(<CM_Component type={"info"} />);
}
