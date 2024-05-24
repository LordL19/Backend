import type { NextFunction, Request, Response } from "express";
import { QueryService } from "../../../services/query.service";
import { CreateQueryDto, InformationDto, PaginationDto } from "../../../../domain";

export class QueryController {
	constructor(private readonly service: QueryService) { }

	getAll = (req: Request, res: Response, next: NextFunction) => {
		const pagination = PaginationDto.create(req.query);
		const information = InformationDto.create(req.params);
		this.service
			.getAll(pagination,information)
			.then((result) => res.json(result))
			.catch((e) => next(e));
	};

	create = (req: Request, res: Response, next: NextFunction) => {
		const query = CreateQueryDto.create(req.body);
		this.service
			.create(query)
			.then((result) => res.json(result))
			.catch((e) => next(e));
	};
}
