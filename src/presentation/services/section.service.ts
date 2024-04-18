import { CreateSectionDto, InformationDto, ISectionDatasource, Pagination, PaginationDto, ResponseError, UpdateSectionDto } from "../../domain";
import { UserService } from "./user.service";

export class SectionService {
    constructor(
        private readonly datasource: ISectionDatasource,
        private readonly service: UserService
    ) { }

    async getAll(pagination: PaginationDto, id_user: string) {
        const user = await this.service.getById(id_user);
        const [total, data] = await Promise.all([
            this.datasource.getAllCount(user),
            this.datasource.getAll(pagination, user)
        ])
        return Pagination.create(pagination, "sections", total, data)
    }

    getByID(information: InformationDto) {
        return this.datasource.getById(information)
    }

    create(sectionDto: CreateSectionDto) {
        return this.datasource.create(sectionDto);
    }

    async update(sectionDto: UpdateSectionDto) {
        const section = await this.datasource.getById(sectionDto);
        if (section.getIdUser !== sectionDto.id_user!) throw ResponseError.unauthorized({ user: "You don't have permission to update this section." });
        return this.datasource.update(sectionDto);
    }

    delete(information: InformationDto) {
        return this.datasource.delete(information);
    }
}