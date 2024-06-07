import type { ResetPasswordDto } from "../dtos/auth/reset-password.dto";
import { PaginationDto } from "../dtos/shared/pagination.dto";
import { SearchDto } from "../dtos/shared/search.dto";
import type { CreateUserDto } from "../dtos/user/create.dto";
import type { UpdateUserDto } from "../dtos/user/update.dto";
import type { Type, UserEntity } from "../entities/user.entity";

export interface SearchUsers {
	total: number;
	users: UserEntity[];
}

export interface IUserDatasource {
	getAll(pagination: PaginationDto, search: SearchDto): Promise<SearchUsers>;
	getById(id: string): Promise<UserEntity>;
	getByEmail(email: string): Promise<UserEntity>;
	validateEmail(id: string): Promise<Type>;
	resetPassword(userDto: ResetPasswordDto): Promise<void>;
	create(userDto: CreateUserDto): Promise<UserEntity>;
	update(userDto: UpdateUserDto): Promise<UserEntity>;
	delete(id: string): Promise<void>;
}
