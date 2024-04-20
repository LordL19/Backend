import { CodeVerificationDto, CreateUserDto, InformationDto, IUserDatasource, LoginDto, ResponseError, UpdateUserDto, UserEntity } from "../../domain";
import { envs } from "../../config";
import { Bcrypt, Code, Jwt } from "../../helpers";
import { EmailValidationView } from "../views/email-validation.view";
import { ResetPasswordView } from "../views/reset-password.view";
import { EmailService } from "./email.service";
import { ResetPasswordDto } from "../../domain/dtos/auth/reset-password.dto";

const bcrypt = Bcrypt;
const jwt = Jwt;
const code = Code
const EXPIRE = envs.JWT_EXPIRES_IN;

export enum TypeEmail {
    validationEmail = "Validacion de cuenta",
    resetPassword = "Restablecimiento de contraseña"
}

export class AuthService {
    constructor(
        private readonly datasource: IUserDatasource,
        private readonly emailService: EmailService
    ) { }

    async validateEmail(information: InformationDto) {
        await this.datasource.validateEmail(information.id_user);
        const token = {
            data: await jwt.generateToken({ id: information.id_user }, "10m"),
            expire: new Date(Date.now() + ((Number(EXPIRE.split("")[0])) * 24 * 60 * 60 * 1000))
        }
        return {
            token
        };
    }

    async verifyCode(verification: CodeVerificationDto) {
        const isValidCode = code.verify(verification.code, verification.serverCode);
        if (!isValidCode) throw ResponseError.badRequest({ code: "The code is incorrect." })
        const token = {
            data: await jwt.generateToken({ id: verification.id_user, validatedCode: true }, EXPIRE),
            expire: new Date(Date.now() + (10 * 60 * 1000))
        }
        return {
            token
        }
    }

    async login(loginDto: LoginDto) {
        const user = await this.datasource.getByEmail(loginDto.email);
        const isPassword = await bcrypt.compare(loginDto.password, user.getPassword);
        if (!isPassword) throw ResponseError.badRequest({ password: "The password is incorrect." });
        const token = {
            data: await jwt.generateToken({ id: user.getId }, user.getValidatedEmail ? EXPIRE : "10m"),
            expire: new Date(Date.now() + (user.getValidatedEmail ? ((Number(EXPIRE.split("")[0])) * 24 * 60 * 60 * 1000) : 10 * 60 * 1000))
        }
        return {
            user: {
                name: user.getName,
                email: user.getEmail,
                validated_email: user.getValidatedEmail
            },
            token
        }
    }

    async register(userDto: CreateUserDto) {
        const hashedPassword = await bcrypt.generate(userDto.password);
        const user = await this.datasource.create({ ...userDto, password: hashedPassword });
        const { token, code } = await this.sendCode(user.getEmail, TypeEmail.validationEmail);
        return {
            user: {
                name: user.getName,
                email: user.getEmail
            },
            token,
            code
        }
    }

    async resetPassword(userDto: ResetPasswordDto) {
        userDto.password = await bcrypt.generate(userDto.password);
        await this.datasource.resetPassword(userDto)
        return {
            message: "Password successfully updated."
        }
    }

    async sendCode(email: string, type: TypeEmail) {
        const user = await this.datasource.getByEmail(email);
        const codeGenerated = code.generate()
        switch (type) {
            case TypeEmail.validationEmail:
                this.emailService.sendEmail({ to: user.getEmail, html: EmailValidationView.create({ user, code: codeGenerated }), subject: TypeEmail.validationEmail })
                break;
            case TypeEmail.resetPassword:
                this.emailService.sendEmail({ to: user.getEmail, html: ResetPasswordView.create({ user, code: codeGenerated }), subject: TypeEmail.resetPassword })
                break;
        }
        const [codeJwt, tokenJwt] = await Promise.all([
            Jwt.generateToken({ code: codeGenerated }, "10m"),
            jwt.generateToken({ id: user.getId }, "10m")
        ])
        const expire = new Date(Date.now() + (10 * 60 * 1000)); //10 minutes
        const tokenOutput = { data: tokenJwt, expire }
        const codeOutput = { data: codeJwt, expire }
        return {
            token: tokenOutput,
            code: codeOutput
        }
    }
}