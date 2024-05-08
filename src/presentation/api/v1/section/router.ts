import { Router } from "express";
import { SectionMiddleware } from "../../../middlewares/section.middleware";
import { Services } from "../../../services/services";
import { SectionController } from "./controller";
import { RecordController } from "../record/controller";
export class SectionRouter {
	static get routes() {
		const controller = new SectionController(Services.section);
		const recordController = new RecordController(Services.record);
		const section = Router();

		section.get("/", controller.getAll);
		section.get("/types", controller.getTypes);
		section.get("/:id", controller.getByID);
		section.get("/:id/records", recordController.getAll);

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
