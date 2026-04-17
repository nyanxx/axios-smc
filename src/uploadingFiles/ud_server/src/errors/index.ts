export class AppError extends Error {
  status: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.status = statusCode;

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ServiceError extends AppError {}
export class TokenError extends AppError {}
export class PayloadError extends AppError {}
export class DuplicateError extends AppError {}
export class ValidationError extends AppError {}
export class VerificationError extends AppError {}
export class AuthenticationError extends AppError {}
export class DALError extends AppError {}
export class NoFileFound extends AppError {}
// [...]
