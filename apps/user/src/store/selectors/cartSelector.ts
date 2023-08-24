import { selector } from 'recoil';
import { cartState } from '../atoms/cartState';

// Return the count of cart item
export const cartTotalPriceSelector = selector({
  key: 'cartTotalPriceSelector',
  get: ({ get }) => {
    const cartItem = get(cartState);
    let totalPrice: number = 0;

    if (cartItem.length === 0) {
      return 0;
    } else {
      cartItem.forEach((item) => (totalPrice += item.price));
      return Math.round(totalPrice * 100) / 100;
    }
  }
});
