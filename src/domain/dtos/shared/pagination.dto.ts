import * as DtoValidation from "../../validations/dto.validation";

interface Props {
	page: number;
	limit: number;
}

export class PaginationDto {
	readonly page: number;
	readonly limit: number;

	constructor(props: Props) {
		this.page = props.page;
		this.limit = props.limit;
	}

	static create(object: Record<string, any>): PaginationDto {
		const { page = 1, limit = 10 } = object;
		if (typeof page === "number" && typeof limit === "number")
			return new PaginationDto({ page, limit });
		const pageResult = DtoValidation.get(page, "Page")
			.asNumber()
			.greaterThanZero()
			.value();
		const limitResult = DtoValidation.get(limit, "Limit")
			.asNumber()
			.greaterThanZero()
			.value();
		return new PaginationDto({ page: pageResult, limit: limitResult });
	}
}
