import { DtoValidation } from "../../validations/dto.validation";
import {
	InformationDto,
	type PropsInformation,
} from "../shared/information.dto";

interface Props extends PropsInformation {
	password: string;
}

export class ResetPasswordDto extends InformationDto {
	public password: string;

	constructor(props: Props) {
		super(props);
		this.password = props.password;
	}

	static create(object: Record<string, any>) {
		const password = DtoValidation.get(object.password, "Password")
			.required()
			.asPassword(6)
			.value();
		const id = DtoValidation.get(object.id_user, "Id")
			.required()
			.asString()
			.value();
		return new ResetPasswordDto({ password, id });
	}
}
