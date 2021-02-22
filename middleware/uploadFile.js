const multer = require("multer");
const moment = require("moment");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/images");
  },
  filename(req, file, cd) {
    const date = moment().format("DDMMYYYY-HHmmss_SSS");
    cd(null, `${date}-${file.originalname}`);
  },
});
const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const limits = {
  fileSize: 1024 * 1024 * 5,
};
module.exports = multer({ storage, fileFilter, limits });
