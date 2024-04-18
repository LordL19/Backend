export type Value = string | number | Date;
interface Props {
    id: string,
    data: Record<string, Value>
    id_section: string
    id_user: string
    id_campus: string
}

export class RecordEntity {
    private readonly id: string;
    private readonly data: Record<string, Value>;
    private readonly id_section: string;
    private readonly id_user: string;
    private readonly id_campus: string;

    constructor(props: Props) {
        this.id = props.id;
        this.data = props.data;
        this.id_section = props.id_section;
        this.id_user = props.id_user;
        this.id_campus = props.id_campus;
    }

    static fromObject(object: Record<string, any>) {
        return new RecordEntity(object as Props);
    }
}