import type { NextFunction, Request, Response } from "express";
import {
	CreateRecordDto,
	InformationDto,
	PaginationDto,
	UpdateRecordDto,
} from "../../../../domain";
import { RecordService } from "../../../services/record.service";

export class RecordController {
	static _recordControllerInstance: RecordController;

	constructor(private readonly service: RecordService) {}

	getAll = (req: Request, res: Response, next: NextFunction) => {
		const pagination = PaginationDto.create(req.query);
		const information = InformationDto.create(req.params);
		this.service
			.getAll(pagination, information)
			.then((result) => res.json(result))
			.catch((e) => next(e));
	};

	getByID = (req: Request, res: Response, next: NextFunction) => {
		const information = InformationDto.create(req.params);
		this.service
			.getById(information)
			.then((result) => res.json(result))
			.catch((e) => next(e));
	};

	create = (req: Request, res: Response, next: NextFunction) => {
		const recordDto = CreateRecordDto.create(req.body);
		this.service
			.create(recordDto)
			.then((result) => res.json(result))
			.catch((e) => next(e));
	};

	update = (req: Request, res: Response, next: NextFunction) => {
		const recordDto = UpdateRecordDto.create({ ...req.body, ...req.params });
		this.service
			.update(recordDto)
			.then((result) => res.json(result))
			.catch((e) => next(e));
	};

	delete = (req: Request, res: Response, next: NextFunction) => {
		const information = InformationDto.create(req.params);
		this.service
			.delete(information)
			.then(() => res.json({ message: "Deleted!" }))
			.catch((e) => next(e));
	};
}
