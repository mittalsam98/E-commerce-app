import { SignInParams, SignupParams } from 'shared-types/index';
import http from '../utils/http';

export const signup = (user: SignupParams) => {
  return http
    .post(`/auth/signup`, user)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const signin = (user: SignInParams) => {
  return http
    .post(`/auth/login`, user)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
