import { QueryModel } from "../../../data";
import { CreateQueryDto, IQueryDatasource, PaginationDto, QueryEntity } from "../../../domain";

export class QueryDatasource implements IQueryDatasource {
	async getAll(pagination: PaginationDto, filter: Record<string, string>): Promise<QueryEntity[]> {
		const data = await QueryModel.find(filter).skip((pagination.page - 1) * pagination.limit)
			.limit(pagination.limit)
			.populate([
				{ path: "id_section", select: ["name"] },
			]);
		return data.map(QueryEntity.fromObject);
	}

	getAllCount(filter: Record<string, any>): Promise<number> {
		return QueryModel.find(filter).countDocuments();
	}

	async create(queryDto: CreateQueryDto): Promise<QueryEntity> {
		const query = await QueryModel.create(queryDto);
		return QueryEntity.fromObject(query);
	}
}
