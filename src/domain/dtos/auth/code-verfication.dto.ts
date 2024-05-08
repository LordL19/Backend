import { DtoValidation } from "../../validations/dto.validation";

export class CodeVerificationDto {
	private constructor(
		readonly code: string,
		readonly id_user: string,
		readonly serverCode: string,
	) {}

	static create(object: Record<string, any>) {
		const code = DtoValidation.get(object.code, "Code")
			.required()
			.asString()
			.value();
		const serverCode = DtoValidation.get(object.server_code, "Server_Code")
			.required()
			.asString()
			.value();
		const user = DtoValidation.get(object.id_user, "Id_user")
			.required()
			.asString()
			.value();
		return new CodeVerificationDto(code, user, serverCode);
	}
}
