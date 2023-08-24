import express from 'express';
import { createProduct, getAllUser, updateUserDetails } from '../controllers/admin';
import { admin, authenticateUser } from '../middlewares/auth';
import { getAllOrders } from '../controllers/order';

const router = express.Router();

router.post('/admin/create', authenticateUser, admin, createProduct);
router.get('/admin/all-users', authenticateUser, admin, getAllUser);
router.post('/admin/update-users', authenticateUser, admin, updateUserDetails);
router.get('/admin/all-orders', authenticateUser, admin, getAllOrders);

export default router;
