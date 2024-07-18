import { Student } from '../models/students.js';

export const getUsers = async (req, res) => {
	try {
		const answer = await Student.find();
		res.status(200).json(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const getCity = async (req, res) => {
	try {
		if (!req.body.city) {
			throw new Error();
		}
		let query = { city: req.body.city };
		const answer = await Student.find(query);
		res.status(200).json(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const getDelete = async (req, res) => {
	try {
		if (!req.body.name) {
			throw new Error();
		}
		let query = { name: req.body.name };
		const answer = await Student.find(query);
		await res.status(200).send(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const getByAge = async (req, res) => {
	try {
		if (!req.body.age) {
			throw new Error();
		}
		let query = { age: { $gte: Number(req.body.age) } };
		const answer = await Student.find(query);
		res.json(answer);
	} catch (error) {
		res.status(406).send('Cannot filter by age');
	}
};

export const getSum = async (req, res) => {
	try {
		const pipeline = [
			{ $match: { city: 'Brussels' } },
			{ $group: { _id: '$city', count: { $sum: 1 } } },
		];
		const answer = await Student.aggregate(pipeline);
		res.json(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const createUser = async (req, res) => {
	try {
		const answer = await Student.insertMany(req.body);
		await res.send(answer);
	} catch (error) {
		res.status(406).json(error);
	}
};

export const updateAge = async (req, res) => {
	try {
		if (!req.body.age || !req.body.name) {
			throw new Error();
		}
		let query = { name: req.body.name };
		let update = {
			$set: { age: Number(req.body.age), lastModified: Date.now() },
		};
		const before = await Student.find(query);
		const _answer = await Student.updateMany(query, update);
		const after = await Student.find(query);
		let response = { _answer, after, before };
		await res.status(201).send(response);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const deleteOneUser = async (req, res) => {
	try {
		if (!req.body.name) {
			throw new Error('Name is Required');
		}
		let query = { name: req.body.name };
		const answer = await Student.deleteOne(query);
		await res.status(201).send(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const setOne = async (req, res) => {
	try {
		const newStudent = new Student({
			age: req.body.age,
			city: req.body.city,
			name: req.body.name,
		});
		newStudent.save();
		await res.status(201).send(newStudent);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const setActive40 = async (req, res) => {
	try {
		let query = { age: { $lte: 40 } };
		let update = { $set: { status: 'active' } };
		const answer = await Student.updateMany(query, update);
		await res.status(201).send(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};

export const deleteByCity = async (req, res) => {
	try {
		let query = { city: { $in: ['Ghent', 'Brussels'] } };
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
	try {
		let query = { _id: req.body._id };
		const answer = await Student.findByIdAndDelete(query);
		await res.send(answer);
	} catch (error) {
		res.status(406).send(error);
	}
};
