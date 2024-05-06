import { Type } from "../../entities/user.entity";
import { ResponseError } from "../../errors/response.error";
import { DtoValidation } from "../../validations/dto.validation";

interface Props {
    name: string,
    last_name: string
    email: string,
    password: string,
    type: Type
    id_campus: string
}

export class CreateUserDto {
    readonly name: string;
    readonly last_name: string;
    readonly full_name: string;
    readonly email: string;
    readonly password: string;
    readonly type: Type;
    readonly id_campus: string;

    constructor(props: Props) {
        this.name = props.name;
        this.last_name = props.last_name;
        this.email = props.email;
        this.password = props.password;
        this.type = props.type;
        this.id_campus = props.id_campus;
        this.full_name = `${props.name} ${props.last_name}`;
    }

    static create(object: Record<string, any>): CreateUserDto {
        const name = DtoValidation.get(object.name, "Name").required().asString().value();
        const last_name = DtoValidation.get(object.last_name, "Last_name").required().asString().value();
        const email = DtoValidation.get(object.email, "Email").required().asEmail().value();
        const type = DtoValidation.get(object.type, "Type").required().asString().value();
        if (!(type in Type)) throw ResponseError.badRequest({ type: `Type ${type} is not valid for types ${Object.values(Type)}` });
        const id_campus = DtoValidation.get(object.id_campus, "Id_campus").required().asString().value();
        const password = DtoValidation.get(object.password, "Password").required().asPassword(6).value();
        return new CreateUserDto({ name, last_name, email, type: type as Type, password, id_campus });
    }
}