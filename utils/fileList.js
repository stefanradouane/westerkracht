const fs = require("fs");
const path = require("path");

function getFilesInDirectory(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        return reject(err);
      }
      let apiFiles = [];
      files
        .filter((file) => path.parse(file).name !== ".DS_Store")
        .map((file) => {
          apiFiles.push({
            fileName: path.parse(file).name,
            fileBase: path.parse(file).base,
            fileUrl: `../assets/images/${path.parse(file).base}`,
            fileType: path.parse(file).ext,
          });
        });
      resolve(apiFiles);
    });
  });
}

module.exports = getFilesInDirectory;
