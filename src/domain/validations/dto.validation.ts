import { ResponseError } from "../errors/response.error";

export function get(value: unknown, valueName: string) {
	const valueLower = valueName.toLowerCase();
	return {
		required: () => required(value, valueLower),
		asNumber: () => asNumber(value, valueLower),
		asString: () => asString(value, valueLower),
		asDate: () => asDate(value, valueLower),
		asArray: () => asArray(value, valueLower),
		asObject: () => asObject(value, valueLower),
	};
}

function required(value: unknown, valueName: string) {
	if (value === undefined || value === null) {
		throw ResponseError.badRequest({
			[valueName]: `${valueName} is required`,
		});
	}
	return {
		asString: () => asString(value, valueName),
		asNumber: () => asNumber(value, valueName),
		asEmail: () => asEmail(value as string),
		asArray: () => asArray(value, valueName),
		asObject: () => asObject(value, valueName),
		asBoolean: () => asBoolean(value, valueName),
		asPassword: (minLength: number) => asPassword(value as string, minLength),
		asDate: () => asDate(value, valueName),
		value: () => value as string,
	};
}

function asString(value: unknown, valueName: string) {
	const stringValue = ensureString(value, valueName);
	if (stringValue.length === 0) {
		throw ResponseError.badRequest({
			[valueName]: `${valueName} cannot be empty`,
		});
	}
	return {
		value: () => stringValue,
	};
}

function asNumber(value: unknown, valueName: string) {
	const parsedValue = typeof value === "number" ? value : Number(ensureString(value, valueName));
	if (isNaN(parsedValue)) {
		throw ResponseError.badRequest({
			[valueName]: `${valueName} is not a number`,
		});
	}
	return {
		value: () => parsedValue,
		greaterThanZero: () => greaterThanZero(parsedValue, valueName),
	};
}

function asEmail(value: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(value)) {
		throw ResponseError.badRequest({
			email: `${value} is not a valid email address`,
		});
	}
	return {
		value: () => value,
	};
}

function asPassword(value: string, minLength: number) {
	if (value.length < minLength) {
		throw ResponseError.badRequest({
			password: `Password must be at least ${minLength} characters long`,
		});
	}
	if (!/[A-Z]/.test(value)) {
		throw ResponseError.badRequest({
			password: `Password must contain at least one uppercase letter`,
		});
	}
	if (!/\d/.test(value)) {
		throw ResponseError.badRequest({
			password: `Password must contain at least one digit`,
		});
	}
	return {
		value: () => value,
	};
}

function asDate(value: unknown, valueName: string) {
	ensureString(value, valueName);
	const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
	if (!dateRegex.test(value as string)) {
		throw ResponseError.badRequest({
			[valueName]: `${valueName} is not a valid UTC date. The expected format is [YYYY-MM-DDTHH:mm:ss.SSSZ]`,
		});
	}
	return {
		value: () => new Date(value as string),
	};
}

function greaterThanZero(value: number, valueName: string) {
	if (value <= 0) {
		throw ResponseError.badRequest({
			[valueName]: `${valueName} must be greater than 0`,
		});
	}
	return {
		value: () => value,
	};
}

export function asBoolean(value: unknown, valueName: string) {
	if (typeof value !== "boolean") {
		throw ResponseError.badRequest({
			[valueName]: `${valueName} must be boolean`,
		});
	}
	return {
		value: () => value as boolean,
	};
}

function asObject(value: unknown, valueName: string) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) {
		throw ResponseError.badRequest({
			[valueName]: `${valueName} must be an object`,
		});
	}
	if (Object.keys(value).length === 0) {
		throw ResponseError.badRequest({
			[valueName]: `${valueName} cannot be empty`,
		});
	}
	return {
		value: () => value as Record<string, any>,
	};
}

function asArray(value: unknown, valueName: string) {
	if (!Array.isArray(value)) {
		throw ResponseError.badRequest({
			[valueName]: `${valueName} must be an array`,
		});
	}
	return {
		value: () => value,
	};
}

function ensureString(value: unknown, valueName: string): string {
	if (typeof value !== "string") {
		throw ResponseError.badRequest({
			[valueName]: `${valueName} must be a string`,
		});
	}
	return value.trim();
}
