import { z } from 'zod';
import { TUserRole } from './auth.interface';
import { UserValidationSchema } from '../user/user.validation';

const SRegisterValidation = z.object({
    role: z.enum(Object.values(TUserRole) as [string, ...string[]]),
    password: z.string().min(8),
    userInfo: UserValidationSchema.createUser,
});

const SLoginValidation = z.object({
    email: z.string().email(),
    password: z.string(),
});

const SResetPasswordValidation = z.object({
    email: z.string().email(),
    password: z.string(),
});

const SJwtPayloadValidation = z.object({
    username: z.string(),
    role: z.enum(Object.values(TUserRole) as [string, ...string[]]),
    email: z.string().email(),
});

export const AuthValidationSchema = {
    register: SRegisterValidation,
    login: SLoginValidation,
    jwtPayload: SJwtPayloadValidation,
    resetPassword: SResetPasswordValidation,
};
