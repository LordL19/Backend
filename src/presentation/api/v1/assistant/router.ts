import { Router } from "express";
import { AssistantController } from "./controller";
import { Services } from "../../../services/services";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
import { SectionMiddleware } from "../../../middlewares/section.middleware";

export class AssistantRouter {
    static get routes() {
        const controller = new AssistantController(Services.assistant);
        const assistant = Router();

        assistant.get("/", [AuthMiddleware.ValidateUser, SectionMiddleware.validationOfAdministrator], controller.getAll); 
        assistant.post("/", [AuthMiddleware.ValidateVisit], controller.answerQustion);

        return assistant;
    }
}