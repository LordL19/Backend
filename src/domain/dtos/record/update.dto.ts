import type { Value } from "../../entities/record.entity";
import { DtoValidation } from "../../validations/dto.validation";
import { RecordUtils } from "./utils";

interface Props {
	id: string;
	public: boolean;
	data: Record<string, Value>;
	updated_by: string;
}

export class UpdateRecordDto {
	public readonly id: string;
	public readonly public: boolean;
	public readonly data: Record<string, Value>;
	public readonly updated_by: string;
	public constructor(props: Props) {
		this.id = props.id;
		this.public = props.public;
		this.data = props.data;
		this.updated_by = props.updated_by;
	}

	get values() {
		const obj: Record<string, any> = {};
		if (this.data) obj.data = this.data;
		if (this.public !== undefined && this.public !== null) obj.public = this.public;
		if (this.updated_by) obj.updated_by = this.updated_by;

		return obj;
	}

	static create(object: Record<string, any>) {
		const id = DtoValidation.get(object.id, "Id").asString().value();
		const updated_by = DtoValidation.get(object.id_user, "Id_user")
			.required()
			.asString()
			.value();
		const publicRecord = object.public && DtoValidation.asBoolean(object.public, "Public").value()
		const data =
			object.data &&
			RecordUtils.ValidatePropertiesOfData(
				object.fields,
				DtoValidation.get(object.data, "Data").required().asObject().value(),
			);
		return new UpdateRecordDto({ id, public: publicRecord, data, updated_by });
	}
}
