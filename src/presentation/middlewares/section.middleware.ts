import type { NextFunction, Request, Response } from "express";
import { type InformationDto } from "../../domain";
import { Services } from "../services/services";

export class SectionMiddleware {
	static async LoadSectionStructure(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		const id: string = req.body.id_section;
		if (!id)
			return res
				.status(400)
				.json({ error: { id_section: "Id section is required." } });
		try {
			const section = await Services.section.getById({ id } as InformationDto);
			req.body.fields = section.getFields;
			next();
		} catch (e) {
			next(e);
		}
	}

	static async validationOfUser(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		const id: string = req.params.id;
		if (!id)
			return res.status(400).json({ error: { id: "Id section is required." } });
		const id_user = req.body.id_user;
		if (!id_user)
			return res
				.status(400)
				.json({ error: { id_user: "Id user is required." } });
		const section = await Services.section.getById({ id } as InformationDto);
		if (section.getIdUser !== id_user!)
			return res.status(401).json({
				error: {
					user: "You don't have permission to perform this action.",
				},
			});
		next();
	}
}
