import { envs } from "./config";
import { MongoDatabase } from "./data";
import { AppRouter, Server } from "./presentation";

(() => {
	main();
})();

async function main() {
	await new MongoDatabase(envs.MONGO_URL, envs.MONGO_DB).start();
	
	new Server({
		port: envs.PORT,
		router: [AppRouter.v1],
		limit: envs.LIMIT_REQUEST,
		rate: envs.LIMIT_TIME,
		origins: envs.ORIGINS,
		headers: envs.HEADERS,
	}).start();
}
