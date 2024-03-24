import { ICampusDatasource } from "../../domain/datasources/campus.datasource";
import { CreateCampusDto } from "../../domain/dtos/campus/create.dto";

export class CampusService {
    constructor(
        private readonly datasource: ICampusDatasource
    ) { }

    getAll() {
        return this.datasource.getAll()
    }

    create(campusDto: CreateCampusDto) {
        return this.datasource.create(campusDto);
    }
}