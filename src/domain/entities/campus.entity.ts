interface Props {
    id: string,
    name: string
}

export class CampusEntity {
    private readonly id: string;
    private readonly name: string;

    constructor(props: Props) {
        this.id = props.id;
        this.name = props.name;
    }

    static fromObject(object: { [key: string]: any }) {
        return new CampusEntity(object as Props)
    }
}