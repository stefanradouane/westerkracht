import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { DataGrid } from "@mui/x-data-grid";
import { endpoint } from "../api/endpoints";

// File must be refactored.
// 1. Implement api.js
// 2. Implement endpoints.js

export const Mediabank = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);

  const handleSubmit = async (e) => {
    if (e.target.value == "remove") {
      e.preventDefault();
      const selectedRow = document.querySelector('[aria-selected="true"]');
      const id = selectedRow.dataset.id;
      if (selectedRow) {
        fetch(endpoint.media.post, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rows[id]),
        });

        const fetchData = async () => {
          const response = await fetch(endpoint.media.get);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setData(
            (await response.json()).filter(
              (file) => file.fileName !== ".DS_Store"
            )
          );
          setLoading(false);
        };

        fetchData();
        return;
      }
    }

    const fileNameInput = document.querySelector(
      ".mediabank-form__filename-input"
    );
    const fileInput = document.querySelector(".mediabank-form__file");

    const formData = new FormData();
    formData.append("fileName", fileNameInput.value);
    formData.append("img", fileInput.files[0]);

    try {
      const addItems = fetch(endpoint.media.post, {
        method: "POST",
        body: formData,
      });

      const fetchData = async () => {
        const response = await fetch(endpoint.media.get);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setData(
          (await response.json()).filter(
            (file) => file.fileName !== ".DS_Store"
          )
        );
        setLoading(false);
      };

      fetchData();
      resetImage();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(endpoint.media.get);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setData(
        (await response.json()).filter((file) => file.fileName !== ".DS_Store")
      );
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="icon icon--loading"></div>;
  }

  const rows = data.map((file, index) => {
    const { fileBase, fileName, fileType, fileUrl } = file;
    return {
      id: index,
      fileBase,
      fileName,
      fileType,
      fileUrl,
      fileImage: `${fileUrl}`,
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "fileName", headerName: "Document naam", width: 150 },
    { field: "fileBase", headerName: "Document", width: 175 },
    { field: "fileType", headerName: "Document type", width: 90 },
    { field: "fileUrl", headerName: "URL", width: 200 },
    {
      field: "fileImage",
      headerName: "Foto",
      width: 200,
      renderCell: (params) => (
        <img max-width="100%" height="100%" src={params.value} />
      ),
    },
  ];

  const showUploadSection = (e) => {
    const fileSection = document.querySelector(".mediabank-form__filename");
    fileSection.ariaHidden = false;

    const fileImage = document.querySelector(
      ".mediabank-form__displayed-image"
    );
    const file = e.target.files;
    fileImage.src = URL.createObjectURL(file[0]);

    const button = document.querySelector(".mediabank-form__file-remove");
    button.style.display = "flex";
  };

  const cellClick = (e) => {
    const textParent = document.querySelector(".MuiDataGrid-footerContainer");
    if (textParent.children.length == 2) {
      const text = document.createElement("p");
      text.classList.add("rowcount");
      text.textContent = `${e.row.fileName} geselecteerd`;
      textParent.appendChild(text);
      text.addEventListener("click", discloseDelete);
      discloseDelete();
      return;
    }
    const text = textParent.children[2];
    text.textContent = `${e.row.fileName} geselecteerd`;
    text.addEventListener("click", discloseDelete);
    discloseDelete();
  };

  const discloseDelete = () => {
    const section = document.querySelector(".mediabank-form__section--remove");
    section.ariaHidden = false;
  };

  const resetImage = (e) => {
    const closeButton = document.querySelector(".mediabank-form__file-remove");
    if (e) {
      e.preventDefault();
    }
    const fileSection = document.querySelector(".mediabank-form__filename");
    fileSection.ariaHidden = true;
    closeButton.style.display = "none";
    closeButton.previousSibling.form.reset();
  };

  const Datagrid = () => {
    return (
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={75}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 30]}
        pagination
        onCellClick={cellClick}
      />
    );
  };

  return (
    <section className="mediabank">
      <section className="datagrid">{Datagrid()}</section>

      <footer className="mediabank__footer">
        <h3 className="title title--h3">Bestand toevoegen aan de site</h3>

        <form
          method="POST"
          className="mediabank-form"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          id="fileForm">
          <section className="mediabank-form__section mediabank-form__section--add">
            {/* Change input name="img" to something nicer */}
            <input
              className="mediabank-form__file"
              name="img"
              type="file"
              onInput={showUploadSection}
            />

            {/* CHANGE TO DISCARD: SOMETHING */}
            <div className="mediabank-form__file-remove" onClick={resetImage}>
              <div className="icon icon--cross"></div>
            </div>

            <section className="mediabank-form__filename">
              <img className="mediabank-form__displayed-image" />

              <label className="mediabank-form__filename-label">
                Naam van het bestand
              </label>

              <input
                className="mediabank-form__filename-input"
                name="img-name"
                type="text"
                placeholder="Naam van het bestand"
              />

              <button
                type="submit"
                value="add"
                className="mediabank-form__button mediabank-form__button--add cta cta-theme"
                onClick={handleSubmit}>
                Foto toevoegen
              </button>
            </section>
          </section>

          <section className="mediabank-form__section mediabank-form__section--remove">
            <button
              className="mediabank-form__button mediabank-form__button--remove cta cta-theme"
              value="remove"
              onClick={handleSubmit}>
              Foto verwijderen?
              <svg
                className="icon icon--bin"
                viewBox="0 0 101 101"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M25.0209 10.0084C25.0209 7.35399 26.0754 4.80832 27.9523 2.93139C29.8293 1.05445 32.3749 0 35.0293 0H65.0545C67.7088 0 70.2545 1.05445 72.1315 2.93139C74.0084 4.80832 75.0628 7.35399 75.0628 10.0084V20.0168H95.0796C96.4068 20.0168 97.6796 20.544 98.6181 21.4825C99.5566 22.4209 100.084 23.6938 100.084 25.0209C100.084 26.3481 99.5566 27.621 98.6181 28.5594C97.6796 29.4979 96.4068 30.0251 95.0796 30.0251H89.7301L85.3915 90.786C85.2118 93.311 84.0819 95.6742 82.2294 97.3994C80.377 99.1247 77.9396 100.084 75.4081 100.084H24.6707C22.1392 100.084 19.7018 99.1247 17.8494 97.3994C15.9969 95.6742 14.867 93.311 14.6873 90.786L10.3587 30.0251H5.00419C3.677 30.0251 2.40416 29.4979 1.46569 28.5594C0.527225 27.621 0 26.3481 0 25.0209C0 23.6938 0.527225 22.4209 1.46569 21.4825C2.40416 20.544 3.677 20.0168 5.00419 20.0168H25.0209V10.0084ZM35.0293 20.0168H65.0545V10.0084H35.0293V20.0168ZM20.3871 30.0251L24.6757 90.0754H75.4131L79.7017 30.0251H20.3871ZM40.0335 40.0335C41.3607 40.0335 42.6335 40.5607 43.572 41.4992C44.5105 42.4377 45.0377 43.7105 45.0377 45.0377V75.0628C45.0377 76.39 44.5105 77.6629 43.572 78.6013C42.6335 79.5398 41.3607 80.067 40.0335 80.067C38.7063 80.067 37.4335 79.5398 36.495 78.6013C35.5566 77.6629 35.0293 76.39 35.0293 75.0628V45.0377C35.0293 43.7105 35.5566 42.4377 36.495 41.4992C37.4335 40.5607 38.7063 40.0335 40.0335 40.0335ZM60.0503 40.0335C61.3775 40.0335 62.6503 40.5607 63.5888 41.4992C64.5272 42.4377 65.0545 43.7105 65.0545 45.0377V75.0628C65.0545 76.39 64.5272 77.6629 63.5888 78.6013C62.6503 79.5398 61.3775 80.067 60.0503 80.067C58.7231 80.067 57.4502 79.5398 56.5118 78.6013C55.5733 77.6629 55.0461 76.39 55.0461 75.0628V45.0377C55.0461 43.7105 55.5733 42.4377 56.5118 41.4992C57.4502 40.5607 58.7231 40.0335 60.0503 40.0335Z" />
              </svg>
            </button>
          </section>
        </form>
      </footer>
    </section>
  );
};

const container = document.querySelector(".mediabank-container");
if (container) {
  const root = createRoot(container);
  root.render(<Mediabank />);
}
