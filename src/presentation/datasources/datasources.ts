import { CampusDatasource, UserDatasource } from "../../infraestructure"
import { SectionDatasource } from "../../infraestructure/datasources/mongo/section.datasource"

export class Datasources {
    static get user() {
        return new UserDatasource()
    }

    static get campus() {
        return new CampusDatasource()
    }

    static get section() {
        return new SectionDatasource()
    }
}