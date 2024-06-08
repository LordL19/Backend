import {
	type CreateSectionDto,
	type ISectionDatasource,
	type InformationDto,
	KeysFieldType,
	Pagination,
	type PaginationDto,
	Type,
	type UpdateSectionDto,
	UserEntity,
	VisibilityType,
} from "../../domain";
import type { UserService } from "./user.service";

export class SectionService {
	constructor(
		private readonly datasource: ISectionDatasource,
		private readonly service: UserService,
	) { }

	private buildFilter(user: UserEntity | null) {
		const filter: Record<string, any> = {
			id_parent: null,
			active: true
		};
		if (!user) {
			filter.visibility = VisibilityType.all;
			return filter;
		}
		switch (user.getType) {
			case Type.student:
				filter.visibility = {
					$ne: VisibilityType.administration
				}
				break;
			case Type.moderator:
			case Type.administrator:
				filter.$or = [
					{ visibility: { $in: [VisibilityType.all, VisibilityType.students] } },
					{ id_user: user.getId },
					{
						visibility: VisibilityType.administration,
						moderators: { $in: [user.getId] }
					}
				];
				break;
		}
		return filter;
	}

	async getAll(pagination: PaginationDto, idUser: string) {
		const user = idUser ? await this.service.getById(idUser) : null
		const filter = this.buildFilter(user);
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

	async getModerators(information: InformationDto) {
		const section = await this.datasource.getById(information.id);
		return { moderators: section.getModerators }
	}

	create(sectionDto: CreateSectionDto) {
		return this.datasource.create(sectionDto);
	}

	addModerators(moderatos: string[], id: string) {
		return this.datasource.addModerators(moderatos, id);
	}

	update(sectionDto: UpdateSectionDto) {
		return this.datasource.update(sectionDto);
	}

	delete(information: InformationDto) {
		return this.datasource.delete(information.id);
	}

	deleteModerators(moderatos: string[], id: string) {
		return this.datasource.deleteModerators(moderatos, id);
	}
}
