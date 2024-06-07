import { Router } from "express";
import { SectionMiddleware } from "../../../middlewares/section.middleware";
import { Services } from "../../../services/services";
import { RecordController } from "./controller";
import { RecordMiddleware } from "../../../middlewares/record.middleware";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
export class RecordRouter {
	static get routes() {
		const controller = new RecordController(Services.record);
		const record = Router();

		record.get("/:id", [AuthMiddleware.ValidateVisit], controller.getByID);

		record.use(AuthMiddleware.ValidateUser);
		record.post(
			"/",
			[
				RecordMiddleware.validationOfPermits,
				SectionMiddleware.LoadSectionStructure,
			],
			controller.create,
		);

		record.put(
			"/:id",
			[
				RecordMiddleware.validationOfPermits,
				SectionMiddleware.LoadSectionStructure,
			],
			controller.update,
		);
		record.delete(
			"/:id",
			[RecordMiddleware.validationOfPermits],
			controller.delete,
		);

		return record;
	}
}
