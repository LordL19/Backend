import { get } from "env-var";

export const envs = {
	PORT: get("PORT").required().asPortNumber(),
	JWT_SECRET: get("JWT_SECRET").required().asString(),
	JWT_EXPIRES_IN: get("JWT_EXPIRES_IN").required().asString(),
	LIMIT_REQUEST: get("LIMIT_REQUEST").required().asInt(),
	LIMIT_TIME: get("LIMIT_TIME").required().asInt(),
	ORIGINS: get("ORIGINS").required().asArray(),
	HEADERS: get("HEADERS").required().asString(),
	MONGO_URL: get("MONGO_URL").required().asString(),
	MONGO_HOST: get("MONGO_HOST").required().asString(),
	MONGO_DB: get("MONGO_DB").required().asString(),
	MONGO_USER: get("MONGO_USER").required().asString(),
	MONGO_PASSWORD: get("MONGO_PASSWORD").required().asString(),
	MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
	MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
	MAILER_KEY: get("MAILER_KEY").required().asString(),
};
