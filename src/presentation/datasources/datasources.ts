import { CampusDatasource } from "../../infraestructure/datasources/mongo/campus.datasource";
import { UserDatasource } from "../../infraestructure/datasources/mongo/user.datasource";

export class Datasources {
    static get user() {
        return new UserDatasource()
    }

    static get campus() {
        return new CampusDatasource()
    }
}