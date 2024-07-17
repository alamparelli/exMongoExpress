// OLD VERSION DEPRECATED --> check mDatabase.js
import { configDotenv } from 'dotenv';
import { MongoClient } from 'mongodb';

configDotenv();

const serverName = process.env.MONGODBSRV;
const userName = process.env.USERNAME;
const password = process.env.PASSWORD;
const authDatabase = process.env.AUTHDB;
let mongoClientInstance = null;
const connectionOption = {
	maxPoolSize: 10,
};

class Database {
	constructor() {
		this.connection = null;
		this.client = null;
	}

	async connect() {
		if (this.connection) {
			console.log('Already connected');
			return;
		}
		try {
			const uri = `mongodb://${userName}:${password}@${serverName}/${authDatabase}`;
			this.client = new MongoClient(uri, connectionOption);
			await this.client.connect();
			this.connection = this.client;
		} catch (error) {
			console.error('Error connecting to the database:', error.message);
			throw error;
		}
	}

	async disconnect() {
		if (!this.connection) {
			console.log('No Active Sessions to close');
		}
		try {
			this.connection = null;
			console.log('Successfully disconnected from the database.');
		} catch (error) {
			console.error('Error disconnecting from the database:', error.message);
			throw error;
		}
	}

	getClient() {
		if (!this.client) {
			console.log('No active database client.');
			return null;
		}
		return this.client;
	}

	getConnection() {
		if (!this.connection) {
			console.log('No active database connection.');
			return null;
		}
		return this.connection;
	}
}

export async function connectToDb() {
	if (!mongoClientInstance) {
		mongoClientInstance = new Database();
		//! important, corrigé avec GPT
		await mongoClientInstance.connect();
		console.log('Database Connected Successfully');
	}
	return mongoClientInstance;
}
