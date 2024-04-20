import { CreateSectionDto } from "../dtos/section/create.dto";
import { UpdateSectionDto } from "../dtos/section/update.dto";
import { InformationDto } from "../dtos/shared/information.dto";
import { PaginationDto } from "../dtos/shared/pagination.dto";
import { SectionEntity } from "../entities/section.entity";
import { UserEntity } from "../entities/user.entity";

export interface ISectionDatasource {
    getAll(pagination: PaginationDto, user: UserEntity): Promise<SectionEntity[]>,
    getById(information: InformationDto): Promise<SectionEntity>,
    getAllCount(user: UserEntity): Promise<number>,
    create(sectionDto: CreateSectionDto): Promise<SectionEntity>,
    update(sectionDto: UpdateSectionDto): Promise<SectionEntity>,
    delete(information: InformationDto): Promise<void>
}