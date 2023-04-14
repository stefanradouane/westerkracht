import React, { useState } from "react";
import InboxIcon from "./inbox-icon";
import InboxHandled from "./inbox-handled";
import expandInboxItem from "./inbox-expand";
import InboxContent from "./inbox-content";

const InboxRow = (props) => {
  const { message, type } = props;
  const [handled, setHandled] = useState(message.handled);
  return (
    <section className={"inbox__row inbox__row--" + message.type}>
      <section className="inbox__row-item">
        <InboxIcon type={message.type} />
      </section>

      <InboxHandled handled={handled} />

      <section className="inbox__row-item inbox__row-item--name">
        {message.name}
      </section>

      <section className="inbox__row-item inbox__row-item--email">
        {message.email}
      </section>

      <section className="inbox__row-item">
        {message.created.slice(0, 10)}
      </section>

      {type !== "expanded" && (
        <section className="inbox__row-item">
          <a href="/admin/inschrijvingen">
            <svg className="icon icon--link" viewBox="0 0 24 24">
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
            </svg>
          </a>
        </section>
      )}
      {type === "expanded" && (
        <>
          <section className="inbox__row-item inbox__row-item--control">
            <button onClick={expandInboxItem}>
              <svg className="icon icon--expand" viewBox="0 0 24 24">
                <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
              </svg>
            </button>
          </section>
          <InboxContent message={message} setHandled={setHandled} />
        </>
      )}
    </section>
  );
};

export default InboxRow;

{
  /* // An svg facing right */
}
