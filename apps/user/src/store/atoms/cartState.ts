import { atom } from 'recoil';
import { IProductSchema } from 'shared-types/index';

export const cartState = atom<IProductSchema[]>({
  key: 'cartState',
  default: []
});
