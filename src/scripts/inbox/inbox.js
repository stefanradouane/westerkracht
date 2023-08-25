import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { api } from "../api/api";
import InboxTable from "./inbox-table";
import { endpoint } from "../api/endpoints";

const container = document.querySelector("[data-inbox]");

const Inbox = (props) => {
  const { rows, type } = props;
  const [contact, setContact] = useState(null);
  const [inschrijving, setInschrijving] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(endpoint.api.contact)
      .then((data) => {
        setContact(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
    api
      .get(endpoint.api.inschrijving)
      .then((data) => {
        console.log(data);
        setInschrijving(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  useEffect(() => {
    if (contact && inschrijving) {
      if (contact.length >= 0 && inschrijving.length >= 0) {
        setLoading(false);
      }
    }
  }, [contact, inschrijving]);

  if (loading) {
    return <div className="icon icon--loading"></div>;
  }

  return (
    <InboxTable
      useContact={{ contact, setContact }}
      useInschrijving={{ inschrijving, setInschrijving }}
      useMessage={{
        useContact: { contact, setContact },
        useInschrijving: { inschrijving, setInschrijving },
      }}
      rows={rows}
      type={type}
    />
  );
};

if (container) {
  const root = createRoot(container);
  root.render(<Inbox type={"compressed"} rows={5} />);
}

export default Inbox;
