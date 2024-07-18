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

export const honeyPot = async (req, res, next) => {
	res
		.status(404)
		.json({ Error: 'Not Found xD', path: `${req.params.otherPages}` });
	res.log = {
		date: Date.now(),
		errorCode: 404,
		errorMessage: `Path Not Found :  ${req.params.otherPages}`,
	};
	next();
};

export const showErrors = async (err, req, res, next) => {
	let httpCode;
	switch (err.code) {
		case 11000:
			httpCode = 500;
			break;
		case 404:
			httpCode = 500;
			break;
		default:
			httpCode = 500;
			break;
	}
	res.status(httpCode).json(err);
	res.log = {
		date: Date.now(),
		errorCode: httpCode,
		errorMessage: err,
	};
	next(); // next will be another middleware to create the logs
};
