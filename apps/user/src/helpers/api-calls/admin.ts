import http from '../utils/http';
import axios from 'axios';
import { getToken } from '../utils/localstorage';
import { BASE_URL } from '../utils/constant';
import { UpdateUserSchemaParams } from 'shared-types';

export const getAllUsers = () => {
  return http
    .get(`/admin/all-users`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const createProduct = (data: FormData) => {
  return axios
    .post(`${BASE_URL}admin/create`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const updateUser = (data: UpdateUserSchemaParams) => {
  return http
    .post(`/admin/update-users`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getAllOrder = () => {
  return http
    .get(`/admin/all-orders`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
