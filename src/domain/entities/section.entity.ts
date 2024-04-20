export enum FieldType {
    text = "text",
    number = "number",
    date = "date"
}

export interface Field {
    name: string,
    type: FieldType
}

interface Props {
    id: string,
    name: string
    fields: Field[]
    id_user: string
    moderators: string[]
    active: boolean
}

export class SectionEntity {
    private readonly id: string;
    private readonly name: string;
    private readonly fields: Field[];
    private readonly id_user: string;
    private readonly moderators: string[];
    private readonly active: boolean;

    constructor(props: Props) {
        this.id = props.id;
        this.name = props.name;
        this.id_user = props.id_user;
        this.active = props.active; 
        this.moderators = props.moderators;
        this.fields = props.fields;
    }

    get getIdUser() {
        return this.id_user.toString();
    }

    static fromObject(object: Record<string, any>) {
        return new SectionEntity(object as Props);
    }
}