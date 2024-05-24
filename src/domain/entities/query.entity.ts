interface Props {
	id: string;
	data: Record<string, string>;
	id_section: string;
	created_at: Date
}

export class QueryEntity {
	private readonly id: string;
	private readonly data: Record<string, string>;
	private readonly id_section: string;
	private readonly created_at: Date

	constructor(props: Props) {
		this.id = props.id;
		this.data = props.data;
		this.id_section = props.id_section;
		this.created_at = props.created_at;
	}

	static fromObject(object: Record<string, any>) {
		return new QueryEntity(object as Props);
	}
}
