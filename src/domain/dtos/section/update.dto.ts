import { Field } from "../../entities/section.entity";
import { DtoValidation } from "../../validations/dto.validation";
import { InformationDto, PropsInformation } from "../shared/information.dto";
import { SectionUtils } from "./utils";

interface Props extends PropsInformation {
	name: string;
	public: boolean;
	fields: Field[];
	moderators: string[];
}

export class UpdateSectionDto extends InformationDto {
	readonly name: string;
	readonly public: boolean;
	readonly fields: Field[];
	readonly moderators: string[];

	constructor(props: Props) {
		super(props);
		this.name = props.name;
		this.public = props.public;
		this.fields = props.fields;
		this.moderators = props.moderators;
	}

	get values() {
		const obj: Record<string, any> = {};
		if (this.name) obj.name = this.name;
		if (this.public !== undefined && this.public !== null) obj.public = this.public;
		if (this.fields) obj.fields = this.fields;
		if (this.moderators) obj.moderators = this.moderators;
		if (this.moderators) obj.moderators = this.moderators;

		return obj;
	}

	static create(object: Record<string, any>) {
		const id = DtoValidation.get(object.id, "Id").required().asString().value();
		const id_user =
			object.id_user &&
			DtoValidation.get(object.id_user, "Id_user").asString().value();
		const name =
			object.name && DtoValidation.get(object.name, "Name").asString().value();
		const moderators =
			object.moderators &&
			DtoValidation.get(object.moderators, "Moderators").asArray().value();
		const publicSection = object.public && DtoValidation.asBoolean(object.public, "Public").value()
		const fields =
			object.fields &&
			SectionUtils.ValidatePropertiesOfFields(object.fields, "Fields");

		return new UpdateSectionDto({ id, id_user, name, fields, moderators, public: publicSection });
	}
}
