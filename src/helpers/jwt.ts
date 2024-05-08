import { type JwtPayload, sign, verify } from "jsonwebtoken";
import { envs } from "../config/envs";
import { ResponseError } from "../domain";

const SEED = envs.JWT_SECRET;

export const Jwt = {
	generateToken: (
		payload: string | JwtPayload,
		timeOut = "10m",
	): Promise<string> => {
		return new Promise((resolve) => {
			sign(payload, SEED, { expiresIn: timeOut }, (error, token) => {
				if (error) throw error;
				resolve(token!);
			});
		});
	},
	verifyToken: <T>(token: string): Promise<T | JwtPayload> => {
		return new Promise((resolve) => {
			verify(token, SEED, (error, decoded) => {
				if (error) throw ResponseError.unauthorized(error.message);
				resolve(decoded! as T);
			});
		});
	},
};
