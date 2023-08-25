import { api } from "../api/api";
import { endpoint } from "../api/endpoints";
import { form } from "../form/form";
import makeNotification from "./notification";

/**
 * Submit a request to the server
 * @param {SyntheticBaseEvent} e React event
 * @param {Boolean} remove if true, remove instance
 */
export default function handleSubmit(e, type, remove, next) {
  e.preventDefault();
  const body = form.parseToBody(e.target.form);

  const key = type == "hero" ? null : type == "coach" ? "name" : "title";
  const method = remove ? "verwijderd" : "bijgewerkt";
  const defValue =
    type == "hero"
      ? "Hero"
      : body[key]
      ? body[key]
      : type == "coach"
      ? "coach"
      : "info";

  if (body.invalid) {
    makeNotification(type, true, "bijwerken");
    return;
  }

  if (remove) {
    body.method = "remove";
    next.changeTab();
  } else {
    body.method = "update";
  }

  console.log(body);

  api
    .post(endpoint[type].post, body)
    .then((data) => {
      next.setData(data);
      makeNotification(defValue, false, method);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
