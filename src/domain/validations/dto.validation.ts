import { ResponseError } from "../errors/response.error"

export class DtoValidation {


    static get(value: string, valueName: string) {
        const valueLower = valueName.toLowerCase();
        return {
            required: () => this.required(value, valueLower),
            asNumber: () => this.asNumber(value, valueLower),
            asDate: () => this.asDate(value, valueLower),
            asArray: () => this.asArray(value, valueLower)
        }
    }

    private static required(value: string, valueName: string) {
        if (value === undefined) throw ResponseError.badRequest({ [valueName]: `${valueName} is required.` });
        return {
            asString: () => this.asString(value, valueName),
            asNumber: () => this.asNumber(value, valueName),
            asEmail: () => this.asEmail(value),
            asBoolean: () => this.asBoolean(value, valueName),
            asPassword: (minLength: number) => this.asPassword(value, minLength),
            asDate: () => this.asDate(value, valueName)
        }
    }

    static asString(value: string, valueName: string) {
        if (value.length === 0) throw ResponseError.badRequest({ [valueName]: `${valueName} cannot be empty.` });
        return {
            value: () => value.trim(),
        };
    }

    static asNumber(value: string, valueName: string) {
        const parsedValue = Number(value);
        if (isNaN(parsedValue)) throw ResponseError.badRequest({ [valueName]: `${valueName} is not a number.` });
        return {
            value: () => parsedValue,
            greaterThanZero: () => this.greaterThanZero(parsedValue, valueName),
        };
    }

    static asEmail(value: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) throw ResponseError.badRequest({ email: `${value} is not a valid email address.` });
        return {
            value: () => value,
        };
    }

    static asPassword(value: string, minLength: number) {
        if (value.length < minLength) throw ResponseError.badRequest({ password: `Password must be at least 6 characters long.` });
        if (!/[A-Z]/.test(value)) throw ResponseError.badRequest({ password: `Password must contain at least one uppercase letter.` });
        if (!/\d/.test(value)) throw ResponseError.badRequest({ password: `Password must contain at least one digit.` });
        return {
            value: () => value
        };
    }

    static asDate(value: string, valueName: string) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
        if (!dateRegex.test(value)) throw ResponseError.badRequest({ [valueName]: `${valueName} is not a valid UTC date. The expected format is [YYYY-MM-DDTHH:mm:ss.SSSZ].` });
        return {
            value: () => new Date(value)
        };
    }

    static greaterThanZero(value: number, valueName: string) {
        if (value <= 0) throw ResponseError.badRequest({ [valueName]: `${valueName} must be greater than 0.` });
        return {
            value: () => value
        };
    }

    static asBoolean(value: string, valueName: string) {
        if (value !== "true" && value !== "false") throw ResponseError.badRequest({ [valueName]: `${valueName} must be 'true' or 'false'.` });
        return {
            value: () => value === "true"
        };
    }

    static asArray(value: unknown, valueName: string) {
        if (!Array.isArray(value)) throw ResponseError.badRequest({ [valueName]: `${valueName} must be an array.` })
        return {
            value: () => value
        }
    }
}   