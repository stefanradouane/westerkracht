import React from "react";
import { createRoot } from "react-dom/client";

const notifcation = document.querySelector("[data-notification]");
const root = notifcation ? createRoot(notifcation) : null;

export default function makeNotification(name, error, method) {
  let message;
  if (error) {
    message = `Kan ${name} niet ${method} ❌`;
  } else {
    message = `${name} ${method} ✅`;
  }

  const Notification = () => {
    return <span className="notification__text">{message}</span>;
  };

  if (notifcation) {
    root.render(<Notification />);
  }
}
