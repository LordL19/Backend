import { SectionModel } from "../../../data";
import { CreateSectionDto, ISectionDatasource, PaginationDto, ResponseError, SectionEntity, UpdateSectionDto, UserEntity } from "../../../domain";
import { InformationDto } from "../../../domain/dtos/shared/information.dto";

export class SectionDatasource implements ISectionDatasource {

    private async existsSectionWithId(id: string) {
        const user = await SectionModel.findById(id)
        if (!user) throw ResponseError.notFound({ section: `Section with id ${id} not found.` });
    }

    private async existsSectionWithName(name: string) {
        const user = await SectionModel.findOne({ name })
        if (user) throw ResponseError.notFound({ section: `Section with name ${name} alredy exists.` });
    }

    async getAll(pagination: PaginationDto, user: UserEntity): Promise<SectionEntity[]> {
        const sections = await SectionModel.find({ id_user: user.getId })
            .skip((pagination.page - 1) * pagination.limit)
            .limit(pagination.limit)
        return sections.map(SectionEntity.fromObject);
    }

    async getById(information: InformationDto): Promise<SectionEntity> {
        const section = await SectionModel.findById(information.id);
        if (!section) throw ResponseError.notFound({ section: `Section with id ${information.id} not found.` })
        return SectionEntity.fromObject(section);
    }

    getAllCount(user: UserEntity): Promise<number> {
        return SectionModel.find({ id_user: user.getId }).countDocuments();
    }

    async create(sectionDto: CreateSectionDto): Promise<SectionEntity> {
        await this.existsSectionWithName(sectionDto.name);
        const section = await SectionModel.create(sectionDto);
        return SectionEntity.fromObject(section);
    }

    async update(sectionDto: UpdateSectionDto): Promise<SectionEntity> {
        await this.existsSectionWithId(sectionDto.id);
        const sectionUpdate = await SectionModel.findByIdAndUpdate(sectionDto.id, sectionDto.values, { returnDocument: "after" });
        return SectionEntity.fromObject(sectionUpdate!);
    }

    async delete(information: InformationDto): Promise<void> {
        await this.existsSectionWithId(information.id);
        await SectionModel.updateOne({ _id: information.id }, { active: false });
    }

}