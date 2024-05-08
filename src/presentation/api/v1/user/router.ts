import { Router } from "express";
import { Services } from "../../../services/services";
import { UserController } from "./controller";

export class UserRouter {
	static get routes() {
		const user = Router();
		const controller = new UserController(Services.user);

		user.get("/search", controller.getAll);
		user.get("/profile", controller.getById);
		user.put("/profile", controller.update);
		user.delete("/profile", controller.delete);

		user.get("/:id", controller.delete);

		return user;
	}
}
