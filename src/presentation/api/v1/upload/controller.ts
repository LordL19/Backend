import type { NextFunction, Request, Response } from "express";
import { StorageService } from "../../../services/storage.service";
import { UploadDto } from "../../../../domain";

export class StorageController {
	constructor(private readonly service: StorageService) {}

	generate = (req: Request, res: Response, next: NextFunction) => {
		const fileUpload = UploadDto.create(req.body);
		this.service
			.generateUrlToUpload(fileUpload)
			.then((result) => res.json(result))
			.catch((e) => next(e));
	};
}
