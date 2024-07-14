import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	age: {
		max: 120,
		min: 1,
		required: true,
		type: Number,
	},
	city: {
		required: true,
		type: String,
	},
	name: {
		required: true,
		type: String,
	},
});

export const Student = mongoose.model('ExpressExercices', userSchema);
