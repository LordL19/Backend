import { DtoValidation } from "../../validations/dto.validation"

export class CreateCampusDto {
    private constructor(
        readonly name: string
    ) { }

    static create(object: { [key: string]: any }): CreateCampusDto {
        const name = DtoValidation.get(object.name, "Name").required().value();
        return new CreateCampusDto(name);
    }
}