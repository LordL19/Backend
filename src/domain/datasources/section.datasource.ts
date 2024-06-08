import type { CreateSectionDto } from "../dtos/section/create.dto";
import type { UpdateSectionDto } from "../dtos/section/update.dto";
import type { PaginationDto } from "../dtos/shared/pagination.dto";
import type { SectionEntity } from "../entities/section.entity";

export interface ISectionDatasource {
	getAll(pagination: PaginationDto, filter: Record<string, any>): Promise<SectionEntity[]>;
	getAllChild(pagination: PaginationDto, id: string): Promise<SectionEntity[]>;
	getById(id: string): Promise<SectionEntity>;
	getAllCount(filter: Record<string, any>): Promise<number>;
	create(sectionDto: CreateSectionDto): Promise<SectionEntity>;
	addModerators(moderators: string[], id: string): Promise<void>;
	update(sectionDto: UpdateSectionDto): Promise<SectionEntity>;
	delete(id: string): Promise<void>;
	deleteModerators(moderators: string[], id: string): Promise<void>;
}
