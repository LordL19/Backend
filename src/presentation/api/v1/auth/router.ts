import { Router } from "express";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
import { Services } from "../../../services/services";
import { AuthController } from "./controller";

export class AuthRouter {
	static get routes() {
		const controller = new AuthController(Services.auth);
		const auth = Router();

		auth.get("/visit", controller.generateVisitToken);
		auth.get("/logout", controller.logout);

		auth.post("/send-verification-code", controller.sendVerificationCode);
		auth.post("/send-reset-code", controller.sendResetPasswordCode);
		
		auth.post("/login", controller.login);
		auth.post("/register", controller.register);
		
		
		auth.use(AuthMiddleware.VerifyUser);
		auth.get(
			"/validate-email",
			[AuthMiddleware.ValidateUserWithCode],
			controller.validateEmail,
		);
		auth.post(
			"/verify-code",
			[AuthMiddleware.ValidateCode],
			controller.verifyCode,
		);
		auth.post(
			"/reset-password",
			[AuthMiddleware.ValidateUserWithCode],
			controller.resetPassword,
		);

		return auth;
	}
}
