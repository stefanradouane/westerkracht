import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { endpoint } from "../api/endpoints";
import { CM_Block } from "./cm-component-block";
import handleSubmit from "./cm-component-submit";
import addItem from "./cm-component-add";

/**
 *
 * @param {Object} props containing the param type
 * @constant {String} type = props.type could be "coach" or "info"
 * @constant {String} key could be "name" or "title" based on the type
 * @returns Admin selection tabs including a tab to create a new coach or info section.
 */
export default function CM_Component(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const type = props.type;
  const key = type == "coach" ? "name" : "title";

  // Fetch media and type
  useEffect(() => {
    api
      .get(endpoint.media.get)
      .then((data) => {
        setFiles(data);
      })
      .catch((err) => {
        throw new Error(err);
      });

    api
      .get(endpoint[type].get)
      .then((data) => {
        setData(data);
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
    handleSubmit(e, type, remove, { changeTab, setData });
  };

  const addCoach = async (e) => {
    addItem(e, type, { changeTab, setData });
  };

  /**
   * Funtion to change the tab.
   * Could be fired on click or after a new item is created
   * @param {SyntheticBaseEvent} e React event
   * @param {Object} item the last created object
   */

  const changeTab = (e, item) => {
    const target = e ? e : false;

    const forms = document.querySelectorAll(`.cm-block`);
    const formNavBtn = document.querySelectorAll(`.cm-blocks__nav-option`);
    forms.forEach((form) => (form.ariaDisabled = "true"));
    formNavBtn.forEach((btn) => (btn.ariaChecked = "false"));
    let selectedForm = undefined;
    let selectedNav = undefined;

    if (target) {
      selectedForm = document.querySelector(
        `.cm-block[data-value=${e.target.value}]`
      );

      console.log(formNavBtn);
      selectedNav = Array.from(formNavBtn).find(
        (item) => item.value == e.target.value
      );
    } else {
      selectedForm = forms[0];
      selectedNav = formNavBtn[0];
    }

    selectedForm.ariaDisabled = "false";
    selectedNav.ariaChecked = "true";
  };

  const cmBlocks = data.map((instance, index) => {
    const disabled = index == 0 ? false : true;
    return (
      <CM_Block
        instance={instance}
        submit={handleSubmitInfo}
        files={files}
        disabled={disabled}
        key={index}
        type={type}
      />
    );
  });

  const cmNav = data.map((instance, index) => {
    const active = index == 0 ? true : false;
    return (
      <button
        className="cm-blocks__nav-option cta cta-theme"
        value={instance[key].replaceAll(" ", "")}
        onClick={changeTab}
        key={index}
        aria-checked={active}>
        {instance[key]}
      </button>
    );
  });

  return (
    <section className="cm-blocks">
      <nav className="cm-blocks__nav">
        {cmNav}
        <button
          className="cm-blocks__nav-option cm-blocks__nav-option--add cta-theme"
          value="New"
          onClick={changeTab}
          key="new">
          <svg
            className="icon icon--plus"
            viewBox="0 0 101 101"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M50.0419 0C51.7009 0 53.2919 0.659033 54.465 1.83212C55.6381 3.0052 56.2971 4.59624 56.2971 6.25524V43.7867H93.8286C95.4875 43.7867 97.0786 44.4457 98.2517 45.6188C99.4248 46.7919 100.084 48.3829 100.084 50.0419C100.084 51.7009 99.4248 53.2919 98.2517 54.465C97.0786 55.6381 95.4875 56.2971 93.8286 56.2971H56.2971V93.8286C56.2971 95.4875 55.6381 97.0786 54.465 98.2517C53.2919 99.4248 51.7009 100.084 50.0419 100.084C48.3829 100.084 46.7919 99.4248 45.6188 98.2517C44.4457 97.0786 43.7867 95.4875 43.7867 93.8286V56.2971H6.25524C4.59624 56.2971 3.0052 55.6381 1.83212 54.465C0.659033 53.2919 0 51.7009 0 50.0419C0 48.3829 0.659033 46.7919 1.83212 45.6188C3.0052 44.4457 4.59624 43.7867 6.25524 43.7867H43.7867V6.25524C43.7867 4.59624 44.4457 3.0052 45.6188 1.83212C46.7919 0.659033 48.3829 0 50.0419 0Z" />
          </svg>
        </button>
      </nav>
      <section className="cm-blocks__display">
        {cmBlocks}
        <CM_Block
          instance={{}}
          submit={addCoach}
          next={true}
          files={files}
          disabled={true}
          key={"New"}
          type={type}
        />
      </section>
    </section>
  );
}
