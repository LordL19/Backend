import { RecordModel } from "../../../data";
import {
	PaginationDto,
	RecordEntity,
	CreateRecordDto,
	IRecordDatasource,
	SectionEntity,
	ResponseError,
} from "../../../domain";
import { UpdateRecordDto } from "../../../domain/dtos/record/update.dto";

export class RecordDatasource implements IRecordDatasource {
	private async existsRecordWithId(id: string) {
		const record = await RecordModel.findById(id);
		if (!record)
			throw ResponseError.notFound({
				record: `Record with id ${id} not found.`,
			});
	}

	async getAll(
		pagination: PaginationDto,
		section: SectionEntity,
	): Promise<RecordEntity[]> {
		const records = await RecordModel.find({ id_section: section.getId })
			.skip((pagination.page - 1) * pagination.limit)
			.limit(pagination.limit)
			.populate([
				{ path: "created_by", select: ["full_name"] },
				{ path: "updated_by", select: ["full_name"] },
			]);
		return records.map(RecordEntity.fromObject);
	}

	async getByID(id: string): Promise<RecordEntity> {
		const record = await RecordModel.findById(id).populate([
			{ path: "created_by", select: ["full_name"] },
			{ path: "updated_by", select: ["full_name"] },
		]);
		if (!record)
			throw ResponseError.notFound({
				record: `Record with id ${id} not found.`,
			});
		return RecordEntity.fromObject(record);
	}

	getAllCount(section: SectionEntity): Promise<number> {
		return RecordModel.find({ id_section: section.getId }).countDocuments();
	}

	async create(recordDto: CreateRecordDto): Promise<RecordEntity> {
		const record = await RecordModel.create(recordDto);
		return RecordEntity.fromObject(record);
	}

	async update(recordDto: UpdateRecordDto): Promise<RecordEntity> {
		await this.existsRecordWithId(recordDto.id);
		const updatedRecord = await RecordModel.findByIdAndUpdate(
			recordDto.id,
			recordDto.values,
			{ returnDocument: "after" },
		);
		return RecordEntity.fromObject(updatedRecord!);
	}

	async delete(id: string): Promise<void> {
		await this.existsRecordWithId(id);
		await RecordModel.deleteOne({ _id: id });
	}
}
