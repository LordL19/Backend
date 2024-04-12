import { Router } from "express";
import { CampusController } from "./controller";
import { Services } from "../../../services/services";

export class CampusRouter {
    static get routes() {
        const campus = Router();
        const controller = new CampusController(Services.campus);

        campus.get("/", controller.getAll);

        campus.post("/", controller.create);

        return campus;
    }
}
