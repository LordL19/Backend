import type { NextFunction, Request, Response } from "express";
import { Jwt } from "../../helpers";
import { ResponseError } from "../../domain";

const jwt = Jwt;
export class AuthMiddleware {
	static getToken(req: Request) {
		const auth = req.cookies.token ?? req.headers.authorization ?? null;
		if (!auth)
			throw ResponseError.badRequest({
				auth: "Authentication token not provided.",
			});
		if (!auth.startsWith("Bearer ")) return auth;
		return auth.split(" ")[1];
	}

	static async ValidateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const token = AuthMiddleware.getToken(req);
			const payload = await jwt.verifyToken<{
				id: number;
				validatedEmail: boolean;
			}>(token);
			if (!payload.validatedEmail)
				return res.status(400).json({
					error: {
						auth: "Your account required validation of email.",
					},
				});
			req.body.id_user = payload.id;
			next();
		} catch (error) {
			next(error);
		}
	}

	static async VerifyUser(req: Request, res: Response, next: NextFunction) {
		try {
			const token = AuthMiddleware.getToken(req);
			const payload = await jwt.verifyToken<{ id: number }>(token);
			req.body.id_user = payload.id;
			next();
		} catch (error) {
			next(error);
		}
	}

	static async ValidateUserWithCode(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const token = AuthMiddleware.getToken(req);
			const payload = await jwt.verifyToken<{
				id: number;
				validatedCode: boolean;
			}>(token);
			if (!payload.validatedCode)
				return res.status(400).json({
					error: {
						auth: "You must verify the code before performing this process.",
					},
				});
			req.body.id_user = payload.id;
			next();
		} catch (error) {
			next(error);
		}
	}

	static async ValidateCode(req: Request, res: Response, next: NextFunction) {
		const token = req.cookies.code ?? req.headers.code ?? null;
		if (!token)
			return res.status(400).json({ error: "Code not provided in cookies." });
		try {
			const payload = await jwt.verifyToken<{ code: string }>(token);
			req.body.server_code = payload.code;
			next();
		} catch (error) {
			next(error);
		}
	}
}
