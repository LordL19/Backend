import { DtoValidation } from "../../validations/dto.validation";

interface Props {
	from: Date;
	to: Date;
}

export class DateRangeDto {
	readonly from: Date;
	readonly to: Date;

	private constructor(props: Props) {
		this.from = props.from;
		this.to = props.to;
	}

	static create(object: Record<string, any>): DateRangeDto {
		const fromDate = DtoValidation.get(object.from, "From")
			.required()
			.asDate()
			.value();
		const toDate = DtoValidation.get(object.to, "To")
			.required()
			.asDate()
			.value();

		return new DateRangeDto({ from: fromDate, to: toDate });
	}
}
