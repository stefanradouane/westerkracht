import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import CircularProgress from "@mui/material/CircularProgress";

import { DataGrid } from "@mui/x-data-grid";

const endpointMediaAPIget = "/api/media";
const endpointMediaAPIpost = "/admin/media";

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
        fetch(endpointMediaAPIpost, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rows[id]),
        });

        const fetchData = async () => {
          const response = await fetch(endpointMediaAPIget);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setData(await response.json());
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
      const addItems = fetch(endpointMediaAPIpost, {
        method: "POST",
        body: formData,
      });

      const fetchData = async () => {
        const response = await fetch(endpointMediaAPIget);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setData(await response.json());
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
      const response = await fetch(endpointMediaAPIget);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setData(await response.json());
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
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
    button.style.display = "block";
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
              {" "}
              X{" "}
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
                placeholder={"imagenaam"}
              />

              <button
                type="submit"
                value="add"
                className="mediabank-form__button mediabank-form__button--add cta cta-theme"
                onClick={handleSubmit}>
                Add file
              </button>
            </section>
          </section>

          <section className="mediabank-form__section mediabank-form__section--remove">
            <button
              className="mediabank-form__button mediabank-form__button--remove cta cta-theme"
              value="remove"
              onClick={handleSubmit}>
              Remove file
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
