import React from "react";

export const Image = (props) => {
  const imageUrl = props.files
    .filter((file) => file.fileUrl == props.image)
    .map((file) => {
      return file.fileUrl == props.image ? file.fileUrl : null;
    });

  if (imageUrl.length == 0) {
    return <h1 className="title title--h1">NEW</h1>;
  } else if (props.noCmBlock) {
    return <img className="image" src={imageUrl.toString()} />;
  } else {
    return <img className="cm-block__image" src={imageUrl.toString()} />;
  }
};
