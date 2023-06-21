import express from "express";

import { uploadImage, downloadImage, mailHandler } from "../controller/image-controller.js";

import upload from "../utils/upload.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadImage);
router.get("/file/:fileId", downloadImage);
router.post("/file/:fileId", downloadImage);
router.post("/download/sendmail",mailHandler);

export default router;
