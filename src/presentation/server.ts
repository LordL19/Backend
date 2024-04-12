import express, { Router } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
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
        this.service.use(cors({
            origin: 'http://localhost:5173',
            methods: 'GET, POST, PUT, DELETE',
            allowedHeaders: 'Content-Type, Authorization',
            credentials: true,
        }))
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