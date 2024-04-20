import { DtoValidation } from "../../validations/dto.validation";

export interface PropsInformation {
    id?: string,
    id_user?: string
}

export class InformationDto {
    public id: string;
    public id_user: string;
    constructor(props: PropsInformation) {
        this.id = props.id!;
        this.id_user = props.id_user!;
    }

    static create(object: Record<string, any>) {
        const id = object.id && DtoValidation.get(object.id, "Id").asString().value();
        const id_user = object.id_user && DtoValidation.get(object.id_user, "Id_user").asString().value();
        return new InformationDto({ id, id_user });
    }

}