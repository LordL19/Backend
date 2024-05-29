import type { Value } from "../../entities/record.entity";
import { VisibilityType } from "../../entities/section.entity";
import { ResponseError } from "../../errors/response.error";
import { DtoValidation } from "../../validations/dto.validation";
import { RecordUtils } from "./utils";

interface Props {
	data: Record<string, Value>;
	visibility: VisibilityType;
	created_by: string;
	id_section: string;
	id_campus: string;
}

export class CreateRecordDto {
	private readonly data: Record<string, Value>;
	private readonly visibility: VisibilityType;
	private readonly created_by: string;
	private readonly updated_by: string;
	private readonly id_section: string;
	private readonly id_campus: string;
	private constructor(props: Props) {
		this.data = props.data;
		this.visibility = props.visibility;
		this.created_by = props.created_by;
		this.updated_by = props.created_by;
		this.id_section = props.id_section;
		this.id_campus = props.id_campus;
	}

	static create(object: Record<string, any>) {
		const id_section = DtoValidation.get(object.id_section, "Id_section")
			.required()
			.asString()
			.value();
		const created_by = DtoValidation.get(object.id_user, "Id_user")
			.required()
			.asString()
			.value();
		const id_campus = DtoValidation.get(object.id_campus, "Id_campus")
			.required()
			.asString()
			.value();
		const visibility = DtoValidation.get(object.visibility, "Visibility").required().asString().value();
		if (!(visibility in VisibilityType)) throw ResponseError.badRequest({ visibility: `The value is not valid of types ${Object.values(VisibilityType).toString()}` });
		const data = RecordUtils.ValidatePropertiesOfData(
			object.fields,
			DtoValidation.get(object.data, "Data").required().asObject().value(),
		);
		return new CreateRecordDto({ data, id_campus, id_section, created_by, visibility: visibility as VisibilityType });
	}
}
