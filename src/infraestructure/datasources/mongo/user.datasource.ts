import { UserModel } from "../../../data";
import { CreateUserDto, IUserDatasource, ResponseError, UpdateUserDto, UserEntity } from "../../../domain";
import { InformationDto } from "../../../domain/dtos/shared/information.dto";

export class UserDatasource implements IUserDatasource {

    private async existsUserWithId(id: string) {
        const user = await UserModel.findById(id)
        if (!user) throw ResponseError.notFound({ user: `User with id ${id} not found.` });
    }

    private async existsUserWithEmail(email: string) {
        const user = await UserModel.findOne({ email })
        if (user) throw ResponseError.notFound({ email: `User with email ${email} alredy exists.` });
    }

    async getById(id: string): Promise<UserEntity> {
        const user = await UserModel.findById(id).populate(["id_campus"]);
        if (!user) throw ResponseError.notFound({ user: `User with id ${id} not found.` });
        return UserEntity.fromObject(user);
    }

    async getByEmail(email: string): Promise<UserEntity> {
        const user = await UserModel.findOne({ email });
        if (!user) throw ResponseError.notFound({ email: `User with email ${email} not found.` });
        return UserEntity.fromObject(user);
    }

    async validateEmail(id: string): Promise<void> {
        await this.existsUserWithId(id);
        await UserModel.updateOne({
            _id: id
        }, {
            validated_email: true
        });
    }

    async resetPassword(userDto: UpdateUserDto): Promise<void> {
        await this.existsUserWithId(userDto.id);
        await UserModel.findByIdAndUpdate(userDto.id, userDto.values);
    }

    async create(userDto: CreateUserDto): Promise<UserEntity> {
        await this.existsUserWithEmail(userDto.email);
        const newUser = await UserModel.create(userDto);
        return UserEntity.fromObject(newUser);
    }

    async update(userDto: UpdateUserDto): Promise<UserEntity> {
        await this.existsUserWithId(userDto.id);
        const updatedUser = await UserModel.findByIdAndUpdate(userDto.id, userDto.values, { new: true });
        return UserEntity.fromObject(updatedUser!);
    }

    async delete(information: InformationDto): Promise<boolean> {
        await this.existsUserWithId(information.id);
        await UserModel.updateOne({ _id: information.id }, { active: false });
        return true;
    }

}