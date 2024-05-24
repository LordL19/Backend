import { Router } from "express";
import { Services } from "../../../services/services";
import { StorageController } from "./controller";

export class StorageRouter {
	static get routes() {
		const storage = Router();
		const controller = new StorageController(Services.storage);

		storage.post("/", controller.generate);

		return storage;
	}
}
