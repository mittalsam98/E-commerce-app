import { authenticateUser } from './../middlewares/auth';
import express from 'express';
import { getKey, checkout, paymentVerification } from '../controllers/payment';
import { createOrder } from '../controllers/order';

const router = express.Router();

router.get('/getkey', authenticateUser, getKey);
router.post('/checkout', authenticateUser, checkout);
router.post('/payment-verification', authenticateUser, paymentVerification, createOrder);

export default router;
