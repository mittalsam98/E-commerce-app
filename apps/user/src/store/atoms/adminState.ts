import { atom } from 'recoil';
import { UpdateUserSchemaParams } from 'shared-types/index';

export const editUser = atom<UpdateUserSchemaParams>({
  key: 'editUser',
  default: {
    id: '',
    firstName: '',
    lastName: '',
    isAdmin: false,
    email: ''
  }
});
