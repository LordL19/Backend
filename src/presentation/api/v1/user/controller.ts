import { Request, Response, NextFunction } from "express";
import { UserService } from "../../../services/user.service";
import { InformationDto, UpdateUserDto } from "../../../../domain";

export class UserController {
    constructor(
        private readonly service: UserService
    ) { }

    getById = (req: Request, res: Response, next: NextFunction) => {
        this.service.getById(req.body.user)
            .then(result => res.json(result.getData))
            .catch(e => next(e));
    }

    update = (req: Request, res: Response, next: NextFunction) => {
        const updateUserDto = UpdateUserDto.create(req.body);
        this.service.update(updateUserDto)
            .then(result => res.json(result.getData))
            .catch(e => next(e));
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        const information = InformationDto.create(req.params)
        this.service.delete(information)
            .then(result => res.json(result))
            .catch(e => next(e));
    }
}