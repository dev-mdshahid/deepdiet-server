import config from '../../../config';
import { generateToken, verifyToken } from '../auth.utils';
import { AuthValidationSchema } from '../auth.validation';

export const refreshTokenService = async (token: string) => {
    const decoded = verifyToken(
        token,
        config.jwt_refresh_token_secret as string
    );

    const jwtPaylod = AuthValidationSchema.jwtPayload.parse(decoded);

    const accessToken = generateToken(
        jwtPaylod,
        config.jwt_access_token_secret as string,
        Number(config.jwt_access_token_expiry_in_minutes)
    );

    return accessToken;
};
