import { Field, VisibilityType } from "../../entities/section.entity";
import { ResponseError } from "../../errors/response.error";
import * as DtoValidation from "../../validations/dto.validation";
import { InformationDto, PropsInformation } from "../shared/information.dto";
import { SectionUtils } from "./utils";

interface Props extends PropsInformation {
	id_parent: string;
	name: string;
	fields: Field[];
	visibility: VisibilityType
}

export class CreateSectionDto extends InformationDto {
	readonly name: string;
	readonly id_parent: string | null;
	readonly fields: Field[];
	readonly visibility: VisibilityType;

	constructor(props: Props) {
		super(props);
		this.name = props.name;
		this.fields = props.fields;
		this.id_parent = props.id_parent || null;
		this.visibility = props.visibility;
	}

	static create(object: Record<string, any>) {
		const name = DtoValidation.get(object.name, "Name")
			.required()
			.asString()
			.value();
		const id_user = DtoValidation.get(object.id_user, "Id_user")
			.required()
			.asString()
			.value();
		const id_parent = object.id_parent && DtoValidation.get(object.id_parent, "Id_parent").asString().value();
		const visibility = DtoValidation.get(object.visibility, "Visibility").required().asString().value();
		if (!(visibility in VisibilityType)) throw ResponseError.badRequest({ visibility: `The value is not valid of types ${Object.values(VisibilityType).toString()}` });
		const fields = SectionUtils.ValidatePropertiesOfFields(object.fields, "Fields");
		return new CreateSectionDto({ name, fields, id_user, id_parent, visibility: visibility as VisibilityType });
	}
}
