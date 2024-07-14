import { configDotenv } from 'dotenv';

configDotenv();

const serverName = process.env.MONGODBSRV;
const userName = process.env.USERNAME;
const password = process.env.PASSWORD;
const authDatabase = process.env.AUTHDB;
export const connectionOption = {
	maxPoolSize: 10,
};

export const uri = `mongodb://${userName}:${password}@${serverName}/${authDatabase}`;
