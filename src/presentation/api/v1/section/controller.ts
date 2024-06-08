import { NextFunction, Request, Response } from "express";
import {
	CreateSectionDto,
	DtoValidation,
	InformationDto,
	PaginationDto,
	UpdateSectionDto,
} from "../../../../domain";
import { SectionService } from "../../../services/section.service";

export class SectionController {
	constructor(private readonly service: SectionService) { }

	getAll = (req: Request, res: Response, next: NextFunction) => {
		const pagination = PaginationDto.create(req.query);
		this.service
			.getAll(pagination, req.body.id_user)
			.then((result) => res.json(result))
			.catch((e) => next(e));
	};

	getTypes = (_req: Request, res: Response) => {
		res.json(this.service.getTypes());
	};

	getByID = (req: Request, res: Response, next: NextFunction) => {
		const pagination = PaginationDto.create(req.query);
		const information = InformationDto.create(req.params);
		this.service
			.getChildById(pagination, information)
			.then((result) => res.json(result))
			.catch((e) => next(e));
	};

	getModerators = (req: Request, res: Response, next: NextFunction) => {
		const information = InformationDto.create(req.params);
		this.service
			.getModerators(information)
			.then((result) => res.json(result))
			.catch((e) => next(e));
	};

	create = (req: Request, res: Response, next: NextFunction) => {
		const createSection = CreateSectionDto.create(req.body);
		this.service
			.create(createSection)
			.then((result) => res.json(result))
			.catch((e) => next(e));
	};

	addModerators = (req: Request, res: Response, next: NextFunction) => {
		const { id } = InformationDto.create(req.params);
		const moderators = DtoValidation.get(req.body.moderators, "Moderators").required().asArray().value()
		this.service
			.addModerators(moderators, id)
			.then(() => res.json({ message: "Moderators successfully added" }))
			.catch((e) => next(e));
	};

	update = (req: Request, res: Response, next: NextFunction) => {
		const updateSection = UpdateSectionDto.create({
			...req.body,
			id: req.params.id,
		});
		this.service
			.update(updateSection)
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

	deleteModerators = (req: Request, res: Response, next: NextFunction) => {
		const { id } = InformationDto.create(req.params);
		const moderators = DtoValidation.get(req.body.moderators, "Moderators").required().asArray().value()
		this.service
			.deleteModerators(moderators, id)
			.then(() => res.json({ message: "Moderators successfully removed" }))
			.catch((e) => next(e));
	};
}
