import { DtoValidation } from "../../validations/dto.validation";

interface Props {
	value: string;
}

export class SearchDto {
	readonly value: string;

	constructor(props: Props) {
		this.value = props.value;
	}

	static create(object: Record<string, any>): SearchDto {
		const value =
			object.value &&
			DtoValidation.get(object.value, "Value").asString().value();
		return new SearchDto({ value });
	}
}
