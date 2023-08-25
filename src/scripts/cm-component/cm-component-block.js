import React, { useState } from "react";
import { Image } from "./cm-component-image";
import { Options } from "../optionlist/optionlist";
import { popUp } from "./popup";
import { form } from "../form/form";

export const CM_Block = (props) => {
  const [image, setImage] = useState(props.instance.image);
  const type = props.type;
  const key = type == "coach" ? "name" : "title";
  const dataValue = props.instance[key] ? props.instance[key] : "New";
  const dataId = props.instance._id ? props.instance._id : "New";
  const method = props.instance._id ? "id" : "new";

  const defaultVal = (value) => {
    return value ? value : null;
  };

  return (
    <form
      className="cm-block"
      method="POST"
      data-value={dataValue.replaceAll(" ", "")}
      aria-disabled={props.disabled}
      key={dataId}>
      <input type="hidden" name={method} value={dataId} required />
      <section className="cm-block__grid">
        <section className="cm-block__grid-img">
          <Image files={props.files} image={image} />
        </section>
        <section className="cm-block__grid-info">
          <label className="control" htmlFor="name">
            <span>
              {type} {key}
              <span className="control__required">*</span>
            </span>
            <input
              className="control__input"
              type="text"
              name={key}
              defaultValue={defaultVal(props.instance[key])}
              placeholder={type == "info" ? "Titel van het blok" : "Naam"}
              required
            />
          </label>
          <label className="control" htmlFor="image">
            <span>
              {type} image
              <span className="control__required">*</span>
            </span>
            <Options
              files={props.files}
              instance={props.instance}
              imageOptions={{ image, setImage }}
            />
          </label>

          {type == "coach" ? (
            <label className="control control--insta" htmlFor="igmain">
              <span>
                Coach instagram
                <span className="control__required">*</span>
              </span>
              <input
                className="control__input"
                type="text"
                name="igmain"
                defaultValue={defaultVal(
                  props?.instance?.ig ? props?.instance?.ig[0] : null
                )}
                placeholder="Main gram"
                required
              />
              <input
                className="control__input"
                type="text"
                name="iglift"
                defaultValue={defaultVal(
                  props?.instance?.ig ? props?.instance?.ig[1] : null
                )}
                placeholder="Lifting gram"
                required
              />
            </label>
          ) : (
            <>
              <label className="control control--subtitle" htmlFor="subtitle">
                <span>
                  {type} ondertitel
                  <span className="control__required">*</span>
                </span>
                <input
                  className="control__input"
                  type="text"
                  name="subtitle"
                  defaultValue={defaultVal(
                    props?.instance?.subtitle ? props?.instance?.subtitle : null
                  )}
                  placeholder="Ondertitel van het blok"
                  required
                />
              </label>
              <label className="control" htmlFor="image">
                <span>
                  {type} visual
                  <span className="control__required">*</span>
                </span>
                <select
                  name="visual"
                  className="control__input"
                  defaultValue={props.instance.visual}>
                  <option value="default">Normaal</option>
                  <option value="important">Belangrijk</option>
                  <option value="info" disabled>
                    Info
                  </option>
                </select>
              </label>
            </>
          )}
        </section>
        <section className="cm-block__grid-content">
          <label className="control" htmlFor="content">
            <span>
              Blok content
              <span className="control__required">*</span>
            </span>
            <textarea
              className="control__input"
              name="content"
              rows="5"
              defaultValue={defaultVal(props.instance?.content)}
              placeholder="Vul de informatie in"
              required
            />
          </label>
        </section>
        <section className="cm-block__grid-link">
          <label className="control" htmlFor="link">
            <span>
              Link
              <span className="control__required">*</span>
            </span>
            <input
              className="control__input"
              type="text"
              name="linkTitle"
              defaultValue={defaultVal(props.instance?.linkTitle)}
              placeholder="Tekst op de button"
              required
            />
            <input
              className="control__input"
              type="text"
              name="link"
              defaultValue={defaultVal(props.instance?.link)}
              placeholder="Link met een '#' of een '/'"
              required
            />
          </label>
        </section>
        <section className="cm-block__grid-controls">
          <button
            className="cta cta-theme"
            onClick={props.submit}
            data-name={props.instance[key]}>
            {props.next ? `Voeg ${type} toe` : "Verander gegevens"}
          </button>
          <button
            className="cta cta-theme"
            onClick={
              props.next
                ? (e) => {
                    e.preventDefault();
                    setImage("new");
                    form.reset(e.target.form);
                  }
                : popUp
            }
            name="popup"
            value="open"
            role="button"
            data-name={props.instance[key]}>
            {props.next ? "Annuleer" : `Verwijder ${type} 😧`}
          </button>
        </section>
        <section
          className="cm-block__grid-popup"
          data-name={props.instance[key]}>
          <h2 className="title title--h2 title--centered">
            Weet je zeker dat je <span>{props.instance[key]}</span> wilt
            verwijderen
          </h2>
          <section>
            <button
              className="cta cta-theme"
              onClick={popUp}
              name="popup"
              value="close"
              data-name={props.instance[key]}>
              Annuleer
            </button>
            <button
              className="cta cta-theme"
              onClick={(e) => {
                props.submit(e, true);
              }}
              data-name={props.instance[key]}>
              Ja ik wil {props.instance[key]} verwijderen
            </button>
          </section>
        </section>
      </section>
    </form>
  );
};
