import http from '../utils/http';

export const addToUserCart = (id: string | undefined) => {
  return http
    .post(`/user/add-to-cart/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const deleteFromUserCart = (id: string) => {
  return http
    .post(`/user/delete-from-cart/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const getCartItems = () => {
  return http
    .get(`/user/cart`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
