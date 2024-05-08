import {
	ICampusDatasource,
	IRecordDatasource,
	ISectionDatasource,
	IUserDatasource,
} from "../../domain";
import {
	CampusDatasource,
	RecordDatasource,
	SectionDatasource,
	UserDatasource,
} from "../../infraestructure";

export class Datasources {
	static _userInstace: IUserDatasource;
	static _campusInstance: ICampusDatasource;
	static _sectionInstace: ISectionDatasource;
	static _recordInstace: IRecordDatasource;

	static get user(): IUserDatasource {
		if (!this._userInstace) {
			this._userInstace = new UserDatasource();
		}
		return this._userInstace;
	}

	static get campus(): ICampusDatasource {
		if (!this._campusInstance) {
			this._campusInstance = new CampusDatasource();
		}
		return this._campusInstance;
	}

	static get section(): ISectionDatasource {
		if (!this._sectionInstace) {
			this._sectionInstace = new SectionDatasource();
		}
		return this._sectionInstace;
	}

	static get record(): IRecordDatasource {
		if (!this._recordInstace) {
			this._recordInstace = new RecordDatasource();
		}
		return this._recordInstace;
	}
}
