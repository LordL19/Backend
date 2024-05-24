import {
	ICampusDatasource,
	IQueryDatasource,
	IRecordDatasource,
	ISectionDatasource,
	IUserDatasource,
} from "../../domain";
import {
	CampusDatasource,
	QueryDatasource,
	RecordDatasource,
	SectionDatasource,
	UserDatasource,
} from "../../infraestructure";

export class Datasources {
	static _userInstace: IUserDatasource;
	static _campusInstance: ICampusDatasource;
	static _sectionInstace: ISectionDatasource;
	static _recordInstace: IRecordDatasource;
	static _queryDatasource: IQueryDatasource;

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

	static get query(): IQueryDatasource {
		if (!this._queryDatasource) {
			this._queryDatasource = new QueryDatasource();
		}
		return this._queryDatasource;
	}
}
