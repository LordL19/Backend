import { IUserDatasoruce, UpdateUserDto } from "../../domain";

export class UserService {
    constructor(
        private readonly datasource: IUserDatasoruce
    ) { }

    async getById(id: string) {
        const user = await this.datasource.getById(id);
        return user.getData;
    }

    async update(userDto: UpdateUserDto) {
        const user = await this.datasource.update(userDto);
        return user.getData;
    }

    delete(id: string) {
        return this.datasource.delete(id);
    }
}