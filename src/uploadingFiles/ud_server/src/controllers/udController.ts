import type { Request, Response, NextFunction } from "express";
import { AppError, NoFileFound } from "../errors";

export let fileStorage: Express.Multer.File | undefined;

export const uploadData = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const file = request.file;
    const { userID } = request.body;

    if (!file) throw new AppError("Invalid File", 400);
    fileStorage = file;

    return response.status(200).json({
      fileName: file.originalname,
      fileType: file.mimetype,
      fileContent: file.buffer.toString(),
      userId: userID,
    });
  } catch (error) {
    /**
     * First always avoid storing large file in memory but if you still insist
     * Release the memory upon some failure
     * Note the follwing may not work
     */
    if (fileStorage) {
      fileStorage.buffer = Buffer.alloc(0); // release memory
    }
    fileStorage = undefined;
    next(error);
  }
};

export const downloadData = async (
  _request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const file: Express.Multer.File | undefined = fileStorage;
    if (!file) {
      throw new NoFileFound(
        "Download file failed: please upload a file first.",
        404,
      );
    }
    response.setHeader("Access-Control-Expose-Headers", "X-Filename");
    response.setHeader("X-Filename", file.originalname || "download.txt");
    response.setHeader("Content-Type", `${file.mimetype || "text/plain"}`);
    response.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.originalname || "download.txt"}"`,
    );
    return response.send(file.buffer);
  } catch (error) {
    next(error);
  }
};
