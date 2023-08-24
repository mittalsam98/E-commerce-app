import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import { User } from '../models/user';
import Razorpay from 'razorpay';
import { Product } from '../models/product';
import { INVALID_REQUEST } from 'shared-types';

export const getKey = async (req: Request, res: Response) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
};

export const checkout = async (req: Request, res: Response) => {
  const { price } = req.body;
  const user = await User.findOne({ email: req.user.email });

  // Create a instance of Razorpay
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY as string,
    key_secret: process.env.RAZORPAY_APT_SECRET as string
  });

  if (!user) {
    return res.status(500).json({
      error_code: INVALID_REQUEST,
      message: 'User not found'
    });
  }

  try {
    const options = {
      amount: Number(price * 100),
      currency: 'INR'
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order
    });
  } catch (e) {
    res.status(500).json({
      error_code: INVALID_REQUEST,
      message: 'An error occurred while purchasing the items'
    });
  }
};

export const paymentVerification = (req: Request, res: Response, next: NextFunction) => {
  const {
    data: { razorpay_order_id, razorpay_payment_id, razorpay_signature },
    address
  } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_APT_SECRET!)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    req.address = address;
    next();
  } else {
    res.status(400).json({
      error_code: INVALID_REQUEST,
      message: 'Payment verification failed'
    });
  }
};
