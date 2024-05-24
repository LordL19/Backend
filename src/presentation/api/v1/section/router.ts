import { Router } from "express";
import { SectionMiddleware } from "../../../middlewares/section.middleware";
import { Services } from "../../../services/services";
import { SectionController } from "./controller";
import { RecordController } from "../record/controller";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
export class SectionRouter {
	static get routes() {
		const controller = new SectionController(Services.section);
		const recordController = new RecordController(Services.record);
		const section = Router();

		section.get("/", [AuthMiddleware.ValidateVisit], controller.getAll);
		section.get("/types", [AuthMiddleware.ValidateUser], controller.getTypes);
		section.get("/:id", [AuthMiddleware.ValidateUser], controller.getByID);
		section.get("/:id/records", [AuthMiddleware.ValidateVisit], recordController.getAll);

		section.use(AuthMiddleware.ValidateUser);
		section.post("/", controller.create);

		section.put(
			"/:id",
			[SectionMiddleware.validationOfUser],
			controller.update,
		);
		section.delete(
			"/:id",
			[SectionMiddleware.validationOfUser],
			controller.delete,
		);

		return section;
	}
}
