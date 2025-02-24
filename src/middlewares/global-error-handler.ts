import { NextFunction, Request, Response } from "express";
import { sendErrorResponse } from "../utils/send-response";

export const GlobalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong (Caught by GlobalErrorHandler)";
    sendErrorResponse(res, {
        statusCode,
        message,
        error: err
    })   
}