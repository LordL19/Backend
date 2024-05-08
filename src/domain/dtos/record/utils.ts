import { Value } from "../../entities/record.entity";
import { type Field, FieldType } from "../../entities/section.entity";
import { ResponseError } from "../../errors/response.error";

export class RecordUtils {
	static ValidatePropertiesOfData(
		sectionStructure: Field[],
		data: Record<string, any>,
	) {
		const obj: Record<string, Value> = {};
		const keysSectionStructure = sectionStructure.reduce(
			(acc, current) => acc.concat(current.name as never),
			[],
		);
		if (!keysSectionStructure.every((key) => Object.keys(data).includes(key)))
			throw ResponseError.badRequest({
				data: `Properties are missing, the required properties are: ${keysSectionStructure.toString()}`,
			});
		sectionStructure.forEach((item) => {
			const valueOfType = (FieldType as Record<string, any>)[item.type];
			const type = isNaN(valueOfType) ? valueOfType : "string";
			const value = data[item.name];
			if (!value && type !== "boolean")
				throw ResponseError.badRequest({
					data: `The property ${item.name} can't be empty.`,
				});
			if (typeof value !== type)
				throw ResponseError.badRequest({
					data: `The value of ${item.name} must be ${type}.`,
				});
			obj[item.name] = this.validationField(
				data[item.name],
				valueOfType,
				item.name,
			);
		});
		return obj;
	}

	private static validationField(
		value: Value,
		type: FieldType,
		name: string,
	): Value {
		switch (type) {
			case FieldType.date:
			case FieldType.time:
			case FieldType.datetime:
				value = new Date(value as string);
				if (value.toString() === "Invalid Date")
					throw ResponseError.badRequest({
						data: `The property ${name} is a invalid Date (ISO 8991).`,
					});
				break;
		}
		return value;
	}
}
