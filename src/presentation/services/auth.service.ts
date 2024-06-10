import { envs } from "../../config";
import {
	type CodeVerificationDto,
	type CreateUserDto,
	type IUserDatasource,
	type InformationDto,
	type LoginDto,
	ResponseError,
} from "../../domain";
import type { ResetPasswordDto } from "../../domain/dtos/auth/reset-password.dto";
import { Bcrypt, Code, Jwt } from "../../helpers";
import { EmailValidationView } from "../views/email-validation.view";
import { ResetPasswordView } from "../views/reset-password.view";
import type { EmailService } from "./email.service";

const bcrypt = Bcrypt;
const jwt = Jwt;
const code = Code;
const EXPIRE = envs.JWT_EXPIRES_IN;

export enum TypeEmail {
	validationEmail = "Validacion de cuenta",
	resetPassword = "Restablecimiento de contraseña",
}

export class AuthService {
	constructor(
		private readonly datasource: IUserDatasource,
		private readonly emailService: EmailService,
	) { }

	async validateEmail(information: InformationDto) {
		const type = await this.datasource.validateEmail(information.id_user);
		const token = {
			data: await jwt.generateToken(
				{
					id: information.id_user,
					type,
					validatedEmail: true
				},
				EXPIRE,
			),
			expire: new Date(Date.now() + Number(EXPIRE)),
		};
		return {
			token,
		};
	}

	async verifyCode(verification: CodeVerificationDto) {
		const isValidCode = code.verify(verification.code, verification.serverCode);
		if (!isValidCode)
			throw ResponseError.badRequest({ code: "The code is incorrect" });
		const token = {
			data: await jwt.generateToken({
				id: verification.id_user,
				validatedCode: true,
			}),
			expire: new Date(Date.now() + 10 * 60 * 1000),
		};
		return {
			token,
		};
	}
	async login(loginDto: LoginDto) {
		const user = await this.datasource.getByEmail(loginDto.email);
		const isPassword = await bcrypt.compare(
			loginDto.password,
			user.getPassword,
		);
		if (!isPassword)
			throw ResponseError.badRequest({
				password: "The password is incorrect",
			});
		const token = {
			data: await jwt.generateToken(
				{
					id: user.getId,
					type: user.getType,
					validatedEmail: user.getValidatedEmail
				},
				user.getValidatedEmail ? EXPIRE : "10m",
			),
			expire: new Date(
				Date.now() + (user.getValidatedEmail ? Number(EXPIRE) : 10 * 60 * 1000),
			),
		};
		return {
			type: user.getType,
			validatedEmail: user.getValidatedEmail,
			token,
		};
	}

	async register(userDto: CreateUserDto) {
		const hashedPassword = await bcrypt.generate(userDto.password);
		const user = await this.datasource.create({
			...userDto,
			password: hashedPassword,
		});
		const { token, code } = await this.sendCode(
			user.getEmail,
			TypeEmail.validationEmail,
		);
		return {
			type: user.getType,
			token,
			code,
		};
	}

	async resetPassword(userDto: ResetPasswordDto) {
		userDto.password = await bcrypt.generate(userDto.password);
		await this.datasource.resetPassword(userDto);
		return {
			message: "Password successfully updated",
		};
	}

	async sendCode(email: string, type: TypeEmail) {
		const user = await this.datasource.getByEmail(email);
		const codeGenerated = code.generate();
		switch (type) {
			case TypeEmail.validationEmail:
				this.emailService.sendEmail({
					to: user.getEmail,
					html: EmailValidationView.create({ user, code: codeGenerated }),
					subject: TypeEmail.validationEmail,
				});
				break;
			case TypeEmail.resetPassword:
				this.emailService.sendEmail({
					to: user.getEmail,
					html: ResetPasswordView.create({ user, code: codeGenerated }),
					subject: TypeEmail.resetPassword,
				});
				break;
		}
		const [codeJwt, tokenJwt] = await Promise.all([
			Jwt.generateToken({ code: codeGenerated }),
			jwt.generateToken({
				id: user.getId,
				validatedEmail: user.getValidatedEmail,
			}),
		]);
		const expire = new Date(Date.now() + 10 * 60 * 1000); //10 minutes
		const tokenOutput = { data: tokenJwt, expire };
		const codeOutput = { data: codeJwt, expire };
		return {
			token: tokenOutput,
			code: codeOutput,
		};
	}

	async visitToken() {
		const token = {
			data: await jwt.generateToken({ visit: true }, "1h"),
			expire: new Date(Date.now() + 1 * 60 * 60 * 1000) //1 hour
		}
		return token;
	}
}
