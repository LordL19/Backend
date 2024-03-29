import { Request, Response, Router } from "express";
import { UserRouter } from "./user/router";
import { AuthRouter } from "./auth/router";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { SeedRouter } from "./seed/router";
import { CampusRouter } from "./campus/router";
import { SectionTipeRouter } from "./section-type/router";

export class V1 {

    static get routes() {
        const v1 = Router();

        v1.use("/seed", SeedRouter.routes);
        v1.use("/auth", AuthRouter.routes);
        v1.use("/campus", CampusRouter.routes);
        v1.use("/user", [AuthMiddleware.ValidateUser], UserRouter.routes);
        v1.use("/section-types", [AuthMiddleware.ValidateUser], UserRouter.routes);
        v1.use("/sections", [AuthMiddleware.ValidateUser], UserRouter.routes);
        v1.use("/section-type", SectionTipeRouter.routes);
        return v1;
    }
}