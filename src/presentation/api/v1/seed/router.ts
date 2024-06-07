import { type Request, type Response, Router } from "express";
import { Seed } from "../../../../infraestructure";

export class SeedRouter {
	static get routes() {
		const seed = Router();

		seed.get("/", (_req: Request, res: Response) => {
			Seed.campus().then(() => res.json({ message: "seeded succefully" }));
		});

		return seed;
	}
}
