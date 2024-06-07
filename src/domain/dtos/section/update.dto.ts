import { Field, VisibilityType } from "../../entities/section.entity";
import { ResponseError } from "../../errors/response.error";
import * as DtoValidation from "../../validations/dto.validation";
import { InformationDto, PropsInformation } from "../shared/information.dto";
import { SectionUtils } from "./utils";

interface Props extends PropsInformation {
	name: string;
	visibility: VisibilityType
	fields: Field[];
	moderators: string[];
}

export class UpdateSectionDto extends InformationDto {
	readonly name: string;
	readonly visibility: VisibilityType;
	readonly fields: Field[];
	readonly moderators: string[];

	constructor(props: Props) {
		super(props);
		this.name = props.name;
		this.visibility = props.visibility;
		this.fields = props.fields;
		this.moderators = props.moderators;
	}

	get values() {
		const obj: Record<string, any> = {};
		if (this.name) obj.name = this.name;
		if (this.visibility) obj.visibility = this.visibility;
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
		let visibility;
		if (object.visibility) {
			visibility = object.visibility && DtoValidation.asBoolean(object.visibility, "Public").value()
			if (!(visibility in VisibilityType)) throw ResponseError.badRequest({ visibility: `The value is not valid of types ${Object.values(VisibilityType).toString()}` });
		}
		const fields =
			object.fields &&
			SectionUtils.ValidatePropertiesOfFields(object.fields, "Fields");

		return new UpdateSectionDto({ id, id_user, name, fields, moderators, visibility: visibility as VisibilityType });
	}
}
