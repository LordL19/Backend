import {
	type CreateSectionDto,
	type ISectionDatasource,
	type InformationDto,
	KeysFieldType,
	Pagination,
	type PaginationDto,
	Type,
	type UpdateSectionDto,
} from "../../domain";
import type { UserService } from "./user.service";

export class SectionService {
	constructor(
		private readonly datasource: ISectionDatasource,
		private readonly service: UserService,
	) { }

	async getAll(pagination: PaginationDto, idUser: string) {
		const user = idUser ? await this.service.getById({ id: idUser } as InformationDto) : null
		const filter: Record<string, any> = {
			id_parent: null
		};
		if (!user) {
			filter.public = true;
		} else if (user.getId && user.getType !== Type.student) {
			filter.$or = [
				{ id_user: idUser },
				{ moderators: { $in: [idUser] } }
			];
		};
		const [total, data] = await Promise.all([
			this.datasource.getAllCount(filter),
			this.datasource.getAll(pagination, filter),
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
