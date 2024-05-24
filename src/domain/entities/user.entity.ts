export enum Type {
	student = "student",
	moderator = "moderator",
	administrator = "administrator",
}

interface Props {
	id: string;
	image_url: string,
	name: string;
	last_name: string;
	full_name: string;
	password: string;
	active: boolean;
	email: string;
	type: Type;
	validated_email: boolean;
	created_at: Date;
	updated_at: Date;
	id_campus: Record<string, string>;
}

export class UserEntity {
	private readonly id: string;
	private readonly image_url: string;
	private readonly name: string;
	private readonly last_name: string;
	private readonly full_name: string;
	private readonly password: string;
	private readonly active: boolean;
	private readonly email: string;
	private readonly type: Type;
	private readonly validated_email: boolean;
	private readonly created_at: Date;
	private readonly updated_at: Date;
	private readonly id_campus: Record<string, string>;

	constructor(props: Props) {
		this.id = props.id;
		this.name = props.name;
		this.image_url = props.image_url;
		this.last_name = props.last_name;
		this.full_name = props.full_name;
		this.password = props.password;
		this.active = props.active;
		this.email = props.email;
		this.type = props.type;
		this.validated_email = props.validated_email;
		this.created_at = props.created_at;
		this.updated_at = props.updated_at;
		this.id_campus = props.id_campus;
	}

	get getBasicData() {
		return {
			id: this.id,
			image_url: this.image_url || null,
			name: this.name,
			last_name: this.last_name,
			email: this.email,
			id_campus: this.id_campus,
			validated_email: this.validated_email
		}
	}

	get getId() {
		return this.id;
	}

	get getName() {
		return this.name;
	}

	get getEmail() {
		return this.email;
	}

	get getType() {
		return this.type;
	}

	get getPassword() {
		return this.password;
	}

	get getValidatedEmail() {
		return this.validated_email;
	}

	static fromObject(object: Record<string, any>) {
		return new UserEntity(object as Props);
	}
}
