import { CreateQueryDto, InformationDto, IQueryDatasource, Pagination, PaginationDto } from "../../domain";

export class QueryService {
	constructor(private readonly datasource: IQueryDatasource) { }

	async getAll(pagination: PaginationDto, information: InformationDto) {
		const filter: Record<string, any> = {}
		if (information.id) filter.id_section = information.id;
		const [limit, queries] = await Promise.all([
			this.datasource.getAllCount(filter),
			this.datasource.getAll(pagination, filter),
		]);
		return Pagination.create(pagination, "queries", limit, queries);
	}

	create(queryDto: CreateQueryDto) {
		return this.datasource.create(queryDto);
	}
}
