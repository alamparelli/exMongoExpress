import { Log } from '../models/log.js';

export const log = async (err, req, res, next) => {
	const newLog = new Log(res.log);
	newLog.save();
	console.log('saved');
};
