import React from "react";
import inboxPopup from "./inbox-popup";
import handleMessage from "../admin/messages/handle-message";

const InboxContent = (props) => {
  const { message, setHandled } = props;
  return (
    <section
      className="inbox__row-item inbox__row-item--expand"
      aria-expanded="false">
      <section>
        {message.coach && (
          <section>
            <h2>Coach:</h2>
            <p>{message.coach}</p>
          </section>
        )}
        <section>
          <h2>Bericht:</h2>
          <p>{message.content}</p>
        </section>
      </section>
      <button
        className="cta cta-theme"
        onClick={() => {
          handleMessage(message, setHandled);
        }}>
        Handel bericht af
      </button>
      <button className="cta cta-theme cta--sec" onClick={inboxPopup}>
        Verwijder bericht
      </button>
    </section>
  );
};

export default InboxContent;
