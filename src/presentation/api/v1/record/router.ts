import { Router } from "express";
import { SectionMiddleware } from "../../../middlewares/section.middleware";
import { Services } from "../../../services/services";
import { RecordController } from "./controller";
import { RecordMiddleware } from "../../../middlewares/record.middleware";
export class RecordRouter {
	static get routes() {
		const controller = new RecordController(Services.record);
		const record = Router();

		record.get("/:id", controller.getByID);

		record.post(
			"/",
			[
				SectionMiddleware.LoadSectionStructure,
				RecordMiddleware.validationOfUser,
			],
			controller.create,
		);

		record.put(
			"/:id",
			[
				SectionMiddleware.LoadSectionStructure,
				RecordMiddleware.validationOfUser,
			],
			controller.update,
		);
		record.delete(
			"/:id",
			[RecordMiddleware.validationOfUser],
			controller.delete,
		);

		return record;
	}
}
