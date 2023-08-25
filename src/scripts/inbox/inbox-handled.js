import React from "react";

const InboxHandled = (props) => {
  const { handled } = props;
  return (
    <section className="inbox__row-item inbox__row-item--handle">
      {handled ? (
        <svg className="icon icon--check" viewBox="0 0 24 24">
          <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
        </svg>
      ) : (
        <div className="icon icon--cross icon--cross-small"></div>
      )}
    </section>
  );
};

export default InboxHandled;
