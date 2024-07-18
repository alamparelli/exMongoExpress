export function isBodyValuesValids(body) {
	let isValid = true;
	let errorMessages = { ErrorType: 'Validation' };
	if (body.name) {
		let nameValue = body.name;
		if (typeof nameValue !== 'string') {
			isValid = false;
		}
	}
	if (body.city) {
		let cityValue = body.city;
		if (typeof cityValue !== 'string') {
			isValid = false;
		}
	}
	if (body.age) {
		let ageValue = body.age;
		if (typeof ageValue !== 'number' || ageValue < 1 || ageValue > 120) {
			isValid = false;
		}
	}
	if (body._id) {
		let id = body._id;
		if (typeof id !== 'string') {
			isValid = false;
		}
	}
	return isValid;
}
