import { DtoValidation } from "../../validations/dto.validation";
import { InformationDto, PropsInformation } from "../shared/information.dto";

interface Props extends PropsInformation {
	name: string;
	image_url: string,
	last_name: string;
}

export class UpdateUserDto extends InformationDto {
	public name: string;
	public image_url: string;
	public last_name: string;

	constructor(props: Props) {
		super(props);
		this.name = props.name;
		this.image_url = props.image_url;
		this.last_name = props.last_name;
	}

	get values() {
		const obj: Record<string, any> = {};

		if (this.name) obj.name = this.name;
		if (this.image_url) obj.image_url = this.image_url;
		if (this.last_name) obj.last_name = this.last_name;

		return obj;
	}

	static create(object: Record<string, any>): UpdateUserDto {
		const id = DtoValidation.get(object.id_user, "Id")
			.required()
			.asString()
			.value();
		const name = object.name && DtoValidation.get(object.name, "Name").asString().value();
		const image_url = object.image_url && DtoValidation.get(object.image_url, "Image_url").asString().value();
		const last_name = object.last_name && DtoValidation.get(object.last_name, "Last_name").asString().value();

		return new UpdateUserDto({ id, name, last_name, image_url });
	}
}
