import { CustomError } from "ts-custom-error";

export class WebAPIError extends CustomError {
  statusCode: number;
  statusText: string;
  constructor(statusCode: number, statusText: string) {
    super(`${statusCode}: ${statusText}`);
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
}
