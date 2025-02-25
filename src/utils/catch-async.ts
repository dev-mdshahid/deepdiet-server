import { RequestHandler, Request, Response, NextFunction } from 'express';

// Reusable handler for asynchronus functions to avoid repetitive try/catch blocks

export const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
