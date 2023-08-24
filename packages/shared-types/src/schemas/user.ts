import { Types } from 'mongoose';
import { AddressParams } from '../zod-types/address';

export interface IPurchasedProducts {
  product: Types.ObjectId;
  purchaseDate: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  addresses: AddressParams[];
  purchasedProducts: IPurchasedProducts[];
  cart?: Types.ObjectId[];
  createdAt: string;
  updatedAt: string;
}
