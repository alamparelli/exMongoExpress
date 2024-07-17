import { Student } from '../models/students.js';

export const getEx1 = async (req, res) => {
	try {
		const answer = await Student.find();
		res.status(200).json(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const getEx3 = async (req, res) => {
	const value = req.body.city;
	if (typeof value !== 'string') {
		res.status(406).send({ error: 'String Expected' });
	} else {
		try {
			let query = { city: value };
			const answer = await Student.find(query);
			res.status(200).json(answer);
		} catch (error) {
			res.status(406).send(error);
		}
	}
};

export const getEx5 = async (req, res) => {
	let query = { name: req.params.name };
	try {
		const answer = await Student.find(query);
		res.json(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const getEx7 = async (req, res) => {
	let response = { age: { $gte: Number(req.params.age) } };
	try {
		const answer = await Student.find(response);
		res.json(answer);
	} catch (error) {
		res.status(406).send('Cannot filter by age');
	}
};

export const getEx10 = async (req, res) => {
	const pipeline = [
		{ $match: { city: 'Brussels' } },
		{ $group: { _id: '$city', count: { $sum: 1 } } },
	];
	try {
		const answer = await Student.aggregate(pipeline);
		res.json(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const setEx1 = async (req, res) => {
	try {
		const answer = await Student.insertMany(req.body);
		await res.send(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const setEx4 = async (req, res) => {
	const ageValue = req.body.age;
	const nameValue = req.body.name;
	console.log(typeof ageValue);
	console.log(typeof nameValue);
	if (
		typeof nameValue !== 'string' ||
		typeof ageValue !== 'number' ||
		ageValue < 1 ||
		ageValue > 120
	) {
		res.status(406).send({
			errorNumber: { max: 120, min: 1, typoeOf: 'Number expected for age' },
			errorString: 'String Expected for name',
		});
	} else {
		let query = { name: nameValue };
		let update = { $set: { age: Number(ageValue), lastModified: Date.now() } };
		try {
			const before = await Student.find(query);
			const _answer = await Student.updateMany(query, update);
			const after = await Student.find(query);
			let response = { _answer, after, before };
			await res.status(201).send(response);
		} catch (error) {
			res.status(406).send(error);
		}
	}
};

export const setEx5 = async (req, res) => {
	let query = { name: req.params.name };
	try {
		const answer = await Student.deleteOne(query);
		await res.status(201).send(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const setEx6 = async (req, res) => {
	try {
		const { age, city, name } = req.body;
		const newStudent = new Student({ age: age, city: city, name: name });
		newStudent.save();
		await res.status(201).send(newStudent);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const setEx8 = async (req, res) => {
	let query = { age: { $lte: 40 } };
	let update = { $set: { status: 'active' } };
	try {
		const answer = await Student.updateMany(query, update);
		await res.status(201).send(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const setEx9 = async (req, res) => {
	let query = { city: { $in: ['Ghent', 'Brussels'] } };
	try {
		const answer = await Student.deleteMany(query);
		await res.status(201).send(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const dropEx1 = async (req, res) => {
	try {
		const answer = await Student.drop();
		await res.send(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const deleteId = async (req, res) => {
	let query = { _id: req.params.id };
	try {
		const answer = await Student.findByIdAndDelete(query);
		await res.send(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};
