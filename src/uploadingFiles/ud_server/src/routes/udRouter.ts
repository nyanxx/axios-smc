import { Router } from "express";
import multer from "multer";
import { downloadData, uploadData } from "../controllers/udController";
export const upload = multer();

const udRouter = Router();

udRouter.post("/upload", upload.single("myFile"), uploadData);
udRouter.get("/download", downloadData);

export { udRouter };
