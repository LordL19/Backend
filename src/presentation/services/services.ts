import { envs } from "../../config";
import { Datasources } from "../datasources/datasources";
import { AuthService } from "./auth.service";
import { CampusService } from "./campus.service";
import { EmailService } from "./email.service";
import { UserService } from "./user.service";

export class Services {

    static get auth() {
        return new AuthService(Datasources.user, this.email);
    }
    static get email() {
        return new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_KEY
        );
    }

    static get campus() {
        return new CampusService(Datasources.campus);
    }

    static get user() {
        return new UserService(Datasources.user);
    }

}