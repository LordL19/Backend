import { UserModel } from "../../../data";
import {
	type CreateUserDto,
	type IUserDatasource,
	PaginationDto,
	ResetPasswordDto,
	ResponseError,
	SearchDto,
	SearchUsers,
	Type,
	type UpdateUserDto,
	UserEntity,
} from "../../../domain";

export class UserDatasource implements IUserDatasource {
	private async existsUserWithId(id: string) {
		const user = await UserModel.findById(id);
		if (!user)
			throw ResponseError.notFound({ user: `User with id ${id} not found` });
	}

	private async existsUserWithEmail(email: string) {
		const user = await UserModel.findOne({ email });
		if (user)
			throw ResponseError.notFound({
				email: `User with email ${email} alredy exists`,
			});
	}

	async getAll(
		pagination: PaginationDto,
		search: SearchDto,
	): Promise<SearchUsers> {
		const foundUsers = await UserModel.find({ _id: { $ne: search.fromUser }, full_name: { $regex: search.value, $options: "i" } })
			.skip((pagination.page - 1) * pagination.limit)
			.limit(pagination.limit)
		const users = foundUsers.map(UserEntity.fromObject);
		return {
			total: foundUsers.length,
			users,
		};
	}
	async getById(id: string): Promise<UserEntity> {
		const user = await UserModel.findById(id);
		if (!user)
			throw ResponseError.notFound({ user: `User with id ${id} not found` });
		return UserEntity.fromObject(user);
	}

	async getByEmail(email: string): Promise<UserEntity> {
		const user = await UserModel.findOne({ email });
		if (!user)
			throw ResponseError.notFound({
				email: `User with email ${email} not found`,
			});
		return UserEntity.fromObject(user);
	}

	async validateEmail(id: string): Promise<Type> {
		const user = await this.getById(id);
		await UserModel.updateOne(
			{
				_id: id,
			},
			{
				validated_email: true,
			},
		);
		return user.getType;
	}

	async resetPassword(userDto: ResetPasswordDto): Promise<void> {
		await this.existsUserWithId(userDto.id);
		await UserModel.findByIdAndUpdate(userDto.id, {
			password: userDto.password,
		});
	}

	async create(userDto: CreateUserDto): Promise<UserEntity> {
		await this.existsUserWithEmail(userDto.email);
		const newUser = await UserModel.create(userDto);
		return UserEntity.fromObject(newUser);
	}

	async update(userDto: UpdateUserDto): Promise<UserEntity> {
		await this.existsUserWithId(userDto.id);
		const updatedUser = await UserModel.findByIdAndUpdate(
			userDto.id,
			userDto.values,
			{ new: true },
		);
		return UserEntity.fromObject(updatedUser!);
	}

	async delete(id: string): Promise<void> {
		await this.existsUserWithId(id);
		await UserModel.updateOne({ _id: id }, { active: false });
	}
}
