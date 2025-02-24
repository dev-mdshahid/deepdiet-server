import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catch-async";
import { AuthServices } from "../services";
import { sendSuccessResponse } from "../../../utils/send-response";

export const registerUserController = catchAsync(async (req: Request, res: Response, next: NextFunction)=> {
    const userData = req.body;
    const user = await AuthServices.registerUser(userData);
    
    sendSuccessResponse(res, {
        statusCode: 201,
        message: 'User registered successfully',
        data: user
    });
} ) 

