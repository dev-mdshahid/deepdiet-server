import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { tokens } from '../../constants/tokens';

export const generateToken = (
    jwtPayload: object,
    jwtSecret: string,
    expiresInMinutes: number
) => {
    const token = jwt.sign(jwtPayload, jwtSecret, {
        expiresIn: `${expiresInMinutes}m`,
    });
    return token;
};

export const verifyToken = (token: string, jwtSecret: string) => {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded as JwtPayload;
};

export const clearAllTokens = (res: Response) => {
    res.clearCookie(tokens.accessToken);
    res.clearCookie(tokens.refreshToken);
    res.clearCookie(tokens.sessionToken);
};
