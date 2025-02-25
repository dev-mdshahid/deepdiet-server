import { NextFunction, Request, Response } from 'express';
import { sendErrorResponse } from '../utils/send-response';

export const NotFound = (req: Request, res: Response, next: NextFunction) => {
    sendErrorResponse(res, {
        statusCode: 404,
        message: `Not Found - ${req.originalUrl}`,
        error: new Error(`Not Found - ${req.originalUrl}`),
    });
};
