import { Router } from "express";
import { AuthController } from "./controller";
import { Services } from "../../../services/services";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";

export class AuthRouter {
    static get routes() {
        const controller = new AuthController(Services.auth);
        const auth = Router();

        auth.get("/logout", controller.logout);

        auth.post("/send-verification-code", controller.sendVerificationCode);
        auth.post("/send-reset-code", controller.sendResetPasswordCode);
        auth.post("/verify-code", [AuthMiddleware.ValidateUser, AuthMiddleware.ValidateCode], controller.verifyCode);

        auth.post("/login", controller.login);
        auth.post("/register", controller.register);

        auth.post("/reset-password", [AuthMiddleware.ValidateUserWithCode], controller.resetPassword);
        auth.post("/validate-email", [AuthMiddleware.ValidateUserWithCode], controller.validateEmail);

        return auth;
    }
}