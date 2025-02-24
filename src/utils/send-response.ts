import { Response } from "express"

type TSuccessResponse = {
    statusCode?: number,
    message: string, 
    data: object
}

type TErrorResponse = {
    statusCode: number,
    message: string, 
    error: any
}

export const sendSuccessResponse = (res: Response, {statusCode, message, data}: TSuccessResponse ) => {
    res.status(statusCode || 200).json({
        success: true,
        message,
        data
    })
}

export const sendErrorResponse = (res: Response, {statusCode, message, error}: TErrorResponse) => {
    res.status(statusCode).json({
        success: false,
        message: message || error.message,
        error
    })
}