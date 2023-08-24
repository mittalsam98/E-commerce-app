import { AddressParams } from 'shared-types';
import http from '../utils/http';
import { RazorpayResponse } from '../utils/types';

export const getKey = () => {
  return http
    .get(`/getkey`)
    .then((res) => {
      return res.data.key;
    })
    .catch((err) => {
      throw err;
    });
};
export const checkout = (price: number) => {
  console.log(price);
  const data = {
    price: price
  };
  return http
    .post(`/checkout`, data)
    .then((res) => {
      return res.data.order;
    })
    .catch((err) => {
      throw err;
    });
};
export const paymentVerification = (data: RazorpayResponse, address: AddressParams) => {
  return http
    .post(`/payment-verification`, { data, address })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
