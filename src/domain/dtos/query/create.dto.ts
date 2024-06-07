import * as DtoValidation from "../../validations/dto.validation";

interface Props {
	data: Record<string, string>;
	id_section: string;
}

export class CreateQueryDto {
	readonly data: Record<string, string>;
	readonly id_section: string;
	private constructor(props: Props) {
		this.data = props.data;
		this.id_section = props.id_section;
	}

	static create(object: Record<string, any>): CreateQueryDto {
		const id_section = DtoValidation.get(object.id_section, "Id_section").required().asString().value();
		const data = DtoValidation.get(object.data, "Data").asObject().value();
		return new CreateQueryDto({ data, id_section });
	}
}
