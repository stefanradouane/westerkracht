import React, { useEffect, useState } from "react";
import InboxRow from "./inbox-row";
import sortArray from "./inbox-sort";

const InboxTable = (props) => {
  const { state, rows, type } = props;
  const value = state.value;
  const messages = [
    ...addedType(value.inschrijving, "inschrijving"),
    ...addedType(value.contact, "contact"),
  ];

  function addedType(arr, type) {
    arr.map((message) => {
      message.type = type;
    });
    return arr;
  }

  const sortedMessages = sortArray.byCreated(messages, rows);

  return (
    <>
      {sortedMessages.map((message, i) => (
        <InboxRow message={message} key={i} type={type} />
      ))}

      <dialog className="inbox__popup">
        <section className="inbox__popup-content">
          <h2>Are you sure you want to delete this message?</h2>
          <button>Yes</button>
          <button>No</button>
        </section>
      </dialog>
    </>
  );
};

export default InboxTable;
