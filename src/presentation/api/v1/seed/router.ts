import { Request, Response, Router } from "express";
import { Seed } from "../../../../infraestructure";

export class SeedRouter {
    static get routes() {
        const seed = Router();

        seed.get("/", (req: Request, res: Response) => {
            Seed.campus()
                .then(() => res.json({ message: "seeded succefully" }))
        })

        return seed;
    }
}