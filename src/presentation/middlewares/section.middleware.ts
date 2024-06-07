import type { NextFunction, Request, Response } from "express";
import { Type, type InformationDto } from "../../domain";
import { Services } from "../services/services";

export class SectionMiddleware {
	static async LoadSectionStructure(req: Request, _res: Response, next: NextFunction) {
		try {
			const section = await Services.section.getById({ id: req.body.id_section } as InformationDto);
			req.body.fields = section.getFields;
			next();
		} catch (e) {
			next(e);
		}
	}

	static async validationOfAdministrator(req: Request, res: Response, next: NextFunction) {
		if (req.body.typeUser !== Type.administrator) return res.status(401).json({ error: { auth: "You don't have permission to perform this action" } })
		next();
	}

	static async validationOfPermits(req: Request, res: Response, next: NextFunction) {
		if (!req.params.id) return res.status(400).json({ error: { id: "Id section is required" } });
		try {
			const section = await Services.section.getById({ id: req.params.id } as InformationDto);
			if (section.getIdUser !== req.body.id_user)
				return res.status(401).json({
					error: {
						auth: "You don't have permission to perform this action",
					},
				});
			next();
		} catch (error) {
			next(error);
		}
	}
}
