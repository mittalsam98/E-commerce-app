import { Types } from 'mongoose';
import { IPurchasedProducts } from './user';
import { AddressParams } from '../zod-types/address';
export interface IOrder {
  user: Types.ObjectId;
  order: IPurchasedProducts[];
  address: AddressParams;
}
