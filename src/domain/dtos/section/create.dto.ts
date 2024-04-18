import { Field } from "../../entities/section.entity";
import { DtoValidation } from "../../validations/dto.validation";
import { InformationDto, PropsInformation } from "../shared/information.dto";
import { SectionUtils } from "./utils";

interface Props extends PropsInformation {
    name: string,
    fields: Field[]
}

export class CreateSectionDto extends InformationDto {
    readonly name: string;
    readonly fields: Field[];

    constructor(props: Props) {
        super(props);
        this.name = props.name;
        this.fields = props.fields;
    }

    static create(object: Record<string, any>) {
        const name = DtoValidation.get(object.name, "Name").required().asString().value();
        const fields = SectionUtils.ValidatePropertiesOfFields(object.fields, "Fields");
        const id_user = DtoValidation.get(object.id_user, "Id_user").required().asString().value();
        return new CreateSectionDto({ name, fields, id_user })
    }
}