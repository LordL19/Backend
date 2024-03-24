import { Router } from "express";
import { V1 } from "./v1/routes";

export class AppRouter {
    constructor() { }
    static get v1() {
        const router = Router();

        router.use("/v1", V1.routes);

        return router;
    }
}