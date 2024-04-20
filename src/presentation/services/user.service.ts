import { InformationDto, IUserDatasource, UpdateUserDto } from "../../domain";

export class UserService {
    constructor(
        private readonly datasource: IUserDatasource
    ) { }

    getById(id: string) {
        return this.datasource.getById(id);
    }

    update(userDto: UpdateUserDto) {
        return this.datasource.update(userDto);
    }

    delete(information: InformationDto) {
        return this.datasource.delete(information);
    }
}