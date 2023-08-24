import { Request, Response } from 'express';
import { User } from '../models/user';
import { Product } from '../models/product';
import { INVALID_REQUEST } from 'shared-types';
import { Order } from '../models/order';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { _id, cart } = req.user;
    const { address } = req;

    const purchasedProducts = [];

    // Add to the order whatever is in the user's cart
    for (const productId of cart) {
      const product = await Product.findById(productId);
      if (product) {
        purchasedProducts.push({ product: productId, purchaseDate: new Date() });
      }
    }

    if (!purchasedProducts.length) {
      return res
        .status(500)
        .json({ error_code: INVALID_REQUEST, message: 'It seems your cart is empty' });
    }

    const order = new Order({
      user: _id,
      order: purchasedProducts,
      address: address
    });

    await order.save();

    // Update the user's purchasedProducts array
    await User.findByIdAndUpdate(_id, { $push: { purchasedProducts } }, { new: true });

    // Clear the user's cart
    await User.findByIdAndUpdate(req.user._id, { $pull: { cart: { $in: cart } } }, { new: true });

    res.status(200).json({ success: true, message: 'Order created successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ error_code: INVALID_REQUEST, error: 'An error occurred during order creation' });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('user', 'email firstName lastName');

    // Map through orders to retrieve product details
    const ordersWithProductDetails = await Promise.all(
      orders.map(async (order) => {
        const productDetails = await Promise.all(
          order.order.map(async (productItem) => {
            const product = await Product.findById(productItem.product).select('name images');
            return {
              product: product ? product : null,
              purchaseDate: productItem.purchaseDate
            };
          })
        );

        return {
          user: order.user,
          products: productDetails,
          address: order.address
        };
      })
    );

    res.status(200).json({ success: true, orders: ordersWithProductDetails });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching orders' });
  }
};
