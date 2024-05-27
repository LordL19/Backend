import type { NextFunction, Request, Response } from "express";
import { type InformationDto } from "../../domain";
import { Services } from "../services/services";

export class RecordMiddleware {
	static async validationOfUser(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		const id_section: string = req.body.id_section;
		if (!id_section)
			return res
				.status(400)
				.json({ error: { id_section: "Id section is required." } });
		const id_user = req.body.id_user;
		if (!id_user)
			return res
				.status(400)
				.json({ error: { id_user: "Id user is required." } });
		const section = await Services.section.getById({
			id: id_section,
		} as InformationDto);
		if (
			section.getIdUser !== id_user! &&
			!section.getModerators.includes(id_user)
		)
			return res.status(401).json({
				error: {
					user: "You don't have permission to perform this action.",
				},
			});
		next();
	}
}
