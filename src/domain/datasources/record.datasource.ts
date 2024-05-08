import type { CreateRecordDto } from "../dtos/record/create.dto";
import { UpdateRecordDto } from "../dtos/record/update.dto";
import { PaginationDto } from "../dtos/shared/pagination.dto";
import type { RecordEntity } from "../entities/record.entity";
import { SectionEntity } from "../entities/section.entity";

export interface IRecordDatasource {
	getAll(
		paginationDto: PaginationDto,
		section: SectionEntity,
	): Promise<RecordEntity[]>;
	getByID(id: string): Promise<RecordEntity>;
	getAllCount(section: SectionEntity): Promise<number>;
	create(recordDto: CreateRecordDto): Promise<RecordEntity>;
	update(recordDto: UpdateRecordDto): Promise<RecordEntity>;
	delete(id: string): Promise<void>;
}
