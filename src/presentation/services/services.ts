import { envs } from "../../config";
import { Datasources } from "../datasources/datasources";
import { AuthService } from "./auth.service";
import { CampusService } from "./campus.service";
import { EmailService } from "./email.service";
import { RecordService } from "./record.service";
import { SectionService } from "./section.service";
import { UserService } from "./user.service";

export class Services {
	private static _authInstance: AuthService;
	private static _emailInstance: EmailService;
	private static _campusInstance: CampusService;
	private static _userInstance: UserService;
	private static _sectionInstance: SectionService;
	private static _recordInstance: RecordService;

	static get auth() {
		if (!this._authInstance) {
			this._authInstance = new AuthService(Datasources.user, this.email);
		}
		return this._authInstance;
	}

	static get email() {
		if (!this._emailInstance) {
			this._emailInstance = new EmailService(
				envs.MAILER_SERVICE,
				envs.MAILER_EMAIL,
				envs.MAILER_KEY,
			);
		}
		return this._emailInstance;
	}

	static get campus() {
		if (!this._campusInstance) {
			this._campusInstance = new CampusService(Datasources.campus);
		}
		return this._campusInstance;
	}

	static get user() {
		if (!this._userInstance) {
			this._userInstance = new UserService(Datasources.user);
		}
		return this._userInstance;
	}

	static get section() {
		if (!this._sectionInstance) {
			this._sectionInstance = new SectionService(
				Datasources.section,
				Services.user,
			);
		}
		return this._sectionInstance;
	}

	static get record() {
		if (!this._recordInstance) {
			this._recordInstance = new RecordService(
				Datasources.record,
				Services.section,
			);
		}
		return this._recordInstance;
	}
}
