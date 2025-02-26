import mongoose from 'mongoose';
import { z } from 'zod';
import { AppError } from '../../../error/app-error';
import { reasonForRequestingOtp } from '../../otp/otp.constants';
import { UserModel } from '../../user/user.model';
import { AuthUserModel } from '../auth.model';
import { AuthValidationSchema } from '../auth.validation';
import { verifyToken } from '../auth.utils';
import config from '../../../config';

export const registerUserService = async (
    data: z.infer<typeof AuthValidationSchema.register>,
    sessionToken: string
) => {
    const decoded = verifyToken(
        sessionToken,
        config.jwt_session_token_secret as string
    );
    const { role, password, userInfo } = data;
    console.log(decoded);

    // checking the session token
    if (
        !decoded ||
        decoded.email !== userInfo.email ||
        decoded.reason != reasonForRequestingOtp.VERIFY_EMAIL
    ) {
        throw new AppError(401, 'Invalid session token!');
    }

    // checking user existence is not necessary here as it is already being checked in request-otp api

    const session = await mongoose.startSession();
    try {
        // starting transation
        session.startTransaction();

        // create the auth user
        const authUser = {
            username: userInfo.username,
            email: userInfo.email,
            role,
            password,
        };

        await AuthUserModel.create([authUser], { session });

        const [newUser] = await UserModel.create(
            [{ ...userInfo, isVerified: true }],
            { session }
        );

        await session.commitTransaction();
        return newUser;
    } catch (error: any) {
        await session.abortTransaction();
        throw new AppError(500, error.message);
    } finally {
        await session.endSession();
    }
};
