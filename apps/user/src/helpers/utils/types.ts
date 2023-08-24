import { AddressParams, IImages } from 'shared-types/index';
import { IProductSchema, IUser } from 'shared-types';

export type ApiError = {
  error_code: string;
  message?: string;
  error?: {
    [key: string]: {
      _errors: string[];
    };
  };
};

export type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type PurchasesState = {
  product: IProductSchema;
  purchaseDate: string;
};

export type OrderState = {
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  products: [
    {
      product: { id: string; name: string; images: IImages[] };
      purchaseDate: Date;
    }
  ];
  address: AddressParams;
};
