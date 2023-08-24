import mongoose from 'mongoose';
import { IProductSchema } from 'shared-types/index';

const productSchema = new mongoose.Schema<IProductSchema>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  countInStock: { type: Number, default: 1 },
  category: {
    type: String,
    required: false
  },
  images: [{ id: String, imgUrl: { type: String, required: true } }],
  reviews: [
    {
      _id: false,
      comment: String,
      rating: Number,
      name: String
    }
  ],
  sold: { type: Number, default: 0 }
});

productSchema.index({ name: 'text' });

export const Product = mongoose.model('Product', productSchema);
