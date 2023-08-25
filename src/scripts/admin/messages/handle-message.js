import { api } from "../../api/api";
import { endpoint } from "../../api/endpoints";

export default function handleMessage(instance, cb, useMessage, remove) {
  const body = {
    id: instance._id,
    handled: remove ? instance.handled : !instance.handled,
    method: remove ? "remove" : "update",
  };

  const key =
    instance.type == "inschrijving" ? "useInschrijving" : "useContact";
  const set =
    instance.type == "inschrijving" ? "setInschrijving" : "setContact";
  const use = useMessage[key][set];

  // Change instance
  instance.handled = body.handled;
  api.post(endpoint.api[instance.type], body).then((res) => {
    use(res);
    if (!remove) cb(body.handled);
  });
}
