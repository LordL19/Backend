enum FieldType {
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
}

export class SectionTypeEntity {
    private readonly id: string;
    private readonly name: string;
    private readonly fields: Field[];
    private readonly id_user: string;

    constructor(props: Props) {
        this.id = props.id;
        this.name = props.name;
        this.fields = props.fields;
        this.id_user = props.id_user;
    }

    static fromObject(object: { [key: string]: any }) {
        return new SectionTypeEntity(object as Props);
    }
}