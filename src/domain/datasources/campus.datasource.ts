import { CreateCampusDto } from "../dtos/campus/create.dto";
import { CampusEntity } from "../entities/campus.entity";

export interface ICampusDatasource {
    getAll(): Promise<CampusEntity[]>,
    create(campusDto: CreateCampusDto): Promise<CampusEntity>
}