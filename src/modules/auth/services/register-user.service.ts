import { AuthUserModel } from "../auth.model";
import { AuthValidationSchema } from "../auth.validation";
import { z } from "zod";

export const registerUserService = async (data: z.infer<typeof AuthValidationSchema.register>) => {
    const {
        role,
        password,
        userInfo
    } = data;

    const authUser = {   
        username: userInfo.username,
        email: userInfo.email,
        role,
        password,
    }
    const user = await AuthUserModel.create(authUser)

    return user;
}