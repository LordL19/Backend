import type { CreateSectionDto } from "../dtos/section/create.dto";
import type { UpdateSectionDto } from "../dtos/section/update.dto";
import type { PaginationDto } from "../dtos/shared/pagination.dto";
import type { SectionEntity } from "../entities/section.entity";
import type { UserEntity } from "../entities/user.entity";

export interface ISectionDatasource {
	getAll(pagination: PaginationDto, user: UserEntity): Promise<SectionEntity[]>;
	getAllChild(pagination: PaginationDto, id: string): Promise<SectionEntity[]>;
	getById(id: string): Promise<SectionEntity>;
	getAllCount(user: UserEntity): Promise<number>;
	create(sectionDto: CreateSectionDto): Promise<SectionEntity>;
	update(sectionDto: UpdateSectionDto): Promise<SectionEntity>;
	delete(id: string): Promise<void>;
}
