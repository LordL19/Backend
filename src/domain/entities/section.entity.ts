export type Value = string | number | Date;
interface Props {
    id: string,
    data: Record<string, Value>
    id_section_type: string
    id_user: string
    id_campus: string
}

export class SectionEntity {
    private readonly id: string;
    private readonly data: Record<string, Value>;
    private readonly id_section_type: string;
    private readonly id_user: string;
    private readonly id_campus: string;

    constructor(props: Props) {
        this.id = props.id;
        this.data = props.data;
        this.id_section_type = props.id_section_type;
        this.id_user = props.id_user;
        this.id_campus = props.id_campus;
    }

    static fromObject(object: { [key: string]: any }) {
        Object.keys(object).includes("")
        return new SectionEntity(object as Props);
    }
}