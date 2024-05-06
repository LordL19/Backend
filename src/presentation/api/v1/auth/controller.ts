import { CodeVerificationDto, CreateUserDto, DtoValidation, InformationDto, LoginDto, UpdateUserDto } from "../../../../domain";
import { NextFunction, Request, Response } from "express";
import { AuthService, TypeEmail } from "../../../services/auth.service";
import { ResetPasswordDto } from "../../../../domain/dtos/auth/reset-password.dto";

export class AuthController {
    constructor(
        private readonly service: AuthService
    ) { }

    private sendCode(type: TypeEmail, req: Request, res: Response, next: NextFunction) {
        const email = DtoValidation.get(req.body.email, "Email").required().asString().value();
        this.service.sendCode(email, type)
            .then(result => {
                res.cookie("code", result.code.data, { httpOnly: true, expires: result.code.expire })
                res.cookie("token", result.token.data, { httpOnly: true, expires: result.token.expire })
                res.json({ message: "The code was sent successfully." })
            })
            .catch(e => next(e));
    }

    logout = (req: Request, res: Response) => {
        res.clearCookie("token");
        res.clearCookie("code")
        res.json({ message: "Session successfully closed." })
    }

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

    sendVerificationCode = (req: Request, res: Response, next: NextFunction) => {
        this.sendCode(TypeEmail.validationEmail, req, res, next);
    }

    sendResetPasswordCode = (req: Request, res: Response, next: NextFunction) => {
        this.sendCode(TypeEmail.resetPassword, req, res, next);
    }

    verifyCode = (req: Request, res: Response, next: NextFunction) => {
        const codeVerification = CodeVerificationDto.create(req.body);
        this.service.verifyCode(codeVerification)
            .then(result => {
                res.clearCookie("code");
                res.cookie("token", result.token.data, { httpOnly: true, expires: result.token.expire })
                res.json({ token: result.token.data })
            })
            .catch(e => next(e));
    }

    validateEmail = (req: Request, res: Response, next: NextFunction) => {
        const information = InformationDto.create(req.body);
        console.log(information)
        this.service.validateEmail(information)
            .then(result => {
                res.cookie("token", result.token.data, { httpOnly: true, expires: result.token.expire })
                res.json({ token: result.token.data })
            })
            .catch(e => next(e));
    }

    resetPassword = (req: Request, res: Response, next: NextFunction) => {
        const resetPassword = ResetPasswordDto.create(req.body);
        this.service.resetPassword(resetPassword)
            .then(result => {
                res.clearCookie("token")
                res.clearCookie("code")
                res.json(result)
            })
            .catch(e => next(e));
    }

}