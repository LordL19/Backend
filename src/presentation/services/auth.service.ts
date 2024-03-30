import { Bcrypt, Jwt, envs } from "../../config";
import { CodeVerificationDto, CreateUserDto, IUserDatasoruce, LoginDto, ResponseError, UserEntity } from "../../domain";
import { Code } from "../../helpers/code-generate";
import { EmailValidationView } from "../views/email-validation.view";
import { ResetPasswordView } from "../views/reset-password.view";
import { EmailService } from "./email.service";

const bcrypt = Bcrypt;
const jwt = Jwt;
const code = Code
const EXPIRE = envs.JWT_EXPIRES_IN;

export class AuthService {
    constructor(
        private readonly datasource: IUserDatasoruce,
        private readonly emailService: EmailService
    ) { }

    private sendEmailToVerifyCode(user: UserEntity, type: "resetPassword" | "validateEmail", subject: string = "Validacion de cuenta") {
        const { getName: name, getEmail: to } = user;
        const codeVerification = code.generate();
        const html = type === "validateEmail"
            ? EmailValidationView.create({ user: name, code: codeVerification })
            : ResetPasswordView.create({ user: name, code: codeVerification })
        this.emailService.sendEmail({
            to,
            subject,
            html
        })
        return codeVerification;
    }

    private vericationCode(verification: CodeVerificationDto) {
        const isValidCode = code.verify(verification.code, verification.serverCode);
        if (!isValidCode) throw ResponseError.badRequest({ code: "The code is incorrect." })
    }

    async validateEmail(verification: CodeVerificationDto) {
        this.vericationCode(verification);
        this.datasource.validateEmail(verification.user);
        const user = await this.datasource.getById(verification.user);
        const token = {
            data: await jwt.generateToken({ id: user.getId }, EXPIRE),
            expire: new Date(Date.now() + ((Number(EXPIRE.split("")[0])) * 24 * 60 * 60 * 1000)) //1 Day
        }
        return {
            token
        };
    }

    async verifyCode(verification: CodeVerificationDto) {
        this.vericationCode(verification);
        const user = await this.datasource.getById(verification.user);
        const token = {
            data: await jwt.generateToken({ id: user.getId, validatedCode: true }, EXPIRE),
            expire: new Date(Date.now() + ((Number(EXPIRE.split("")[0])) * 24 * 60 * 60 * 1000)) //1 Day
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
        const expire = new Date(Date.now() + (10 * 60 * 1000)); //10 minutes
        const token = {
            data: await jwt.generateToken({ id: user.getId }, "10m"),
            expire
        }
        const code = {
            data: await Jwt.generateToken({ code: this.sendEmailToVerifyCode(user, "validateEmail") }, "10m"),
            expire
        }
        return {
            user: {
                name: user.getName,
                email: user.getEmail
            },
            token,
            code
        }
    }

    async resetPassword({ user, password }: { user: string, password: string }) {
        const hashedPassword = await bcrypt.generate(password);
        await this.datasource.resetPassword({ user, password: hashedPassword })
        return {
            message: "Password successfully updated."
        }
    }

    async sendCode(email: string) {
        const user = await this.datasource.getByEmail(email);
        const expire = new Date(Date.now() + (10 * 60 * 1000)); //10 minutes
        const token = {
            data: await jwt.generateToken({ id: user.getId }, "10m"),
            expire
        }
        const code = {
            data: await Jwt.generateToken({ code: this.sendEmailToVerifyCode(user, "validateEmail") }, "10m"),
            expire
        }
        return {
            token,
            code
        }
    }

    async sendResetPassword(email: string) {
        if (!email) throw ResponseError.badRequest({ email: "Email is required." })
        const user = await this.datasource.getByEmail(email);
        const expire = new Date(Date.now() + (10 * 60 * 1000)); //10 minutes
        const token = {
            data: await jwt.generateToken({ id: user.getId }, "10m"),
            expire
        }
        const code = {
            data: await Jwt.generateToken({ code: this.sendEmailToVerifyCode(user, "resetPassword", "Restablecimiento de contraseña") }, "10m"),
            expire
        }
        return {
            token,
            code
        }
    }

}