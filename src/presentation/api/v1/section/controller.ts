import { Request, Response, NextFunction } from "express";
import { Services } from "../../../services/services";
import { SendChatView } from "../../../views/send-chat.view";
import { CreateSectionDto, InformationDto, PaginationDto, UpdateSectionDto } from "../../../../domain";
import { SectionService } from "../../../services/section.service";

export class SectionController {
    constructor(
        private readonly service: SectionService
    ) { }

    getAll = (req: Request, res: Response, next: NextFunction) => {
        const pagination = PaginationDto.create(req.query);
        this.service.getAll(pagination, req.body.id_user)
            .then(result => res.json(result))
            .catch(e => next(e))
    }

    getByID = (req: Request, res: Response, next: NextFunction) => {
        const information = InformationDto.create(req.params);
        this.service.getByID(information)
            .then(result => res.json(result))
            .catch(e => next(e))
    }

    create = (req: Request, res: Response, next: NextFunction) => {
        const createSection = CreateSectionDto.create(req.body);
        this.service.create(createSection)
            .then(result => res.json(result))
            .catch(e => next(e))
    }

    update = (req: Request, res: Response, next: NextFunction) => {
        const updateSection = UpdateSectionDto.create({ ...req.body, id: req.params.id });
        this.service.update(updateSection)
            .then(result => res.json(result))
            .catch(e => next(e))
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        const information = InformationDto.create(req.params)
        this.service.delete(information)
            .then(() => res.json({ message: "Deleted!" }))
            .catch(e => next(e))
    }

    sendChat = (req: Request, res: Response, next: NextFunction) => {
        const { user, chat } = req.body
        if (!user) return res.json({ error: { user: "Information of user is required" } })
        if (!chat) return res.json({ error: { user: "Information of chat is required" } })
        const html = SendChatView.create({ user, chat });
        Services.email.sendEmail({
            to: "mlk6000239@est.univalle.edu",
            html,
            subject: "Servicio de asistente virtual"
        })
        res.json({ message: "The chat was sent successfully." })
    }
}