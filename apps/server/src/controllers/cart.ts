import { Request, Response } from 'express';
import { Product } from '../models/product';
import { INVALID_REQUEST, IProductSchema, ProductParams } from 'shared-types/index';
import { User } from '../models/user';
import { Types } from 'mongoose';

export const addToCart = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id as unknown as Types.ObjectId;
    const userId = req.user?._id;
    const user = await User.findById(userId);

    const product = await Product.findById(productId);

    if (!user || !product) {
      return res
        .status(404)
        .json({ error_code: INVALID_REQUEST, message: 'User or product not found' });
    }

    if (user.cart && user.cart.includes(productId)) {
      return res.status(400).json({ error_code: INVALID_REQUEST, message: 'Already in your cart' });
    } else {
      const cart = [productId];

      const updatedUserCart = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { cart: cart } },
        { new: true }
      );
      try {
        if (!updatedUserCart) {
          return res.status(404).json({
            error_code: INVALID_REQUEST,
            message: 'User not found after update'
          });
        }
        return res.status(200).json(updatedUserCart);
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          error_code: INVALID_REQUEST,
          message: 'Unable to save purchase list'
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error_code: INVALID_REQUEST,
      message: 'Some error occurred'
    });
  }
};

export const getAllCartItems = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId).populate('cart', '-__v');

    if (!user) {
      return res.status(404).json({ error_code: INVALID_REQUEST, message: 'User not found' });
    }

    if (user.cart) {
      return res.status(201).json({
        message: 'All cart items fetched successfully',
        cart: user.cart
      });
    } else {
      return res.status(400).json({ error_code: INVALID_REQUEST, message: 'Your Cart is empty' });
    }
  } catch (err) {
    return res.status(500).json({ error_code: INVALID_REQUEST, message: 'Some error occurred' });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id as unknown as Types.ObjectId;
    const userId = req.user?._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error_code: INVALID_REQUEST, message: 'User not found' });
    }

    if (!user.cart || !user.cart.includes(productId)) {
      return res
        .status(400)
        .json({ error_code: INVALID_REQUEST, message: 'Item not found in your cart' });
    } else {
      const updatedCart = user.cart.filter(
        (cartProductId) => cartProductId.toString() !== productId.toString()
      );

      const updatedUserCart = await User.findByIdAndUpdate(
        { _id: userId },
        { cart: updatedCart },
        { new: true }
      );

      if (!updatedUserCart) {
        return res.status(404).json({
          error_code: INVALID_REQUEST,
          message: 'User not found after update'
        });
      }

      return res.status(200).json({ message: 'Item deleted successfully' });
    }
  } catch (err) {
    return res.status(500).json({
      error_code: INVALID_REQUEST,
      message: 'Some error occurred'
    });
  }
};
