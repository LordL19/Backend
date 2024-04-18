import { Value } from "../../entities/record.entity";

interface Props {
    data: Record<string, Value>,
    id_section: string,
    id_user: string,
    id_campus: string
}

export class CreateRecordDto {
    private readonly data: Record<string, Value>;
    private readonly id_section: string;
    private readonly id_user: string;
    private readonly id_campus: string;
    private constructor(props: Props) {
        this.data = props.data;
        this.id_section = props.id_section;
        this.id_user = props.id_user;
        this.id_campus = props.id_campus;
    }

    static create(object: Record<string, any>) {

    }
}