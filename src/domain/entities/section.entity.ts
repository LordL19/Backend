export enum FieldType {
	file,
	text,
	datetime,
	date,
	time,
	number = "number",
	checkbox = "boolean",
}

export const KeysFieldType = Object.keys(FieldType).filter((value) =>
	isNaN(Number(value)),
);

export interface Field {
	name: string;
	type: FieldType;
}

interface Props {
	id: string;
	name: string;
	fields: Field[];
	id_user: string;
	moderators: string[];
	active: boolean;
	subsections: SectionEntity[];
}

export class SectionEntity {
	private readonly id: string;
	private readonly id_user: string;
	private readonly name: string;
	private readonly active: boolean;
	private readonly moderators: string[];
	private readonly fields: Field[];

	constructor(props: Props) {
		this.id = props.id;
		this.name = props.name;
		this.id_user = props.id_user;
		this.active = props.active;
		this.moderators = props.moderators;
		this.fields = props.fields;
	}

	get getId() {
		return this.id;
	}

	get getModerators() {
		return this.moderators;
	}

	get getIdUser() {
		return this.id_user.toString();
	}

	get getFields() {
		return this.fields;
	}

	static fromObject(object: Record<string, any>) {
		return new SectionEntity(object as Props);
	}
}
