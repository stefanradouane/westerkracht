// To do in the future...

import React from "react";
import { createRoot } from "react-dom/client";
import CmsRow from "./cms-row";
// import Sortable from "@shopify/draggable/lib/sortable";
// import SwapAnimation from "@shopify/draggable/lib/plugins/swap-animation";

const container = document.querySelector("[data-cms]");

const dataTypes = [
  "info",
  "files",
  "hero",
  "coaches",
  "details",
  "inschrijven",
];

const Cms = () => {
  return (
    <section className="cms">
      <h1 className="title title--h1">Cms</h1>
      <section className="cms__drag-aria" data-cms-drag>
        {dataTypes.map((type, i) => {
          return <CmsRow type={type} key={i}></CmsRow>;
        })}
      </section>
    </section>
  );
};

if (container) {
  const root = createRoot(container);
  root.render(<Cms />);

  const sortable = new Sortable(
    document.querySelectorAll(".kanban-col .card-list-body"),
    {
      plugins: [SwapAnimation],
      draggable: ".card-list-item",
      handle: ".card-list-item",
      appendTo: "body",
      cursor: "grabbing",
    }
  );
}
