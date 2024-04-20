import { DtoValidation } from "../../validations/dto.validation";
import { InformationDto, PropsInformation } from "../shared/information.dto";

interface Props extends PropsInformation {
    name: string,
    last_name: string,
    password: string
}

export class UpdateUserDto extends InformationDto {
    public name: string;
    public last_name: string;
    public password: string;

    constructor(props: Props) {
        super(props);
        this.name = props.name;
        this.last_name = props.last_name;
        this.password = props.password;
    }

    get values() {
        const obj: Record<string, any> = {};

        if (this.name) obj.name = this.name;
        if (this.last_name) obj.last_name = this.last_name;
        if (this.password) obj.last_name = this.password;

        return obj;
    }


    static create(object: Record<string, any>): UpdateUserDto {
        const id = DtoValidation.get(object.user, "Id").required().asString().value();

        let name: string;
        if (object.name) {
            name = object.name.trim();
        }

        let last_name: string;
        if (object.last_name) {
            last_name = object.last_name.trim();
        }

        let password: string;
        if (object.password) {
            password = object.password.trim();
        }

        return new UpdateUserDto({ id, name: name!, last_name: last_name!, password: password! });
    }
}