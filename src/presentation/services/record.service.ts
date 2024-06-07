import {
	CreateRecordDto,
	InformationDto,
	IRecordDatasource,
	Pagination,
	PaginationDto,
	SectionEntity,
	Type,
	UpdateRecordDto,
	UserEntity,
	VisibilityType,
} from "../../domain";
import { SectionService } from "./section.service";
import { UserService } from "./user.service";

export class RecordService {
	constructor(
		private readonly datasource: IRecordDatasource,
		private readonly sectionService: SectionService,
		private readonly userService: UserService,
	) { }

	private buildFilter(user: UserEntity | null, section: SectionEntity) {
		const filter: Record<string, any> = {
			id_section: section.getId
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
				if (section.getIdUser !== user.getId && !section.getModerators.includes(user.getId)) {
					filter.visibility = {
						$ne: VisibilityType.administration
					}
				}
				break;
		}
		return filter;

	}

	async getAll(pagination: PaginationDto, information: InformationDto) {
		const [user, section] = information.id_user
			? await Promise.all([
				this.userService.getById(information.id_user),
				this.sectionService.getById(information)
			])
			: [null, await this.sectionService.getById(information)];
		const filter = this.buildFilter(user, section);
		const [limit, records] = await Promise.all([
			this.datasource.getAllCount(filter),
			this.datasource.getAll(pagination, filter),
		]);
		return Pagination.create(
			pagination,
			`sections/${information.id}/records`,
			limit,
			records,
		);
	}

	getById(information: InformationDto) {
		return this.datasource.getByID(information.id);
	}

	create(recordDto: CreateRecordDto) {
		return this.datasource.create(recordDto);
	}

	update(recordDto: UpdateRecordDto) {
		return this.datasource.update(recordDto);
	}

	delete(information: InformationDto) {
		return this.datasource.delete(information.id);
	}
}
