import multer from "@koa/multer";
import { BadRequestError } from "../lib/erros.js";

const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new BadRequestError("Only image files allowed"), false);
  }
  cb(null, true);
};

export const uploadSingleImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
});

export const uploadMultipleImages = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
});