import { CampusModel } from "../../data/mongo/models/campus"

const campus = [
    {
        name: "Trinidad"
    },
    {
        name: "La Paz"
    },
    {
        name: "Cochabamba"
    },
    {
        name: "Santra Cruz"
    },
    {
        name: "Sucre"
    }
]

export class Seed {

    static seedCampus = async () => {
        const data = await CampusModel.find();
        if (data.length === 0) await CampusModel.insertMany(campus);
    }
}