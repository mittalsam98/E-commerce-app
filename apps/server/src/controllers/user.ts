import { Request, Response } from 'express';
import { loginSchema, signupSchema, ZOD_VALIDATION, INVALID_REQUEST } from 'shared-types/index';
import { User } from '../models/user';
import generateToken from '../utils/jwt-token';
// Use the schemas in your controller or other backend logic

export const signup = async (req: Request, res: Response) => {
  try {
    // Validate the request body against the signup schema
    const validateSignUpData = signupSchema.safeParse(req.body);
    if (!validateSignUpData.success) {
      return res
        .status(400)
        .json({ error_code: ZOD_VALIDATION, error: validateSignUpData?.error?.format() });
    }

    const email = validateSignUpData.data.email;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error_code: INVALID_REQUEST, message: 'User already exists' });
    }

    const user = await User.create(validateSignUpData.data);

    if (user) {
      const token = generateToken(user._id);
      res.status(200).json({ message: 'User Created Successful', user, token });
    } else {
      res.status(400);
      return res.status(400).json({ error_code: INVALID_REQUEST, message: 'Invalid user data' });
    }
  } catch (error) {
    return res.status(400).json({ error_code: INVALID_REQUEST, message: 'Sign up user failed' });
  }
};

export const signin = async (req: Request, res: Response) => {
  const validateSigninData = loginSchema.safeParse(req.body);
  if (!validateSigninData.success) {
    return res
      .status(400)
      .json({ error_code: ZOD_VALIDATION, error: validateSigninData?.error?.format() });
  }

  const email = validateSigninData.data.email;
  const password = validateSigninData.data.password;

  const user = await User.findOne({ email, password }).select('firstName lastName isAdmin email');
  if (user) {
    const token = generateToken(user._id);
    res.status(200).json({ message: 'Logged in successfully', token, user });
  } else {
    res.status(403).json({ error_code: INVALID_REQUEST, message: 'Email does not exist ' });
  }
};

export const getAllPurchasedItems = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId).populate('purchasedProducts.product', '-__v');

    if (!user) {
      return res.status(404).json({ error_code: INVALID_REQUEST, message: 'User not found' });
    }

    if (user.cart) {
      return res.status(201).json({
        message: 'All purchases items fetched successfully',
        purchases: user.purchasedProducts
      });
    } else {
      return res.status(400).json({ error_code: INVALID_REQUEST, message: 'Your Cart is empty' });
    }
  } catch (err) {
    return res.status(500).json({ error_code: INVALID_REQUEST, message: 'Some error occurred' });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?._id).select('firstName lastName isAdmin email');

    res.status(200).json({
      message: 'User Details fetched successful',
      user
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error_code: INVALID_REQUEST, message: 'Something went wrong' });
  }
};

// export const addAddress = async (req: Request, res: Response) => {
//   try {
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error_code: INVALID_REQUEST, message: 'Something went wrong' });
//   }
// };

// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const validateSignUpData = signupSchema.safeParse(req.body);
//     if (!validateSignUpData.success) {
//       return res
//         .status(400)
//         .json({ error_code: ZOD_VALIDATION, error: validateSignUpData?.error?.format() });
//     }

//     const user = await User.findByIdAndUpdate(req.user?._id, validateSignUpData, {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false
//     });

//     return res.status(201).json({
//       message: 'User Details updated successful',
//       user
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error_code: INVALID_REQUEST, message: 'Something went wrong' });
//   }
// };
