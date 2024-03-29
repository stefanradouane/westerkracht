import React, { useState } from "react";
import handleMessage from "./handle-message";
import removeMessage from "./remove-message";

/**
 * @todo Make this message generic (also work for the contact form.)
 */
export default function Message(props) {
  const instance = props.instance;
  const cb = props.cb;

  return (
    <section className="message inschrijving">
      <h3 className="title title--h3">
        {instance.name}, {instance.age}
      </h3>
      <p className="inschrijving__email">{instance.email}</p>
      <p className="inschrijving__phone">{instance.phone}</p>
      {instance.coach ? (
        <p className="inschrijving__coach">{instance.coach}</p>
      ) : (
        <p className="inschrijving__coach">Geen coach</p>
      )}
      <p className="inschrijving__content">{instance.content}</p>
      <div className="inschrijving__handled">
        {instance.handled ? <>✅</> : <>❌</>}
      </div>
      <button
        className="cta cta-theme cta--fw inschrijving__button"
        value="change"
        onClick={() => {
          handleMessage(instance, cb);
        }}>
        Afgehandeld
        <svg
          className="icon icon--bel"
          viewBox="0 0 101 112"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M39.7334 6.94947C40.5642 4.89618 41.9892 3.13777 43.8258 1.89962C45.6624 0.661467 47.8269 0 50.0419 0C52.2569 0 54.4214 0.661467 56.258 1.89962C58.0946 3.13777 59.5196 4.89618 60.3504 6.94947C68.5724 9.21067 75.8248 14.1084 80.9938 20.8905C86.1627 27.6727 88.9624 35.9641 88.9627 44.4914V70.6073L99.1489 85.8865C99.7075 86.7238 100.028 87.6971 100.077 88.7026C100.126 89.708 99.9011 90.7078 99.4262 91.5954C98.9513 92.483 98.2444 93.2249 97.3808 93.7422C96.5173 94.2595 95.5295 94.5326 94.5229 94.5324H69.3077C68.6383 99.1646 66.3223 103.4 62.784 106.464C59.2458 109.528 54.7222 111.214 50.0419 111.214C45.3616 111.214 40.838 109.528 37.2998 106.464C33.7615 103.4 31.4455 99.1646 30.7761 94.5324H5.56095C4.55433 94.5326 3.56655 94.2595 2.703 93.7422C1.83945 93.2249 1.13251 92.483 0.657627 91.5954C0.182739 90.7078 -0.0422889 89.708 0.00654898 88.7026C0.0553868 87.6971 0.376259 86.7238 0.934933 85.8865L11.1211 70.6073V44.4914C11.1211 26.5656 23.2421 11.4643 39.7334 6.94947ZM42.1799 94.5324C42.7541 96.1596 43.8189 97.5686 45.2275 98.5652C46.6361 99.5619 48.3192 100.097 50.0447 100.097C51.7702 100.097 53.4532 99.5619 54.8618 98.5652C56.2704 97.5686 57.3352 96.1596 57.9095 94.5324H42.1743H42.1799ZM50.0419 16.6908C42.6687 16.6908 35.5975 19.6198 30.3839 24.8334C25.1703 30.047 22.2413 37.1182 22.2413 44.4914V72.292C22.2416 73.3903 21.9165 74.4641 21.3072 75.3778L15.9528 83.4122H84.1254L78.771 75.3778C78.1637 74.4634 77.8406 73.3897 77.8425 72.292V44.4914C77.8425 37.1182 74.9135 30.047 69.6999 24.8334C64.4863 19.6198 57.4151 16.6908 50.0419 16.6908Z" />
        </svg>
      </button>
      <button
        className="cta cta-theme cta--fw inschrijving__button"
        value="remove"
        onClick={() => {
          const popup = document.querySelector(".message__popup");
          openPopUp(popup);
        }}>
        Verwijder
        <svg
          className="icon icon--bin"
          viewBox="0 0 101 101"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M25.0209 10.0084C25.0209 7.35399 26.0754 4.80832 27.9523 2.93139C29.8293 1.05445 32.3749 0 35.0293 0H65.0545C67.7088 0 70.2545 1.05445 72.1315 2.93139C74.0084 4.80832 75.0628 7.35399 75.0628 10.0084V20.0168H95.0796C96.4068 20.0168 97.6796 20.544 98.6181 21.4825C99.5566 22.4209 100.084 23.6938 100.084 25.0209C100.084 26.3481 99.5566 27.621 98.6181 28.5594C97.6796 29.4979 96.4068 30.0251 95.0796 30.0251H89.7301L85.3915 90.786C85.2118 93.311 84.0819 95.6742 82.2294 97.3994C80.377 99.1247 77.9396 100.084 75.4081 100.084H24.6707C22.1392 100.084 19.7018 99.1247 17.8494 97.3994C15.9969 95.6742 14.867 93.311 14.6873 90.786L10.3587 30.0251H5.00419C3.677 30.0251 2.40416 29.4979 1.46569 28.5594C0.527225 27.621 0 26.3481 0 25.0209C0 23.6938 0.527225 22.4209 1.46569 21.4825C2.40416 20.544 3.677 20.0168 5.00419 20.0168H25.0209V10.0084ZM35.0293 20.0168H65.0545V10.0084H35.0293V20.0168ZM20.3871 30.0251L24.6757 90.0754H75.4131L79.7017 30.0251H20.3871ZM40.0335 40.0335C41.3607 40.0335 42.6335 40.5607 43.572 41.4992C44.5105 42.4377 45.0377 43.7105 45.0377 45.0377V75.0628C45.0377 76.39 44.5105 77.6629 43.572 78.6013C42.6335 79.5398 41.3607 80.067 40.0335 80.067C38.7063 80.067 37.4335 79.5398 36.495 78.6013C35.5566 77.6629 35.0293 76.39 35.0293 75.0628V45.0377C35.0293 43.7105 35.5566 42.4377 36.495 41.4992C37.4335 40.5607 38.7063 40.0335 40.0335 40.0335ZM60.0503 40.0335C61.3775 40.0335 62.6503 40.5607 63.5888 41.4992C64.5272 42.4377 65.0545 43.7105 65.0545 45.0377V75.0628C65.0545 76.39 64.5272 77.6629 63.5888 78.6013C62.6503 79.5398 61.3775 80.067 60.0503 80.067C58.7231 80.067 57.4502 79.5398 56.5118 78.6013C55.5733 77.6629 55.0461 76.39 55.0461 75.0628V45.0377C55.0461 43.7105 55.5733 42.4377 56.5118 41.4992C57.4502 40.5607 58.7231 40.0335 60.0503 40.0335Z" />
        </svg>
      </button>

      <dialog className="message__popup">
        <h2 className="title title--h2 title--white">
          Wil je de deze inschrijving verwijderen?
        </h2>
        <button
          className="cta cta-theme message__button"
          onClick={() => {
            const popup = document.querySelector(".message__popup");
            removeMessage(instance, cb, popup);
          }}>
          Verwijder inschrijving
        </button>
        <button
          className="cta cta-theme message__button"
          onClick={() => {
            const popup = document.querySelector(".message__popup");
            popup.close();
          }}>
          Annuleer
        </button>
      </dialog>
    </section>
  );
}

function openPopUp(popup) {
  popup.showModal();
}
