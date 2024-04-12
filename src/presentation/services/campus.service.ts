import { CreateCampusDto, ICampusDatasource } from "../../domain";

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