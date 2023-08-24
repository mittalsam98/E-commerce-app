import http from '../utils/http';

export const getAllProducts = () => {
  return http
    .get(`/products`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const getProduct = (id: string | undefined) => {
  return http
    .get(`/product/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
