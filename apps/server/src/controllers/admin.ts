import { Request, Response } from 'express';
import { Product } from '../models/product';
import {
  INVALID_REQUEST,
  ZOD_VALIDATION,
  productSchema,
  updateUserSchema
} from 'shared-types/index';
import { UploadedFile } from 'express-fileupload';
import saveToCloudinary from '../utils/saveToCloudinary';
import { User } from '../models/user';

export const createProduct = async (req: Request, res: Response) => {
  const validateProductData = productSchema.safeParse(JSON.parse(req.body.data));
  console.log('fdasfas', validateProductData);
  if (!validateProductData.success) {
    return res
      .status(400)
      .json({ error_code: ZOD_VALIDATION, error: validateProductData?.error?.format() });
  }

  // Images

  if (!req?.files) {
    return res
      .status(400)
      .json({ error_code: INVALID_REQUEST, message: 'Image is required for a product' });
  }
  const files = req?.files;

  const imgUrl = files.imgUrl as UploadedFile[];

  if (!imgUrl) {
    return res.status(400).json({
      error_code: INVALID_REQUEST,
      message: 'Atleast one image is required for a product'
    });
  }

  try {
    // Upload and save the images
    const imagesArray = await saveToCloudinary(imgUrl, {
      folder: process.env.PRODUCT_IMAGES_FOLDER_NAME
    });
    console.log(imagesArray);

    const product = await Product.create({ ...validateProductData.data, images: imagesArray });
    return res.status(201).json({
      message: 'Product Created successfully',
      product
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error_code: ZOD_VALIDATION, message: 'Something went wrong' });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    return res.status(200).json({
      message: 'All user fetched',
      user
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error_code: INVALID_REQUEST, message: 'Something went wrong' });
  }
};

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const validateUpdateData = updateUserSchema.safeParse(req.body);
    console.log(validateUpdateData);
    if (!validateUpdateData.success) {
      return res
        .status(400)
        .json({ error_code: ZOD_VALIDATION, error: validateUpdateData?.error?.format() });
    }

    const user = await User.findByIdAndUpdate(req.body.id, validateUpdateData.data, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    return res.status(201).json({
      message: 'User details updated successfully',
      user
    });
  } catch (err) {
    return res.status(500).json({ error_code: INVALID_REQUEST, message: 'Something went wrong' });
  }
};
