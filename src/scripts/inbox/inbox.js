import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import InboxRow from "./inbox-row";
import { api } from "../api/api";
import { useAsync } from "react-use";
import InboxTable from "./inbox-table";

const container = document.querySelector("[data-inbox]");

const Inbox = (props) => {
  const { rows, type } = props;
  const state = useAsync(async () => {
    // Fetch contact messages
    const contact = await api.get("/api/contact");
    // Fetch inschrijving messages
    const inschrijving = await api.get("/api/inschrijving");

    return {
      contact,
      inschrijving,
    };
  }, []);

  if (state.loading) {
    return <div className="icon icon--loading"></div>;
  }
  return <InboxTable state={state} rows={rows} type={type} />;
};

if (container) {
  const root = createRoot(container);
  root.render(<Inbox type={"compressed"} rows={5} />);
}

export default Inbox;
