import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { catchAsync } from "../utils/catch-async";

export const ValidateRequest = (valiationSchema: AnyZodObject) => {
    return catchAsync( async (req: Request, res: Response, next: NextFunction) => {
        const zodParsedData = await valiationSchema.parseAsync(req.body);
        req.body = zodParsedData
        next();
    })
}