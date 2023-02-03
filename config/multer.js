const multer = require('multer');
const path = require('path');

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./public/assets/images`);
  },
  filename(req, file, cb) {
    const userFileName = req.body.fileName;
    const fileEnd = path.extname(file.originalname);
    const today = Date.now();
    const fileName = userFileName + fileEnd;
    console.log(fileName)
    cb(null, fileName);
  },
});

const upload = multer({
  storage: fileStorageEngine,
});

module.exports = {
  upload,
};