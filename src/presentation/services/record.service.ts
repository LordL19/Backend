import {
	CreateRecordDto,
	InformationDto,
	IRecordDatasource,
	Pagination,
	PaginationDto,
	UpdateRecordDto,
} from "../../domain";
import { SectionService } from "./section.service";

export class RecordService {
	constructor(
		private readonly datasource: IRecordDatasource,
		private readonly service: SectionService,
	) {}

	async getAll(pagination: PaginationDto, information: InformationDto) {
		const section = await this.service.getById(information);
		const [limit, records] = await Promise.all([
			this.datasource.getAllCount(section),
			this.datasource.getAll(pagination, section),
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
