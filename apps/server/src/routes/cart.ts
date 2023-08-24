import express from 'express';
import { admin, authenticateUser } from '../middlewares/auth';
import { addToCart, deleteCartItem, getAllCartItems } from '../controllers/cart';

const router = express.Router();

router.post('/user/add-to-cart/:id', authenticateUser, addToCart);
router.post('/user/delete-from-cart/:id', authenticateUser, deleteCartItem);
router.get('/user/cart', authenticateUser, getAllCartItems);

export default router;
