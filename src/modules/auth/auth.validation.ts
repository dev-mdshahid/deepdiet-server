import { z } from 'zod';
import { TUserRole } from './auth.interface';

const SUserInfoValidation = z.object({
    username: z.string(),
    email: z.string().email(),
});

const SRegisterValidation = z.object({
    role: z.enum(Object.values(TUserRole) as [string, ...string[]]),
    password: z.string().min(8),
    userInfo: SUserInfoValidation,
});

const SLoginValidation = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const AuthValidationSchema = {
    register: SRegisterValidation,
    login: SLoginValidation,
};
