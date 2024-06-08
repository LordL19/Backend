import { Router } from "express";
import { Services } from "../../../services/services";
import { StorageController } from "./controller";
import { RecordMiddleware } from "../../../middlewares/record.middleware";

export class StorageRouter {
	static get routes() {
		const storage = Router();
		const controller = new StorageController(Services.storage);
		storage.post("/", controller.generate);

		storage.post("/sections", [RecordMiddleware.validationOfPermits], controller.generate);

		return storage;
	}
}
