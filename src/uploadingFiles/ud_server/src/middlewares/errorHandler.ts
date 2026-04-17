import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  error: AppError,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  response.status(error.status || 500).json({
    statusCode: error.status || 500,
    type: error.name,
    message:
      error.name === "SyntaxError"
        ? "Syntax Error"
        : error.message || "Internal Server Error",
  });
};
