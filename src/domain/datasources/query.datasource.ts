import { CreateQueryDto } from "../dtos/query/create.dto";
import { PaginationDto } from "../dtos/shared/pagination.dto";
import { QueryEntity } from "../entities/query.entity";

export interface IQueryDatasource {
    getAll(pagination: PaginationDto, filter: Record<string, any>): Promise<QueryEntity[]>;
    getAllCount(filter: Record<string, any>): Promise<number>
    create(campusDto: CreateQueryDto): Promise<QueryEntity>;
}
