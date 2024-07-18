import mongoose from 'mongoose';

import { Logs } from '../models/log.js';

export const getConStatus = async (req, res, next) => {
	try {
		const status = mongoose.connection.readyState;
		if (status === 0) {
			throw new Error();
		} else {
			next();
		}
	} catch (error) {
		res.status(500).send({
			error: 'Connection with DB cannot be established!',
			readyState: 0,
		});
	}
};

export const errorHandler = (err, req, res, next) => {
	//console.error(err.stack); // Log de l'erreur
	if (!err.code) {
		err.code = 500;
	}
	res
		.status(err.code)
		.json({ error: err.message, message: 'Something went wrong!' }); // Réponse JSON avec le message d'erreur
	next({
		block: err.block,
		code: err.code,
		date: Date.now(),
		message: err.message,
		method: err.method,
	});
};

export const toLog = async (err, req, res, next) => {
	const newLog = new Logs(err);
	await newLog.save();
	console.log(err);
};

export const honeyPot = async (req, res, next) => {
	const error = new Error(`Path not found ${req.url}`);
	error.method = req.method;
	error.code = 404;
	error.block = 'honeyPot';
	next(error);
};
