import { isBodyValuesValids } from '../middleWare/validateBody.js';
import { Student } from '../models/students.js';

export const getUsers = async (req, res, next) => {
	try {
		const answer = await Student.find();
		res.status(200).json(answer);
	} catch (error) {
		error.block = 'getUsers';
		next(error);
	}
};

export const getCity = async (req, res, next) => {
	try {
		if (!isBodyValuesValids(req.body)) {
			throw new Error('City should be a string');
		}
		if (!req.body.city) {
			throw new Error('City is Required');
		}
		let query = { city: req.body.city };
		const answer = await Student.find(query);
	} catch (error) {
		error.block = 'getCity';
		next(error);
	}
};

export const getDelete = async (req, res, next) => {
	try {
		if (!isBodyValuesValids(req.body)) {
			throw new Error('Name should be a string');
		}
		if (!req.body.name) {
			throw new Error('Name is Required');
		}
		let query = { name: req.body.name };
		const answer = await Student.find(query);
		await res.status(200).send(answer);
	} catch (error) {
		error.block = 'getDelete';
		next(error);
	}
};

export const getByAge = async (req, res, next) => {
	try {
		if (!isBodyValuesValids(req.body)) {
			throw new Error('Age should be a Number');
		}
		if (!req.body.age) {
			throw new Error('Age is Required');
		}
		let query = { age: { $gte: Number(req.body.age) } };
		const answer = await Student.find(query);
		res.json(answer);
	} catch (error) {
		error.block = 'getByAge';
		next(error);
	}
};

export const getSum = async (req, res, next) => {
	try {
		const pipeline = [
			{ $match: { city: 'Brussels' } },
			{ $group: { _id: '$city', count: { $sum: 1 } } },
		];
		const answer = await Student.aggregate(pipeline);
		res.json(answer);
	} catch (error) {
		error.block = 'getSum';
		next(error);
	}
};

export const createUser = async (req, res, next) => {
	try {
		if (!isBodyValuesValids(req.body)) {
			throw new Error({
				age: 'should be a number (min 1, max 120)',
				city: 'should be a string',
				name: 'should be a string',
			});
		}
		const answer = await Student.insertMany(req.body);
		res.send(answer);
	} catch (error) {
		error.block = 'createUser';
		next(error);
	}
};

export const updateAge = async (req, res, next) => {
	try {
		if (!isBodyValuesValids(req.body)) {
			throw new Error({
				age: 'should be a number (min 1, max 120)',
				name: 'should be a string',
			});
		}
		if (!req.body.age || !req.body.name) {
			throw new Error('Age & Name are Required');
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
		error.block = 'updateAge';
		next(error);
	}
};

export const deleteOneUser = async (req, res, next) => {
	try {
		if (!isBodyValuesValids(req.body)) {
			throw new Error({
				name: 'should be a string',
			});
		}
		if (!req.body.name) {
			throw new Error('Name is Required');
		}
		let query = { name: req.body.name };
		const answer = await Student.deleteOne(query);
		await res.status(201).send(answer);
	} catch (error) {
		error.block = 'deleteOneUser';
		next(error);
	}
};

export const setOne = async (req, res, next) => {
	try {
		if (!isBodyValuesValids(req.body)) {
			throw new Error({
				age: 'should be a number (min 1, max 120)',
				city: 'should be a String',
				name: 'should be a string',
			});
		}
		const newStudent = new Student({
			age: req.body.age,
			city: req.body.city,
			name: req.body.name,
		});
		newStudent.save();
		await res.status(201).send(newStudent);
	} catch (error) {
		error.block = 'setOne';
		next(error);
	}
};

export const setActive40 = async (req, res, next) => {
	try {
		let query = { age: { $lte: 40 } };
		let update = { $set: { status: 'active' } };
		const answer = await Student.updateMany(query, update);
		await res.status(201).send(answer);
	} catch (error) {
		error.block = 'setActive40';
		next(error);
	}
};

export const deleteByCity = async (req, res, next) => {
	try {
		let query = { city: { $in: ['Ghent', 'Brussels'] } };
		const answer = await Student.deleteMany(query);
		await res.status(201).send(answer);
	} catch (error) {
		error.block = 'deleteByCity';
		next(error);
	}
};

export const dropEx1 = async (req, res, next) => {
	try {
		const answer = await Student.drop();
		await res.send(answer);
	} catch (error) {
		error.block = 'dropEx1';
		next(error);
	}
};

export const deleteId = async (req, res, next) => {
	try {
		if (!isBodyValuesValids(req.body)) {
			throw new Error({
				_id: 'should be a valid ID in the DB',
			});
		}
		let query = { _id: req.body._id };
		const answer = await Student.findByIdAndDelete(query);
		await res.send(answer);
	} catch (error) {
		error.block = 'deleteId';
		next(error);
	}
};
