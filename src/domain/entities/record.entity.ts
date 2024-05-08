export type Value = string | number | Date | boolean;
interface Props {
	id: string;
	data: Record<string, Value>;
	id_section: string;
	id_campus: string;
	created_by: string;
	updated_by: string;
	created_at: Date;
	updated_at: Date;
}

export class RecordEntity {
	private readonly id: string;
	private readonly data: Record<string, Value>;
	private readonly id_section: string;
	private readonly created_by: string;
	private readonly updated_by: string;
	private readonly id_campus: string;
	private readonly created_at: Date;
	private readonly updated_at: Date;

	constructor(props: Props) {
		this.id = props.id;
		this.data = props.data;
		this.id_section = props.id_section;
		this.created_by = props.created_by;
		this.created_by = props.created_by;
		this.updated_by = props.updated_by;
		this.id_campus = props.id_campus;
		this.created_at = props.created_at;
		this.updated_at = props.updated_at;
	}

	static fromObject(object: Record<string, any>) {
		return new RecordEntity(object as Props);
	}
}
