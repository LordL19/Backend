import { Router } from "express";
import { UserController } from "./controller";
import { Services } from "../../../services/services";

export class UserRouter {
    static get routes() {
        const user = Router();
        const controller = new UserController(Services.user);

        user.get("/profile", controller.getById);
        user.put("/profile", controller.update);
        user.delete("/profile", controller.delete);


        user.get("/search", controller.delete);

        return user;
    }
}
