import multer from "multer";
import path from "node:path";
import { TEMPLATE_UPLOAD_DIR, UPLOAD_DIR } from "../constants/index.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMPLATE_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtention = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + fileExtention);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Sadece resim dosyaları eklenebilir"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
export default upload;
