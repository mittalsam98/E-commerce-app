import { IUser } from './user';

export interface IImages {
  id: string;
  imgUrl: string;
}
export interface IReviews {
  comment: string;
  rating: number;
  name: string;
}
export interface IProductSchema {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: IImages[];
  reviews: IReviews[];
  countInStock: number;
  sold: number;
}
