import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { Image } from "../cm-component/cm-component-image";
import { api } from "../api/api";
import { endpoint } from "../api/endpoints";
import { Options } from "../optionlist/optionlist";
import handleSubmit from "../cm-component/cm-component-submit";

const Hero = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  // Fetch hero and media
  useEffect(() => {
    api
      .get(endpoint.hero.get)
      .then((data) => {
        setData(data);
        setImage(data[0].image);
      })
      .catch((err) => {
        throw new Error(err);
      });

    api
      .get(endpoint.media.get)
      .then((data) => {
        setFiles(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  useEffect(() => {
    if (data != null) {
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return <div className="icon icon--loading"></div>;
  }

  const handleSubmitInfo = async (e, remove) => {
    handleSubmit(e, "hero", remove, { changeTab: () => {}, setData });
  };

  return data.map((instance) => {
    return (
      <form method="POST">
        <input name="id" type="hidden" value={instance._id} />
        <Image files={files} image={image} noCmBlock={true} />

        <label className="control">
          <span>
            Hero image
            <span className="control__required">*</span>
          </span>
          <Options
            files={files}
            instance={instance}
            imageOptions={{ image, setImage }}
          />
        </label>
        <label className="control">
          <span>
            Link
            <span className="control__required">*</span>
          </span>
          <input
            className="control__input"
            type="text"
            name="linkTitle"
            defaultValue={instance.linkTitle}
          />
          <input
            className="control__input"
            type="text"
            name="link"
            defaultValue={instance.link}
            placeholder="Link met een '#' of een '/'"
          />
        </label>

        <button onClick={handleSubmitInfo} className="cta cta-theme">
          Verander hero
        </button>
      </form>
    );
  });
};

const container = document.querySelector(".hero-container");

if (container) {
  const root = createRoot(container);
  root.render(<Hero />);
}
