import { Router } from "express";
import { AuthControllers } from "./controllers";
import { ValidateRequest } from "../../middlewares/validate-request";
import { AuthValidationSchema } from "./auth.validation";

export const AuthRouter = Router();

AuthRouter.post('/register-user', ValidateRequest(AuthValidationSchema.register), AuthControllers.registerUser)