export class ResponseError extends Error {
	private constructor(
		readonly statusCode: number,
		readonly data: Record<string, string> | string,
	) {
		super();
	}

	static badRequest(data: Record<string, string>) {
		return new ResponseError(400, data);
	}

	static unauthorized(data: string = "You are not allowed to perform this action.") {
		return new ResponseError(401, { auth: data });
	}

	static forbidden(error: Record<string, string>) {
		return new ResponseError(403, error);
	}

	static notFound(data: Record<string, string> | string) {
		return new ResponseError(404, data);
	}

	static internalServerError(data = "Internal server error.") {
		return new ResponseError(500, data);
	}
}
