import type { NextFunction, Request, Response } from "express";
import { type InformationDto } from "../../domain";
import { Services } from "../services/services";

export class RecordMiddleware {
	static async validationOfPermits(req: Request, res: Response, next: NextFunction) {
		const id_section: string = req.body.id_section;
		if (!id_section) return res.status(400).json({ error: { id_section: "Id section is required" } });
		const section = await Services.section.getById({ id: id_section } as InformationDto);
		if (section.getIdUser !== req.body.id_user! && !section.getModerators.includes(req.body.id_user))
			return res.status(401).json({
				error: {
					auth: "You don't have permission to perform this action",
				},
			});
		next();
	}
}
