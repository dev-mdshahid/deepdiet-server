import { NextFunction, Request, Response } from 'express';
import { deepValidateEmail } from '../../utils/deep-validate-email';
import { AppError } from '../../error/app-error';
import { catchAsync } from '../../utils/catch-async';

export const ValidateEmail = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;
        const { valid } = await deepValidateEmail(email);
        if (!valid) {
            throw new AppError(400, `Sorry! You provided an invalid email!`);
        }
        next();
    }
);
