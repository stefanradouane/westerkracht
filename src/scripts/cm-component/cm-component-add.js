import { api } from "../api/api";
import { endpoint } from "../api/endpoints";
import { form } from "../form/form";
import makeNotification from "./notification";

/**
 * Submit a request to the server
 * @param {SyntheticBaseEvent} e React event
 * @param {Object<function>} next an object containing multiple functions.
 */

export default function addItem(e, type, next) {
  e.preventDefault();
  const body = form.parseToBody(e.target.form);
  const key = type == "coach" ? "name" : "title";

  if (body.invalid) {
    makeNotification(type, true, "toevoegen");
    return;
  }
  api
    .post(endpoint[type].post, body)
    .then((data) => {
      const nameOrTitle = data[data.length - 1][key];
      next.setData(data);
      makeNotification(nameOrTitle, false, "toegevoegd");
      form.reset(e.target.form);
      next.changeTab(undefined);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
