import mongoose from 'mongoose';
import { z } from 'zod';
import { AppError } from '../../../error/app-error';
import { reasonForRequestingOtp } from '../../otp/otp.constants';
import { OtpModel } from '../../otp/otp.model';
import { UserModel } from '../../user/user.model';
import { AuthUserModel } from '../auth.model';
import { AuthValidationSchema } from '../auth.validation';

export const registerUserService = async (
    data: z.infer<typeof AuthValidationSchema.register>
) => {
    const { role, password, userInfo } = data;

    // check if user email is verified
    const otpRecord = await OtpModel.findOne({
        email: userInfo.email,
        isVerified: true,
        reason: reasonForRequestingOtp.VERIFY_EMAIL,
    });

    if (!otpRecord) {
        throw new AppError(
            400,
            'Your email is not verified! Try to register again!'
        );
    }

    // check if the user already exists
    const userRecord = await AuthUserModel.findOne({
        email: userInfo.email,
    });
    if (userRecord) {
        throw new AppError(409, 'User already exists with this email!');
    }

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
            [{ ...userInfo, isVerified: otpRecord.isVerified }],
            { session }
        );

        await OtpModel.findByIdAndDelete(otpRecord._id, { session });

        await session.commitTransaction();
        return newUser;
    } catch (error: any) {
        await session.abortTransaction();
        throw new AppError(500, error.message);
    } finally {
        await session.endSession();
    }
};
