import type {
	IUserDatasource,
	InformationDto,
	PaginationDto,
	UpdateUserDto,
} from "../../domain";
import { SearchDto } from "../../domain/dtos/shared/search.dto";

export class UserService {
	constructor(private readonly datasource: IUserDatasource) {}

	getAll(pagination: PaginationDto, search: SearchDto) {
		return this.datasource.getAll(pagination, search);
	}

	getById(information: InformationDto) {
		return this.datasource.getById(information.id);
	}

	update(userDto: UpdateUserDto) {
		return this.datasource.update(userDto);
	}

	delete(information: InformationDto) {
		return this.datasource.delete(information.id);
	}
}
