import { NextResponse } from "next/server";
import ErrorHandler from "@/utils/errorHandler";

export interface CustomError extends Error {
  statusCode?: number;
  title?: string;
  code?: number;
  errors?: { [key: string]: { message: string } };
  keyValue?: Record<string, unknown>;
}

const onError = (err: CustomError) => {
  let error: CustomError | ErrorHandler = { ...err };

  error.statusCode = err.statusCode || 500;
  error.message = err.message || "Internal Server Error";
  error.title = err.title || "Request Failed";

  return NextResponse.json(
    {
      success: false,
      title: error.title,
      message: error.message,
      stack: error.stack,
    },
    { status: error.statusCode }
  );
};

export default onError;
