import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../../services/auth.service";
import { CodeVerificationDto, CreateUserDto, LoginDto, ResponseError } from "../../../../domain";

export class AuthController {
    constructor(
        private readonly service: AuthService
    ) { }

    login = (req: Request, res: Response, next: NextFunction) => {
        const loginDto = LoginDto.create(req.body);
        this.service.login(loginDto)
            .then(result => {
                res.cookie("token", result.token.data, { httpOnly: true, expires: result.token.expire })
                const { user, token: { data } } = result;
                res.json({ user, token: data })
            })
            .catch(e => next(e));
    }

    logout = (req: Request, res: Response) => {
        res.clearCookie("token");
        res.clearCookie("code")
        res.json({ message: "Session successfully closed." })
    }

    validateEmail = (req: Request, res: Response, next: NextFunction) => {
        const codeVerification = CodeVerificationDto.create(req.body);
        this.service.validateEmail(codeVerification)
            .then(result => res.json(result))
            .catch(e => next(e));
    }

    register = (req: Request, res: Response, next: NextFunction) => {
        const userDto = CreateUserDto.create(req.body);
        this.service.register(userDto)
            .then(result => {
                res.cookie("token", result.token.data, { httpOnly: true, expires: result.token.expire })
                res.cookie("code", result.code.data, { httpOnly: true, expires: result.code.expire })
                const { user, token: { data } } = result;
                res.json({ user, token: data })
            })
            .catch(e => next(e));
    }

    sendCode = (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;
        this.service.sendCode(email)
            .then(result => {
                res.cookie("code", result.code.data, { httpOnly: true, expires: result.code.expire })
                res.cookie("token", result.token.data, { httpOnly: true, expires: result.token.expire })
                res.json({ message: "The code was sent successfully." })
            })
            .catch(e => next(e));
    }
}