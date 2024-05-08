import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Router } from "express";
import { rateLimit } from "express-rate-limit";
import { ErrorMiddleware } from "./middlewares/error.middleware";

interface Props {
	port: number;
	router: Router | Router[];
	rate: number;
	limit: number;
	origins: string[];
	headers: string;
}

export class Server {
	private readonly port: number;
	private readonly rate: number;
	private readonly limit: number;
	private readonly router: Router | Router[];
	private readonly origins: string[];
	private readonly headers: string;
	private readonly service = express();

	constructor(props: Props) {
		this.port = props.port;
		this.rate = props.rate;
		this.limit = props.limit;
		this.origins = props.origins;
		this.headers = props.headers;
		this.router = props.router;
		this.configure();
	}

	private configure() {
		this.service.use(
			rateLimit({
				windowMs: this.rate,
				limit: this.limit,
				message: {
					error: "Too many requests from this origin, try again later",
				},
			}),
		);
		this.service.use(
			cors({
				origin: this.origins,
				allowedHeaders: this.headers,
				credentials: true,
			}),
		);
		this.service.use(express.json());
		this.service.use(express.urlencoded({ extended: true }));
		this.service.use(cookieParser());
		this.service.use("/api", this.router);
		this.service.use(ErrorMiddleware.handleError);
	}

	start() {
		this.service.listen(this.port, () => {
			console.log(`Server running in port ${this.port}`);
		});
	}
}
