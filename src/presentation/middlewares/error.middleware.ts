import type { NextFunction, Request, Response } from "express";
import { ResponseError } from "../../domain";

export class ErrorMiddleware {
	static handleError = (
		error: unknown,
		_req: Request,
		res: Response,
		_next: NextFunction,
	) => {
		if (error instanceof ResponseError)
			return res.status(error.statusCode).json({ error: error.data });
		console.log(error);
		if (error instanceof Error)
			return res.status(500).json({ error: error.message });
		return res.status(500).json({ error: "Internal server error" });
	};
}
