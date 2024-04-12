import { Request, Response, NextFunction } from "express";
import { UserService } from "../../../services/user.service";
import { UpdateUserDto } from "../../../../domain";

export class UserController {
    constructor(
        private readonly service: UserService
    ) { }

    getById = (req: Request, res: Response, next: NextFunction) => {
        this.service.getById(req.body.user)
            .then(result => res.json(result))
            .catch(e => next(e));
    }

    update = (req: Request, res: Response, next: NextFunction) => {
        const updateUserDto = UpdateUserDto.create(req.body);
        this.service.update(updateUserDto)
            .then(result => res.json(result))
            .catch(e => next(e));
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        this.service.delete(req.params.id)
            .then(result => res.json(result))
            .catch(e => next(e));
    }
}