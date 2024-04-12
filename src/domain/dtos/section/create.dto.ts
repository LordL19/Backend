import { Value } from "../../entities/section.entity";

interface Props {
    data: Record<string, Value>,
    id_section_type: string,
    id_user: string,
    id_campus: string
}

export class CreateSectionDto {
    private readonly data: Record<string, Value>;
    private readonly id_section_type: string;
    private readonly id_user: string;
    private readonly id_campus: string;
    private constructor(props: Props) {
        this.data = props.data;
        this.id_section_type = props.id_section_type;
        this.id_user = props.id_user;
        this.id_campus = props.id_campus;
    }

    static create(object: { [key: string]: any }) {
        
    }
}