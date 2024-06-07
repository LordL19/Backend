import { Field, FieldType, KeysFieldType } from "../../entities/section.entity";
import { ResponseError } from "../../errors/response.error";

export class SectionUtils {
	static ValidatePropertiesOfFields(
		value: Record<string, any>[],
		valueName: string,
	): Field[] {
		const valueNameLowerCase = valueName.toLowerCase();
		if (!Array.isArray(value))
			throw ResponseError.badRequest({
				[valueNameLowerCase]: `${valueName} must be an array`,
			});
		value.forEach((item, index) => {
			if (!item.name || !item.type)
				throw ResponseError.badRequest({
					[valueNameLowerCase]: `The item ${index + 1
						} of ${valueName}, name or type is required`,
				});
			if (typeof item.name !== "string")
				throw ResponseError.badRequest({
					[valueNameLowerCase]: `The item ${index + 1
						} of ${valueName}, property name not a string`,
				});
			if (typeof item.type !== "string")
				throw ResponseError.badRequest({
					[valueNameLowerCase]: `The item ${index + 1
						} of ${valueName}, property type not a string`,
				});
			if (!(item.type in FieldType))
				throw ResponseError.badRequest({
					[valueNameLowerCase]: `The item ${index + 1
						} of ${valueName}, property type is not valid ${KeysFieldType.toString()}`,
				});
		});
		return value as Field[];
	}
}
