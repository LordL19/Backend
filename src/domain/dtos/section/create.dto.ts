import { Field } from "../../entities/section.entity";
import { DtoValidation } from "../../validations/dto.validation";
import { InformationDto, PropsInformation } from "../shared/information.dto";
import { SectionUtils } from "./utils";

interface Props extends PropsInformation {
	id_parent: string;
	public: boolean;
	name: string;
	fields: Field[];
}

export class CreateSectionDto extends InformationDto {
	readonly name: string;
	readonly public: boolean;
	readonly id_parent: string | null;
	readonly fields: Field[];

	constructor(props: Props) {
		super(props);
		this.name = props.name;
		this.fields = props.fields;
		this.id_parent = props.id_parent || null;
		this.public = props.public;
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
		const publicSection = object.public ? DtoValidation.asBoolean(object.public, "public").value() : false;
		const fields = SectionUtils.ValidatePropertiesOfFields(object.fields, "Fields");
		return new CreateSectionDto({ name, fields, id_user, id_parent, public: publicSection });
	}
}
