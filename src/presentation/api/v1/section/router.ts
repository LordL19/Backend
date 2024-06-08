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
		section.get("/:id/moderators", [SectionMiddleware.validationOfAdministrator], controller.getModerators);

		section.post("/", [SectionMiddleware.validationOfAdministrator], controller.create);
		section.post("/:id/moderators", [SectionMiddleware.validationOfAdministrator], controller.addModerators);

		section.put(
			"/:id",
			[SectionMiddleware.validationOfAdministrator, SectionMiddleware.validationOfPermits],
			controller.update,
		);
		section.put("/:id/moderators", [SectionMiddleware.validationOfAdministrator], controller.deleteModerators);
		
		section.delete(
			"/:id",
			[SectionMiddleware.validationOfAdministrator, SectionMiddleware.validationOfPermits],
			controller.delete,
		);

		return section;
	}
}
