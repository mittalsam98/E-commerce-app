import express from 'express';
import { signup, signin } from '../controllers/user';

const router = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/login', signin);

export default router;
