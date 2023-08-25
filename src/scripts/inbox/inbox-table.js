import React, { useEffect, useState } from "react";
import InboxRow from "./inbox-row";
import sortArray from "./inbox-sort";

const InboxTable = (props) => {
  const { useMessage, rows, type } = props;
  const { useContact, useInschrijving } = useMessage;

  const messages = [
    ...addedType(useInschrijving.inschrijving, "inschrijving"),
    ...addedType(useContact.contact, "contact"),
  ];

  function addedType(arr, type) {
    arr.map((message) => {
      message.type = type;
    });
    return arr;
  }

  const sortedMessages = sortArray.byCreated(messages, rows);
  console.log(sortedMessages);

  return sortedMessages.length == 0 ? (
    <p className="text">Geen berichten gevonden</p>
  ) : (
    <>
      {sortedMessages.map((message, i) => (
        <InboxRow
          message={message}
          useMessage={useMessage}
          key={i}
          type={type}
        />
      ))}
      <dialog className="inbox__popup"></dialog>
    </>
  );
};

export default InboxTable;
