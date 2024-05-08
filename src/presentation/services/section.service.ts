import {
	type CreateSectionDto,
	type ISectionDatasource,
	type InformationDto,
	KeysFieldType,
	Pagination,
	type PaginationDto,
	type UpdateSectionDto,
} from "../../domain";
import type { UserService } from "./user.service";

export class SectionService {
	constructor(
		private readonly datasource: ISectionDatasource,
		private readonly service: UserService,
	) {}

	async getAll(pagination: PaginationDto, idUser: string) {
		const user = await this.service.getById({ id: idUser } as InformationDto);
		const [total, data] = await Promise.all([
			this.datasource.getAllCount(user),
			this.datasource.getAll(pagination, user),
		]);
		return Pagination.create(pagination, "sections", total, data);
	}

	getTypes() {
		return KeysFieldType;
	}

	async getById(information: InformationDto) {
		return this.datasource.getById(information.id);
	}

	async getChildById(pagination: PaginationDto, information: InformationDto) {
		const [section, childs] = await Promise.all([
			this.getById(information),
			this.datasource.getAllChild(pagination, information.id),
		]);
		return {
			...section,
			subsections: childs,
		};
	}

	create(sectionDto: CreateSectionDto) {
		return this.datasource.create(sectionDto);
	}

	async update(sectionDto: UpdateSectionDto) {
		return this.datasource.update(sectionDto);
	}

	delete(information: InformationDto) {
		return this.datasource.delete(information.id);
	}
}
