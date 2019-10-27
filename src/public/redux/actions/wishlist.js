import Axios from 'axios';

export const getWishlist = (id, header) => {
  return {
    type: 'GET_WISHLIST',
    payload: Axios.get(`http://192.168.100.31:3001/api/wishlist/${id}`, header),
  };
};

export const addWishlist = (user, item, header) => {
  return {
    type: 'ADD_WISHLIST',
    payload: Axios.post(
      `http://192.168.100.31:3001/api/wishlist/${user}/${item}`,
      {},
      header,
    ),
  };
};

export const deleteWishlist = (user, item, header) => {
  return {
    type: 'DELETE_WISHLIST',
    payload: Axios.delete(
      `http://192.168.100.31:3001/api/wishlist/${user}/${item}`,
      header,
    ),
  };
};

export const resetWishlist = () => {
  return {
    type: 'RESET_WISHLIST',
  };
};
