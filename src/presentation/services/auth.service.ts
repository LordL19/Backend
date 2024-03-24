import { Bcrypt, Jwt, envs } from "../../config";
import { CodeVerificationDto, CreateUserDto, IUserDatasoruce, LoginDto, ResponseError, UserEntity } from "../../domain";
import { Code } from "../../helpers/code-generate";
import { EmailValidationView } from "../views/email-validation.view";
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

    private sendEmail(user: UserEntity, subject: string = "Validacion de cuenta") {
        const { getName: name, getEmail: to } = user;
        const codeVerification = code.generate();
        const html = EmailValidationView.create({ user: name, code: codeVerification })
        this.emailService.sendEmail({
            to,
            subject,
            html
        })
        return codeVerification;
    }

    async validateEmail(verification: CodeVerificationDto) {
        const isValidCode = code.verify(verification.code, verification.serverCode);
        if (!isValidCode) throw ResponseError.badRequest({ code: "Code is incorrect." })
        await this.datasource.validateEmail(verification.user);
        return {
            message: `Email validated successfully`
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.datasource.getByEmail(loginDto.email);
        const isPassword = await bcrypt.compare(loginDto.password, user.getPassword);
        if (!isPassword) throw ResponseError.badRequest({ password: "Incorrect password." });
        if(!user.getValidatedEmail) throw ResponseError.forbidden({validated_email:"Email must be validated"})
        const token = {
            data: await jwt.generateToken({ id: user.getId }, EXPIRE),
            expire: new Date(Date.now() + ((Number(EXPIRE.split("")[0])) * 24 * 60 * 60 * 1000)) //1 Day
        }
        return {
            user: {
                name: user.getName,
                email: user.getEmail
            },
            token
        }
    }

    async register(userDto: CreateUserDto) {
        const hashedPassword = await bcrypt.generate(userDto.password);
        const user = await this.datasource.create({ ...userDto, password: hashedPassword });
        const token = {
            data: await jwt.generateToken({ id: user.getId }, EXPIRE),
            expire: new Date(Date.now() + ((Number(EXPIRE.split("")[0])) * 24 * 60 * 60 * 1000)) //1 Day
        }
        const code = {
            data: await Jwt.generateToken({ code: this.sendEmail(user) }, "5m"), //minutes
            expire: new Date(Date.now() + (5 * 60 * 60 * 1000)) //5 minutes
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

    async sendCode(id: string) {
        const user = await this.datasource.getById(id);
        const code = {
            data: await Jwt.generateToken({ code: this.sendEmail(user) }, "5m"), //minutes
            expire: new Date(Date.now() + (5 * 60 * 1000)) //5 minutes
        }
        return {
            code
        }
    }

}