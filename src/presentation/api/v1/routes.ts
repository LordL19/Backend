import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { AuthRouter } from "./auth/router";
import { CampusRouter } from "./campus/router";
import { RecordRouter } from "./record/router";
import { SectionRouter } from "./section/router";
import { SeedRouter } from "./seed/router";
import { UserRouter } from "./user/router";
import { StorageRouter } from "./upload/router";
import { QueryRouter } from "./query/router";
import { AssistantRouter } from "./assistant/router";
export class V1 {
	static get routes() {
		const v1 = Router();
		v1.use("/queries", QueryRouter.routes);
		v1.use("/seed", SeedRouter.routes);
		v1.use("/auth", AuthRouter.routes);
		v1.use("/campus", CampusRouter.routes);
		v1.use("/records", RecordRouter.routes);
		v1.use("/sections", SectionRouter.routes);
		v1.use("/assistant", AssistantRouter.routes);
		v1.use("/users", [AuthMiddleware.ValidateUser], UserRouter.routes);
		v1.use("/upload", [AuthMiddleware.ValidateUser], StorageRouter.routes);

		return v1;
	}
}
