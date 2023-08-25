import React from "react";

const CmsRow = (props) => {
  const { type } = props;
  return (
    <section className="cms__row">
      <p className="text text--big">{type}</p>
    </section>
  );
};

export default CmsRow;
