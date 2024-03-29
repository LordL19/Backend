import { Request, Response, NextFunction } from "express";
import { SectionTypeService } from "../../../services/section-type.service";
import { Services } from "../../../services/services";
import { SendChatView } from "../../../views/send-chat.view";

export class SectionTypeController {
    constructor(
        private readonly service: SectionTypeService
    ) { }

    getAll = (req: Request, res: Response, next: NextFunction) => {
    }
    get = (req: Request, res: Response, next: NextFunction) => {
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