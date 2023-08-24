import { Request, Response } from 'express';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth';
import productRoutes from './routes/product';
import cartRoutes from './routes/cart';
import userRoute from './routes/user';
import paymentRoute from './routes/payment';
import adminRoute from './routes/admin';
import connectDB from './config/db';
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();
// middleware
app.use(express.static('dist/public'));
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true
  })
);

// Routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoute);
app.use('/api', cartRoutes);
app.use('/api', paymentRoute);
app.use('/api', adminRoute);

app.get('/ping', (req: Request, res: Response) => {
  return res.send('pong');
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Server Listen
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
