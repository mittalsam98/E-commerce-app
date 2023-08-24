import express from 'express';
import { getUserDetails, getAllPurchasedItems } from '../controllers/user';
import { admin, authenticateUser } from '../middlewares/auth';

const router = express.Router();

router.get('/user/purchases', authenticateUser, getAllPurchasedItems);
router.get('/user/me', authenticateUser, getUserDetails);

//TO-DO
router.post('/user/address/add', authenticateUser);

export default router;
