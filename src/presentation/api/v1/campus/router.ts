import { Router } from "express";
import { Services } from "../../../services/services";
import { CampusController } from "./controller";

export class CampusRouter {
	static get routes() {
		const campus = Router();
		const controller = new CampusController(Services.campus);

		campus.get("/", controller.getAll);

		campus.post("/", controller.create);

		return campus;
	}
}
