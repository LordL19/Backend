import { DtoValidation } from "../../validations/dto.validation";

export class LoginDto {
	private constructor(
		readonly email: string,
		readonly password: string,
	) {}

	static create(object: Record<string, any>) {
		const email = DtoValidation.get(object.email, "Email")
			.required()
			.asEmail()
			.value();
		const password = DtoValidation.get(object.password, "Password")
			.required()
			.asPassword(6)
			.value();
		return new LoginDto(email, password);
	}
}
