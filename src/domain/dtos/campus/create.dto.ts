import { DtoValidation } from "../../validations/dto.validation";

export class CreateCampusDto {
	private constructor(readonly name: string) {}

	static create(object: Record<string, any>): CreateCampusDto {
		const name = DtoValidation.get(object.name, "Name")
			.required()
			.asString()
			.value();
		return new CreateCampusDto(name);
	}
}
