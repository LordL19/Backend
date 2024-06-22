import type { NextFunction, Request, Response } from "express";
import {
	InformationDto,
	PaginationDto,
	SearchDto,
	UpdateUserDto,
} from "../../../../domain";
import type { UserService } from "../../../services/user.service";

export class UserController {
	constructor(private readonly service: UserService) { }

	getAll = (req: Request, res: Response, next: NextFunction) => {
		const pagination = PaginationDto.create(req.query);
		const search = SearchDto.create({ ...req.body, ...req.query });
		this.service
			.getAll(pagination, search)
			.then((result) => res.json(result))
			.catch((e) => next(e));
	};

	getById = (req: Request, res: Response, next: NextFunction) => {
		const { id_user } = InformationDto.create(req.body);
		this.service
			.getById(id_user)
			.then((result) => res.json(result.getBasicData))
			.catch((e) => next(e));
	};

	update = (req: Request, res: Response, next: NextFunction) => {
		const updateUserDto = UpdateUserDto.create(req.body);
		this.service
			.update(updateUserDto)
			.then((result) => res.json(result.getBasicData))
			.catch((e) => next(e));
	};

	delete = (req: Request, res: Response, next: NextFunction) => {
		const { id_user } = InformationDto.create(req.params);
		this.service
			.delete(id_user)
			.then(() => res.json({ message: "resource deleted!" }))
			.catch((e) => next(e));
	};
}
