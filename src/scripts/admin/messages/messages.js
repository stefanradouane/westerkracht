import { useAsync } from "react-use";
import { api } from "../../api/api";
import { endpoint } from "../../api/endpoints";
import Message from "./message";
import React, { useEffect, useState } from "react";
import Inbox from "../../inbox/inbox";

export default function Messages(props) {
  const type = props.type;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    setLoading(true);
    api.get(endpoint.api[type]).then((res) => {
      const moreData = [
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
      ];
      setData(res);
      setLoading(false);
    });

    api.get(endpoint.coach.get).then((res) => {
      setCoaches(res);
    });
  }, []);

  const filterData = (e) => {
    const value = e.target.value;
    console.log(value);
    const form = e.target.form;
    if (value == "handled") {
      api.get(endpoint.api[type]).then((res) => {
        const filteredData = res.filter((instance) => instance.handled);
        setData(filteredData);
      });
    } else if (value == "unhandled") {
      api.get(endpoint.api[type]).then((res) => {
        const filteredData = res.filter((instance) => !instance.handled);
        setData(filteredData);
      });
    } else {
      api.get(endpoint.api[type]).then((res) => {
        setData(res);
      });
    }
  };

  const filterCoach = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value == "all") {
      api.get(endpoint.api[type]).then((res) => {
        setData(res);
      });
    } else {
      api.get(endpoint.api[type]).then((res) => {
        const filteredData = res.filter((instance) => instance.coach == value);
        setData(filteredData);
      });
    }
  };

  const filterDate = (e) => {
    const value =
      e.target.value == ""
        ? "all"
        : new Intl.DateTimeFormat("locale").format(new Date(e.target.value));
    if (value == "all") {
      api.get(endpoint.api[type]).then((res) => {
        setData(res);
      });
    } else {
      api.get(endpoint.api[type]).then((res) => {
        const filteredData = res.filter((instance) => {
          return (
            new Intl.DateTimeFormat("locale").format(
              new Date(instance.created)
            ) == value
          );
        });
        setData(filteredData);
      });
    }
  };

  return (
    <>
      {loading ? (
        <div className="icon icon--loading"></div>
      ) : (
        <>
          <form className="filters">
            <div className="filter">
              <label htmlFor="filter">Sorteer op:</label>
              <select onInput={filterData}>
                <option value="all">Alle</option>
                <option value="handled">Afgehandeld</option>
                <option value="unhandled">Niet afgehandeld</option>
              </select>
            </div>

            <div className="filter">
              <label htmlFor="filter">Inschrijving met coach:</label>
              <select onInput={filterCoach}>
                <option value="all">Alle</option>
                {coaches.map((instance, i) => (
                  <option value={instance.name} key={i}>
                    {instance.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter">
              <label htmlFor="filter">Datum inschrijving:</label>
              <input type="date" onInput={filterDate} />
            </div>
          </form>
          <section className="inbox">
            <Inbox rows={undefined} type={"expanded"} />
            {/* {data.map((instance, i) => (
              <Message instance={instance} key={i} cb={setData} />
            ))} */}
          </section>
        </>
      )}
    </>
  );
}
