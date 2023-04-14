import { api } from "../../api/api";
import { endpoint } from "../../api/endpoints";

export default function removeMessage(instance, cb, popup) {
  const body = {
    id: instance._id,
    property: "remove",
  };
  api.post(endpoint.api.inschrijving, body).then((res) => {
    cb(res);
    popup.close();
  });
}
