import { api } from "../../api/api";
import { endpoint } from "../../api/endpoints";

export default function handleMessage(instance, cb) {
  const body = {
    id: instance._id,
    handled: !instance.handled,
    property: "handled",
  };

  api.post(endpoint.api[instance.type], body).then((res) => {
    cb(body.handled);
  });
}
