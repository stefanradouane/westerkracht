import React from "react";
import inboxPopup from "./inbox-popup";
import handleMessage from "../admin/messages/handle-message";
import collapsible from "../utils/collapsible";
import SpeedDialTooltipOpen from "../speeddial/speeddial";

const InboxContent = (props) => {
  const { message, useMessage, setHandled } = props;
  const date = new Intl.DateTimeFormat("nl-NL", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Europe/Amsterdam",
  }).format(new Date(message.created));
  return (
    <section
      ref={props.InboxContentRef}
      className="inbox__row-item inbox__row-item--expand"
      aria-expanded="false">
      <section>
        <p>{message.name}</p>
        <p>{message.age}</p>
        <p>{message.coach}</p>
        <p>{date}</p>
        <p>{message.content}</p>
      </section>
      <SpeedDialTooltipOpen
        message={message}
        useMessage={useMessage}
        setHandled={setHandled}
      />
    </section>
  );
};

export default InboxContent;
// {message.coach && (
//   <section>
//     <h2>Coach:</h2>
//     <p>{message.coach}</p>
//   </section>
// )}
