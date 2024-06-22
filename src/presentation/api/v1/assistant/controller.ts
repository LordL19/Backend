import { NextFunction, Request, Response } from "express";
import { AssistantService } from "../../../services/assistant.service";
import { DtoValidation } from "../../../../domain";

export class AssistantController {
    constructor(
        private readonly service: AssistantService,
    ) { }

    getAll = (_req: Request, res: Response, next: NextFunction) => {
        this.service.getAll()
            .then(result => res.json(result))
            .catch(e => next(e));
    }

    answerQustion = (req: Request, res: Response, next: NextFunction) => {
        const question = DtoValidation.get(req.body.question, "Question").required().asString().value();
        this.service.answerQuestion(question)
            .then(result => res.json(result))
            .catch(e => next(e));
    }
}