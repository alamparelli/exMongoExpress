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
import { getConStatus } from '../controllers/dbErrors.js';

const router = express.Router();
//! Important to remember
router.use(express.json());
router.use(getConStatus);

router.route('/createUser').post(setEx1); //and createone (post)
router.route('/users').get(getEx1); //*findall (get)
router.route('/city').get(getEx3); //* find by City
router.route('/updateAge').put(setEx4); //* updateAge
router.route('/deleteOne/:name').get(getEx5).delete(setEx5); //* deletOne
router.route('/insertOne').put(setEx6); //* insertOne
router.route('/age').get(getEx7); //* find by age
router.route('/age/:age').get(getEx7); //* find by age
router.route('/setActive40').put(setEx8); //* add active status when age below 40
router.route('/deleteByCity').get(getEx1).delete(setEx9); //* deleteMany by City or City & Get all result
router.route('/sumBrussels').delete(getEx10); //* Get sum of document where Brussels
router.route('/id/:id').delete(deleteId);
router.route('/dropEx1').delete(dropEx1); //* delete

export default router;
