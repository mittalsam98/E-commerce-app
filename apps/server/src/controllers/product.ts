import { Request, Response } from 'express';
import { Product } from '../models/product';
import { INVALID_REQUEST, ZOD_VALIDATION, productSchema } from 'shared-types/index';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      message: 'Products fetched successfully ',
      products
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error_code: INVALID_REQUEST, message: 'Something went wrong' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  if (!productId) {
    return res
      .status(400)
      .json({ error_code: INVALID_REQUEST, message: 'Product ID is required to get a product' });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(500)
        .json({ error_code: INVALID_REQUEST, message: 'Product not available' });
    }

    return res.status(200).json({
      success: true,
      product
    });
  } catch (err) {
    return res.status(500).json({ error_code: INVALID_REQUEST, message: 'Something went wrong' });
  }
};
