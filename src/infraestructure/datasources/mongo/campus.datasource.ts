import { CampusModel } from "../../../data";
import {
	CampusEntity,
	type CreateCampusDto,
	type ICampusDatasource,
	ResponseError,
} from "../../../domain";

export class CampusDatasource implements ICampusDatasource {
	async getAll(): Promise<CampusEntity[]> {
		const data = await CampusModel.find();
		return data.map(CampusEntity.fromObject);
	}
	async create(campusDto: CreateCampusDto): Promise<CampusEntity> {
		const campusExist = await CampusModel.findOne({ name: campusDto.name });
		if (campusExist)
			throw ResponseError.badRequest({
				name: `The campus ${campusDto.name} alredy exist`,
			});
		const campus = await CampusModel.create(campusDto);
		return CampusEntity.fromObject(campus);
	}
}
