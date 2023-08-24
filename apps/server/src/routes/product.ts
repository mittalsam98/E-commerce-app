import express from 'express';
import { getAllProducts, getProduct } from '../controllers/product';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/product/:id', getProduct);

export default router;
