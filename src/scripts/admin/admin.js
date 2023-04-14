import React from "react";
import { createRoot } from "react-dom/client";
import Sidebar from "./components/sidebar";
import Main from "./components/main";

const container = document.querySelector("[data-admin-root]");

const Admin = () => {
  return (
    <>
      <Main>
        <h1 className="title title--h1">Admin root</h1>
      </Main>
      <Sidebar />
    </>
  );
  return <h1 className="title title--h1">Admin root</h1>;
};

if (container) {
  const root = createRoot(container);
  root.render(<Admin />);
}
