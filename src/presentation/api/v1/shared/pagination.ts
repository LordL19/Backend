import { PaginationDto } from "../../../../domain/dtos/shared/pagination.dto";

export class Pagination {
    static create(pagination: PaginationDto, route: string, total: number, data: unknown[]) {
        const start = (pagination.limit * (pagination.page - 1)) + 1;
        const end = pagination.page * pagination.limit;
        return {
            page: pagination.page,
            limit: pagination.limit,
            total,
            range: `${(start < total) ? start : total} - ${(end < total) ? end : total}`,
            next: (end < total) ? `/api/v1/${route}?page=${pagination.page + 1}&limit=${pagination.limit}` : null,
            prev: (pagination.page > 1) ? `/api/v1/${route}?page=${pagination.page - 1}&limit=${pagination.limit}` : null,
            data
        }
    }
}