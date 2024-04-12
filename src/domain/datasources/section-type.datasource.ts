import { SectionTypeEntity } from "../entities/section-type.entity";

export interface SectionTypeDatasource {
    getAll: () => Promise<SectionTypeEntity[]>
    create: () => Promise<SectionTypeEntity>
}