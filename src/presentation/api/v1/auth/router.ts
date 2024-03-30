import { Router } from "express";
import { AuthController } from "./controller";
import { Services } from "../../../services/services";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";

export class AuthRouter {
    static get routes() {
        const controller = new AuthController(Services.auth);
        const auth = Router();

        auth.get("/logout", controller.logout);
        auth.post("/send-verfication-code", controller.sendVerificationCode);
        auth.post("/send-reset-code", controller.sendResetPassword);
        auth.post("/login", controller.login);
        auth.post("/register", controller.register);
        auth.post("/reset-password", [AuthMiddleware.ValidateResetPassword], controller.resetPassword);
        auth.post("/validate-email", [AuthMiddleware.ValidateUser, AuthMiddleware.ValidateCode], controller.validateEmail);
        auth.post("/verify-code", [AuthMiddleware.ValidateUser, AuthMiddleware.ValidateCode], controller.verifyCode);

        return auth;
    }
}