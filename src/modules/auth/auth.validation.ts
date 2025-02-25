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

export const AuthValidationSchema = {
    register: SRegisterValidation,
    login: SLoginValidation,
};
