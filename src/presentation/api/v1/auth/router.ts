import { Request, Response, Router } from "express";
import { AuthController } from "./controller";
import { Services } from "../../../services/services";
import { CodeVericationMiddleware } from "../../../middlewares/code-verify.middleware";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";

export class AuthRouter {
    static get routes() {
        const controller = new AuthController(Services.auth);
        const auth = Router();
        auth.get("/send-code", [AuthMiddleware.ValidateUser], controller.sendCode);
        
        auth.post("/login", controller.login);
        auth.post("/register", controller.register);
        auth.post("/validate-email", [AuthMiddleware.ValidateUser, CodeVericationMiddleware.ValidateCode], controller.validateEmail);
        
        return auth;
    }
}