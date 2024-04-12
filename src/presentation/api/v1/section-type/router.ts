import { Router } from "express";
import { SectionTypeController } from "./controller";
import { SectionTypeService } from "../../../services/section-type.service";

export class SectionTipeRouter {
    static get routes() {
        const controller = new SectionTypeController(new SectionTypeService());
        const sectionType = Router()

        sectionType.get("/", controller.getAll)

        sectionType.post("/send-chat", controller.sendChat)
        return sectionType;
    }
}