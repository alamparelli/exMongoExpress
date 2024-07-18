export const isBodyValuesValids = async (req, res, next) => {
	let isValid = true;
	let errorMessage = {};
	if (req.body.name) {
		let nameValue = req.body.name;
		if (typeof nameValue !== 'string') {
			isValid = false;
			errorMessage.Name = {
				typoeOf: 'String expected for name',
			};
		}
	}
	if (req.body.age) {
		let ageValue = req.body.age;
		if (typeof ageValue !== 'number' || ageValue < 1 || ageValue > 120) {
			isValid = false;
			errorMessage.Number = {
				max: 120,
				min: 1,
				typoeOf: 'Number expected for age',
			};
		}
	}
	if (!isValid) {
		res.status(406).json(errorMessage);
	} else {
		next();
	}
};
