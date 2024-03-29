import { envs } from "./config";
import { MongoDatabase, UserModel } from "./data";
import { AppRouter, Server } from "./presentation";
import { EmailService } from "./presentation/services/email.service";

(() => {
    main();
})();

async function main() {
    await new MongoDatabase(
        envs.MONGO_URL,
        envs.MONGO_DB
    ).start()
    
    new Server(
        envs.PORT,
        [AppRouter.v1]
    ).start();
}