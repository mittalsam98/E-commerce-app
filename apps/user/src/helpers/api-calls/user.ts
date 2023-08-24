import http from '../utils/http';

export const getUserDetails = () => {
  return http
    .get(`/user/me`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const getAllPurchasedItem = () => {
  return http
    .get(`/user/purchases`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
