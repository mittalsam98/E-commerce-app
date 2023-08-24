import mongoose from 'mongoose';
import { IOrder } from 'shared-types/index';

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    order: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        purchaseDate: Date
      }
    ],
    address: {
      city: { type: String, required: true },
      zipCode: { type: Number, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      phoneNumber: { type: Number, required: true }
    }
  },
  {
    timestamps: true
  }
);

export const Order = mongoose.model('Order', orderSchema);
