import { Schema, model } from 'mongoose';
import {
    TActivityLevel,
    TGender,
    TGoal,
    TUser,
    TDietType,
    TCookingSkill,
    TDemographic,
    TMealFrequency,
    TFoodPreferences,
} from './user.interface';

export const SDemographic = new Schema<TDemographic>({
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: Object.values(TGender),
        required: true,
    },
    activityLevel: {
        type: String,
        enum: Object.values(TActivityLevel),
        required: true,
    },
    goal: {
        type: String,
        enum: Object.values(TGoal),
        required: true,
    },
});

export const SMealFrequency = new Schema<TMealFrequency>({
    breakfast: { type: Boolean },
    snackAfterBreakfast: { type: Boolean },
    lunch: { type: Boolean },
    snackAfterLunch: { type: Boolean },
    dinner: { type: Boolean },
    snackAfterDinner: { type: Boolean },
});

export const SFoodPreferences = new Schema<TFoodPreferences>({
    dietType: {
        type: String,
        enum: Object.values(TDietType),
    },
    availableFoods: { type: [String] },
    dislikedFoods: { type: [String] },
    allergies: { type: [String] },
    intolerances: { type: [String] },
    mealFrequency: { type: SMealFrequency },
    cookingSkill: {
        type: Number,
        enum: Object.values(TCookingSkill),
    },
});

export const SUser = new Schema<TUser>({
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    profilePicture: { type: String, required: true },
    medicalConditions: { type: [String], required: true },
    demographic: { type: SDemographic, required: true },
    foodPreferences: { type: SFoodPreferences },
});

export const UserModel = model<TUser>('User', SUser);
