import React, { useState } from "react";
import { useAsync } from "react-use";
import { createRoot } from "react-dom/client";
import { api } from "../api/api";
import { endpoint } from "../api/endpoints";
import Messages from "./messages/messages";

const container = document.querySelector(".inschrijfing-container");

// Start!
if (container) {
  const root = createRoot(container);
  root.render(<Messages type="inschrijving" />);
}
