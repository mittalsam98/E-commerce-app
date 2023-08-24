import mongoose from 'mongoose';
import { IUser } from 'shared-types/index';

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    addresses: [
      {
        city: String,
        zipCode: String,
        state: String,
        country: String,
        phoneNumber: String
      }
    ],
    purchasedProducts: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        purchaseDate: Date
      }
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model('User', userSchema);
