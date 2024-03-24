import { ResponseError } from "../errors/response.error"

export class DtoValidation {


    static get(value: string, valueName: string) {
        return {
            required: () => this.required(value, valueName),
            asNumber: () => this.asNumber(value, valueName),
            asDate: () => this.asDate(value, valueName)
        }
    }

    private static required(value: string, valueName: string) {
        if (value === undefined) throw ResponseError.badRequest({ [valueName.toLowerCase()]: `${valueName} is required.` });
        if (value.length === 0) throw ResponseError.badRequest({ [valueName.toLowerCase()]: `${valueName} cannot be empty.` });
        const cleanedValue = (typeof value === "number") ? value : value.trim();
        return {
            value: () => value,
            asNumber: () => this.asNumber(cleanedValue, valueName),
            asEmail: () => this.asEmail(cleanedValue),
            asBoolean: () => this.asBoolean(cleanedValue, valueName),
            asPassword: (minLength: number) => this.asPassword(cleanedValue, minLength),
            asDate: () => this.asDate(cleanedValue, valueName)
        }
    }

    static asNumber(value: string, valueName: string) {
        const parsedValue = Number(value);
        if (isNaN(parsedValue)) throw ResponseError.badRequest({ [valueName.toLowerCase()]: `${valueName} is not a number.` });
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
        if (!dateRegex.test(value)) throw ResponseError.badRequest({ [valueName.toLowerCase()]: `${valueName} is not a valid UTC date. The expected format is [YYYY-MM-DDTHH:mm:ss.SSSZ].` });
        return {
            value: () => new Date(value)
        };
    }

    static greaterThanZero(value: number, valueName: string) {
        if (value <= 0) throw ResponseError.badRequest({ [valueName.toLowerCase()]: `${valueName} must be greater than 0.` });
        return {
            value: () => value
        };
    }

    static asBoolean(value: string, valueName: string) {
        if (value !== "true" && value !== "false") throw ResponseError.badRequest({ [valueName.toLowerCase()]: `${valueName} must be 'true' or 'false'.` });
        return {
            value: () => value === "true"
        };
    }
}   