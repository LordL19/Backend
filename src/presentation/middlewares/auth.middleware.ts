import type { NextFunction, Request, Response } from "express";
import { Jwt } from "../../helpers";
import { ResponseError, Type } from "../../domain";

const jwt = Jwt;
export class AuthMiddleware {
	static getToken(req: Request) {
		const auth = req.cookies.token ?? req.headers.authorization ?? null;
		if (!auth) throw ResponseError.badRequest({ auth: "Authentication token not provided" });
		if (!auth.startsWith("Bearer ")) return auth;
		return auth.split(" ")[1];
	}

	static async ValidateVisit(req: Request, _res: Response, next: NextFunction) {
		try {
			const token = AuthMiddleware.getToken(req);
			const payload = await jwt.verifyToken<{ id: String, visit: boolean }>(token);
			if (!payload.visit && !payload.id) throw ResponseError.unauthorized();
			req.body.id_user = payload.id ?? null;
			next();
		} catch (error) {
			next(error);
		}
	}

	//Use for validation within the system
	static async ValidateUser(req: Request, _res: Response, next: NextFunction) {
		try {
			const token = AuthMiddleware.getToken(req);
			const payload = await jwt.verifyToken<{
				id: string;
				type: Type
				validatedEmail: boolean;
			}>(token);
			if (!payload.id) throw ResponseError.unauthorized()
			if (!payload.validatedEmail) throw ResponseError.unauthorized("Your account required validation of email");
			req.body.id_user = payload.id
			req.body.typeUser = payload.type
			next();
		} catch (error) {
			next(error);
		}
	}

	//Use for account validation and password resets
	static async VerifyUser(req: Request, _res: Response, next: NextFunction) {
		try {
			const token = AuthMiddleware.getToken(req);
			const payload = await jwt.verifyToken<{ id: string }>(token);
			if (!payload.id) throw ResponseError.unauthorized("The time has expired to perform this action");
			req.body.id_user = payload.id;
			next();
		} catch (error) {
			next(error);
		}
	}

	static async ValidateUserWithCode(
		req: Request,
		_res: Response,
		next: NextFunction,
	) {
		try {
			const token = AuthMiddleware.getToken(req);
			const payload = await jwt.verifyToken<{
				id: string;
				validatedCode: boolean;
			}>(token);
			if (!payload.validatedCode) throw ResponseError.unauthorized("You must verify the code before performing this process");
			req.body.id_user = payload.id;
			next();
		} catch (error) {
			next(error);
		}
	}

	static async ValidateCode(req: Request, res: Response, next: NextFunction) {
		const token = req.cookies.code ?? req.headers.code ?? null;
		if (!token)
			return res.status(400).json({ error: "Code not provided in cookies" });
		try {
			const payload = await jwt.verifyToken<{ code: string }>(token);
			req.body.server_code = payload.code;
			next();
		} catch (error) {
			next(error);
		}
	}
}
