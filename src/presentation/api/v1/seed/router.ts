import { Request, Response, Router } from "express";
import { Seed } from "../../../../infraestructure/seeds/campus.seed";

export class SeedRouter {
    static get routes() {
        const seed = Router();

        seed.get("/", (req: Request, res: Response) => {
            Seed.seedCampus()
                .then(() => res.json({ message: "seeded succefully" }))
        })

        return seed;
    }
}