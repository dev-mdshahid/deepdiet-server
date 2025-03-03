import { z } from 'zod';
import { TActivityLevel, TGender, TGoal } from './user.interface';

const SDemographicValidaiton = z.object({
    height: z.number(),
    weight: z.number(),
    dob: z.string(),
    gender: z.enum(Object.values(TGender) as [string, ...string[]]),
    // activityLevel: z.enum(
    //     Object.values(TActivityLevel) as [string, ...string[]]
    // ),
    // goal: z.enum(Object.values(TGoal) as [string, ...string[]]),
});

const SCreateUserValidation = z.object({
    username: z.string().min(3).max(30).trim(),
    name: z.string().min(3).max(20).trim(),
    email: z.string().email(),
    demographic: SDemographicValidaiton,
});

export const UserValidationSchema = {
    createUser: SCreateUserValidation,
};
