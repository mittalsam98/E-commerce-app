import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { getToken } from '../../helpers/utils/localstorage';
import { PurchasesState } from '../../helpers/utils/types';

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: 'userState',
  default: {
    isAdmin: false,
    user: {
      _id: '',
      firstName: '',
      lastName: '',
      email: ''
    }
  },
  effects_UNSTABLE: [persistAtom]
});

export const authTokenState = atom<string | null>({
  key: 'authToken',
  default: getToken() || null
});

export const purchasesState = atom<PurchasesState[]>({
  key: 'purchasesState',
  default: []
});
