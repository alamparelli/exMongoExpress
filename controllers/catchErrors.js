import mongoose from 'mongoose';

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

export const showErrors = async (err, req, res, next) => {
	console.log(err.message); // base pour EX 10 -> log dans db ou file.
	res.status(500).json(err);
	next(); // next will be another middleware to create the logs
};
