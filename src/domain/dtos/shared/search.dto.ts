import * as DtoValidation from "../../validations/dto.validation";

interface Props {
	fromUser: string;
	value: string;
}

export class SearchDto {
	readonly fromUser: string;
	readonly value: string;

	constructor(props: Props) {
		this.value = props.value;
		this.fromUser = props.fromUser;
	}

	static create(object: Record<string, any>): SearchDto {
		const value =
			object.value &&
			DtoValidation.get(object.value, "Value").asString().value();
		const fromUser = DtoValidation.get(object.id_user, "Id user").required().asString().value();
		return new SearchDto({ value, fromUser });
	}
}
