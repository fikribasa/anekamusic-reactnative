import Axios from 'axios';

export const getCategories = () => {
  return {
    type: 'GET_CATEGORIES',
    payload: Axios.get('http://192.168.100.31:3001/api/categories/'),
  };
};

export const addCategory = (data, header) => {
  return {
    type: 'ADD_CATEGORY',
    payload: Axios.post(
      'http://192.168.100.31:3001/api/categories/',
      data,
      header,
    ),
  };
};

export const editCategory = (id, data, header) => {
  return {
    type: 'EDIT_CATEGORY',
    payload: Axios.put(
      `http://192.168.100.31:3001/api/categories/${id}`,
      data,
      header,
    ),
  };
};

export const deleteCategory = (id, header) => {
  return {
    type: 'DELETE_CATEGORY',
    payload: Axios.delete(
      `http://192.168.100.31:3001/api/categories/${id}`,
      header,
    ),
  };
};

export const setDisplay = status => {
  return {
    type: 'SET_DISPLAY',
    payload: status,
  };
};
