import { DtoValidation } from "../../validations/dto.validation";

export class CodeVerificationDto {
    private constructor(
        readonly code: string,
        readonly user: string,
        readonly serverCode: string
    ) { }

    static create(object: { [key: string]: any }) {
        const code = DtoValidation.get(object.code, "Code").required().value();
        const serverCode = DtoValidation.get(object.server_code, "Server_Code").required().value();
        const user = DtoValidation.get(object.user, "User").required().value();
        return new CodeVerificationDto(code, user, serverCode);
    }
}