import { Router } from "express";
import { Services } from "../../../services/services";
import { QueryController } from "./controller";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
import rateLimit from "express-rate-limit";

export class QueryRouter {
	static get routes() {
		const query = Router();
		const controller = new QueryController(Services.query);

		query.get("/", [AuthMiddleware.ValidateUser], controller.getAll);
		query.get("/:id", [AuthMiddleware.ValidateUser], controller.getAll);
		
		query.use(rateLimit({
			windowMs: 10 * 60 * 1000,
			limit: 3,
			message: {
				error: "Too many requests from this origin, try again later",
			},
		}));
		query.post("/", [AuthMiddleware.ValidateVisit], controller.create);

		return query;
	}
}
