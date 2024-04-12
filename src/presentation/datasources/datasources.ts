import { CampusDatasource, UserDatasource } from "../../infraestructure"

export class Datasources {
    static get user() {
        return new UserDatasource()
    }

    static get campus() {
        return new CampusDatasource()
    }
}