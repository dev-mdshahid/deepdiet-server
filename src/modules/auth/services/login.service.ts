import bcrypt from 'bcrypt';
import { AppError } from '../../../error/app-error';
import { AuthUserModel } from '../auth.model';
import config from '../../../config';
import { generateToken } from '../auth.utils';

export const loginService = async (email: string, password: string) => {
    const userRecord = await AuthUserModel.findOne({ email });
    if (!userRecord) {
        throw new AppError(404, 'User not found');
    }
    const isPasswordMatch = await bcrypt.compare(password, userRecord.password);
    if (!isPasswordMatch) {
        throw new AppError(401, 'Sorry! Incorrect password');
    }

    // generate access token and refresh token
    const jwtPayload = {
        username: userRecord.username,
        email: userRecord.email,
        role: userRecord.role,
    };
    const accessToken = generateToken(
        jwtPayload,
        config.jwt_access_token_secret as string,
        Number(config.jwt_access_token_expiry_in_minutes)
    );

    const refreshToken = generateToken(
        jwtPayload,
        config.jwt_refresh_token_secret as string,
        Number(config.jwt_refresh_token_expiry_in_minutes)
    );

    return {
        username: userRecord.username,
        email: userRecord.email,
        role: userRecord.role,
        accessToken,
        refreshToken,
    };
};
