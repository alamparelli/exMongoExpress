/* eslint-disable sort-imports */
import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { connectionOption, uri } from './db/mDatabase.js';
import routes from './routes/exercice.js';

configDotenv();

const app = express();
const port = process.env.SERVER_PORT;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(routes);

mongoose
	.connect(uri, connectionOption)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error('MongoDB connection error:', err));

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
