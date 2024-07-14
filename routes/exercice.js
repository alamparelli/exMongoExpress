/* eslint-disable sort-imports */
import express from 'express';

import {
	deleteId,
	dropEx1,
	getEx1,
	getEx10,
	getEx3,
	getEx5,
	getEx7,
	setEx1,
	setEx4,
	setEx5,
	setEx6,
	setEx8,
	setEx9,
} from '../controllers/controllers.js';

const router = express.Router();
//! Important to remember
router.use(express.json());

router.route('/ex1').get(getEx1).post(setEx1); //*findall (get) and insertMany (post)
router.route('/ex3').get(getEx3); //*find all
router.route('/ex3/:city').get(getEx3); //* find by City
router.route('/ex4/:name/:age').post(setEx4); //* updateAge
router.route('/ex5/:name').get(getEx5).post(setEx5); //* deletOne
router.route('/dropEx1').post(dropEx1); //* delete
router.route('/ex6').post(setEx6); //* insertOne
router.route('/ex7').get(getEx7); //* find by age
router.route('/ex7/:age').get(getEx7); //* find by age
router.route('/ex8').post(setEx8); //* add active status when age below 40
router.route('/ex9').get(getEx1).post(setEx9); //* deleteMany by City or City & Get all result
router.route('/ex10').get(getEx10); //* Get sum of document where Brussels
router.route('/id/:id').post(deleteId);

export default router;
