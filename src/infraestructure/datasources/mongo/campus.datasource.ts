import { CampusModel } from "../../../data/mongo/models/campus";
import { ResponseError } from "../../../domain";
import { ICampusDatasource } from "../../../domain/datasources/campus.datasource";
import { CreateCampusDto } from "../../../domain/dtos/campus/create.dto";
import { CampusEntity } from "../../../domain/entities/campus.entity";

export class CampusDatasource implements ICampusDatasource {
    async getAll(): Promise<CampusEntity[]> {
        const data = await CampusModel.find();
        return data.map(CampusEntity.fromObject);
    }
    async create(campusDto: CreateCampusDto): Promise<CampusEntity> {
        const campusExist = await CampusModel.findOne({ name: campusDto.name });
        if (campusExist) throw ResponseError.badRequest({ name: `The campus ${campusDto.name} alredy exist.` });
        const campus = await CampusModel.create(campusDto);
        return CampusEntity.fromObject(campus);
    }
}