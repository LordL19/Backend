import { CreateUserDto } from "../dtos/user/create.dto";
import { UpdateUserDto } from "../dtos/user/update.dto";
import { UserEntity } from "../entities/user.entity";


export interface IUserDatasoruce {
    getById(id: string): Promise<UserEntity>,
    getByEmail(email: string): Promise<UserEntity>,
    validateEmail(id: string): Promise<void>,
    resetPassword({ user, password }: { user: string, password: string }): Promise<void>,
    create(userDto: CreateUserDto): Promise<UserEntity>,
    update(userDto: UpdateUserDto): Promise<UserEntity>,
    delete(id: string): Promise<boolean>
}