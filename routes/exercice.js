import express from 'express';

import { getConStatus } from '../controllers/catchErrors.js';
import {
	createUser,
	deleteId,
	dropEx1,
	getEx1,
	getEx10,
	getEx3,
	getEx5,
	getEx7,
	setEx5,
	setEx6,
	setEx8,
	setEx9,
	updateAge,
} from '../controllers/controllers.js';
import { isBodyValuesValids } from '../middleWare/validateBody.js';

const router = express.Router();
//! Important to remember
router.use(express.json());
router.use(getConStatus);

router.route('/createUser').post(isBodyValuesValids, createUser); //and createone (post)
router.route('/users').get(getEx1); //*findall (get)
router.route('/city').get(getEx3); //* find by City
router.route('/updateAge').put(updateAge); //* updateAge
router.route('/deleteOne').get(getEx5).delete(setEx5); //* deletOne
router.route('/insertOne').put(setEx6); //* insertOne
router.route('/age').get(getEx7); //* find by age
router.route('/setActive40').put(setEx8); //* add active status when age below 40
router.route('/deleteByCity').get(getEx1).delete(setEx9); //* deleteMany by City or City & Get all result
router.route('/sumBrussels').delete(getEx10); //* Get sum of document where Brussels
router.route('/id').delete(deleteId);
router.route('/dropEx1').delete(dropEx1); //* delete

export default router;
