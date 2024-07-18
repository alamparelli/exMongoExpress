import express from 'express';

import { getConStatus, showErrors } from '../controllers/catchErrors.js';
import {
	createUser,
	deleteByCity,
	deleteId,
	deleteOneUser,
	dropEx1,
	getByAge,
	getCity,
	getDelete,
	getSum,
	getUsers,
	setActive40,
	setOne,
	updateAge,
} from '../controllers/controllers.js';
import { isBodyValuesValids } from '../middleWare/validateBody.js';

const router = express.Router();
//! Important to remember
router.use(express.json());
router.use(getConStatus);
router.use(isBodyValuesValids);

router.route('/createUser').post(createUser, showErrors); //and createone (post)
router.route('/users').get(getUsers); //*findall (get)
router.route('/city').get(getCity); //* find by City
router.route('/updateAge').put(updateAge); //* updateAge
router.route('/deleteOne').get(getDelete).delete(deleteOneUser); //* deletOne
router.route('/insertOne').put(setOne); //* insertOne
router.route('/age').get(getByAge); //* find by age
router.route('/setActive40').put(setActive40); //* add active status when age below 40
router.route('/deleteByCity').get(getUsers).delete(deleteByCity); //* deleteMany by City or City & Get all result
router.route('/sumBrussels').delete(getSum); //* Get sum of document where Brussels
router.route('/id').delete(deleteId);
router.route('/dropEx1').delete(dropEx1); //* delete

export default router;
