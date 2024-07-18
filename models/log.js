import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
	block: {
		required: true,
		type: String,
	},
	code: {
		required: true,
		type: String,
	},
	date: {
		required: true,
		type: Date,
	},
	message: {
		required: true,
		type: String,
	},
	method: {
		required: false,
		type: String,
	},
});

export const Logs = mongoose.model('logs', LogSchema);
