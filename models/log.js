import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
	date: {
		required: true,
		type: Date,
	},
	errorCode: {
		required: true,
		type: Number,
	},
	errorMessage: {
		required: true,
		type: [String, Object],
	},
});

export const Log = mongoose.model('ErrorLogs', LogSchema);
