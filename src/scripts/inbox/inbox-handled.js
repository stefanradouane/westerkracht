import React from "react";

const InboxHandled = (props) => {
  const { handled } = props;
  return (
    <section className="inbox__row-item">{handled ? <>✅</> : <>❌</>}</section>
  );
};

export default InboxHandled;
