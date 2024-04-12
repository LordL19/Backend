import { DtoValidation } from "../../validations/dto.validation";

interface Props {
    id: string,
    name: string,
    last_name: string,
}

export class UpdateUserDto {
    readonly id: string;
    readonly name: string;
    readonly last_name: string;

    constructor(props: Props) {
        this.id = props.id;
        this.name = props.name;
        this.last_name = props.last_name;
    }

    get values() {
        const obj: { [key: string]: any } = {};

        if (this.name) obj.name = this.name;
        if (this.last_name) obj.last_name = this.last_name;

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

        return new UpdateUserDto({ id, name: name!, last_name: last_name! });
    }
}