import { ResetPasswordDto } from "../dtos/auth/reset-password.dto";
import { InformationDto } from "../dtos/shared/information.dto";
import { CreateUserDto } from "../dtos/user/create.dto";
import { UpdateUserDto } from "../dtos/user/update.dto";
import { UserEntity } from "../entities/user.entity";


export interface IUserDatasource {
    getById(id: string): Promise<UserEntity>,
    getByEmail(email: string): Promise<UserEntity>,
    validateEmail(id: string): Promise<void>,
    resetPassword(userDto: ResetPasswordDto): Promise<void>,
    create(userDto: CreateUserDto): Promise<UserEntity>,
    update(userDto: UpdateUserDto): Promise<UserEntity>,
    delete(information: InformationDto): Promise<void>
}