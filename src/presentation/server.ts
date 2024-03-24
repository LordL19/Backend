import express, { NextFunction, Request, Response, Router } from "express";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middlewares/error.middleware";

export class Server {
    constructor(
        private readonly port: number,
        private readonly router: Router | Router[],
        private readonly service = express()
    ) {
        this.configure();
    }

    private configure() {
        
        this.service.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        })

        this.service.use(express.json());
        this.service.use(express.urlencoded({ extended: true }));
        this.service.use(cookieParser());
        this.service.use("/api", this.router);
        this.service.use(ErrorMiddleware.handleError);
    }

    start() {
        this.service.listen(this.port, () => {
            console.log(`Server running in port ${this.port}`)
        })
    }
}