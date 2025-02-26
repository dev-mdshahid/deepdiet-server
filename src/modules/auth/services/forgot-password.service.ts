import { z } from 'zod';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { AppError } from '../../../error/app-error';
import { AuthUserModel } from '../auth.model';
import { verifyToken } from '../auth.utils';
import { AuthValidationSchema } from '../auth.validation';

export const forgotPasswordService = async (
    userData: z.infer<typeof AuthValidationSchema.forgotPassword>,
    sessionToken: string
) => {
    const { email, password } = userData;

    const decoded = verifyToken(
        sessionToken,
        config.jwt_session_token_secret as string
    );

    if (!decoded || decoded.email !== email) {
        throw new AppError(401, 'Invalid session token!');
    }

    const hashedPassword = await bcrypt.hash(
        password,
        Number(config.bcrypt_salt_rounds)
    );

    const result = await AuthUserModel.findOneAndUpdate(
        { email },
        { password: hashedPassword, passwordLastChangedAt: new Date() }
    );

    return result;
};
