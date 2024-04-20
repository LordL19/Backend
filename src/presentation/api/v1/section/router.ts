import { Router } from "express";
import { SectionController } from "./controller"
import { Services } from "../../../services/services";
export class SectionRouter {
    static get routes() {
        const controller = new SectionController(Services.section);
        const section = Router()

        section.get("/", controller.getAll)
        section.get("/:id", controller.getByID)

        section.post("/", controller.create)
        section.post("/send-chat", controller.sendChat)

        section.put("/:id", controller.update)
        section.delete("/:id", controller.delete)

        return section;
    }
}