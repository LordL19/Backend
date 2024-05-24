import { SectionModel } from "../../../data";
import {
	type CreateSectionDto,
	type ISectionDatasource,
	type PaginationDto,
	ResponseError,
	SectionEntity,
	type UpdateSectionDto,
} from "../../../domain";

export class SectionDatasource implements ISectionDatasource {
	private async existsSectionWithId(id: string) {
		const section = await SectionModel.findById(id);
		if (!section)
			throw ResponseError.notFound({
				section: `Section with id ${id} not found.`,
			});
	}

	private async existsSectionWithName(
		name: string,
		id_user: string,
		id_parent: string,
	) {
		const section = await SectionModel.findOne({ name, id_user, id_parent });
		if (section)
			throw ResponseError.notFound({
				section: `Section with name ${name} alredy exists.`,
			});
	}

	async getAll(pagination: PaginationDto, filter: Record<string, any>): Promise<SectionEntity[]> {
		const sections = await SectionModel.find(filter)
			.skip((pagination.page - 1) * pagination.limit)
			.limit(pagination.limit);
		return sections.map(SectionEntity.fromObject);
	}

	async getAllChild(
		pagination: PaginationDto,
		id: string,
	): Promise<SectionEntity[]> {
		const sections = await SectionModel.find({ id_parent: id })
			.skip((pagination.page - 1) * pagination.limit)
			.limit(pagination.limit);
		return sections.map(SectionEntity.fromObject);
	}

	async getById(id: string): Promise<SectionEntity> {
		const section = await SectionModel.findById(id);
		if (!section)
			throw ResponseError.notFound({
				section: `Section with id ${id} not found.`,
			});
		return SectionEntity.fromObject(section);
	}

	getAllCount(filter: Record<string, any>): Promise<number> {
		return SectionModel.find(filter).countDocuments();
	}

	async create(sectionDto: CreateSectionDto): Promise<SectionEntity> {
		await this.existsSectionWithName(
			sectionDto.name,
			sectionDto.id_user,
			sectionDto.id_parent!,
		);
		const section = await SectionModel.create(sectionDto);
		return SectionEntity.fromObject(section);
	}

	async update(sectionDto: UpdateSectionDto): Promise<SectionEntity> {
		await this.existsSectionWithId(sectionDto.id);
		const sectionUpdate = await SectionModel.findByIdAndUpdate(
			sectionDto.id,
			sectionDto.values,
			{ returnDocument: "after" },
		);
		return SectionEntity.fromObject(sectionUpdate!);
	}

	async delete(id: string): Promise<void> {
		await this.existsSectionWithId(id);
		await SectionModel.updateOne({ _id: id }, { active: false });
	}
}
