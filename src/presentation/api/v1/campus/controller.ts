import type { NextFunction, Request, Response } from "express";
import { CreateCampusDto } from "../../../../domain/dtos/campus/create.dto";
import type { CampusService } from "../../../services/campus.service";

export class CampusController {
	constructor(private readonly service: CampusService) { }

	getAll = (_req: Request, res: Response, next: NextFunction) => {
		this.service
			.getAll()
			.then((result) => res.json(result))
			.catch((e) => next(e));
	};

	create = (req: Request, res: Response, next: NextFunction) => {
		const campus = CreateCampusDto.create(req.body);
		this.service
			.create(campus)
			.then((result) => res.json(result))
			.catch((e) => next(e));
	};
}
