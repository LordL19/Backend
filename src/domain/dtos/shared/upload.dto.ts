import { DtoValidation } from "../../validations/dto.validation";

export interface File {
	folder?: string
	path: string
	name: string,
	type: string
}

export class UploadDto {
	private constructor(readonly file: File) { }

	static create(object: Record<string, any>): UploadDto {
		const name = DtoValidation.get(object.name, "Name").required().asString().value()
		const type = DtoValidation.get(object.type, "Type").required().asString().value()
		const folder = object.folder && DtoValidation.get(object.folder, "Folder").asString().value()
		const path = object.path && DtoValidation.get(object.path, "Path").asString().value()

		return new UploadDto({ name, type, folder, path });
	}
}
