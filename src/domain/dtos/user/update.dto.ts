import { DtoValidation } from "../../validations/dto.validation";

interface Props {
    id: string,
    name: string,
    last_name: string,
    email: string,
    password: string,
}

export class UpdateUserDto {
    readonly id: string;
    readonly name: string;
    readonly last_name: string;
    readonly email: string;
    readonly password: string;

    constructor(props: Props) {
        this.id = props.id;
        this.name = props.name;
        this.last_name = props.last_name;
        this.email = props.email;
        this.password = props.password;
    }

    get values() {
        const obj: { [key: string]: any } = {};

        if (this.name) obj.name = this.name;
        if (this.last_name) obj.last_name = this.last_name;
        if (this.email) obj.email = this.email;
        if (this.password) obj.password = this.password;

        return obj;
    }


    static create(object: { [key: string]: any }): UpdateUserDto {
        const id = DtoValidation.get(object.user, "Id").required().value();

        let name: string;
        if (object.name) {
            name = object.name.trim();
        }

        let last_name: string;
        if (object.last_name) {
            last_name = object.last_name.trim();
        }

        let email: string;
        if (object.email) {
            email = DtoValidation.asEmail(object.email).value();
        }

        let password: string;
        if (object.password) {
            password = DtoValidation.asPassword(object.password, 6).value();
        }

        return new UpdateUserDto({ id, name: name!, last_name: last_name!, email: email!, password: password! });
    }
}