import Axios from 'axios';

export const getBranch = () => {
  return {
    type: 'GET_BRANCH',
    payload: Axios.get('http://192.168.100.31:3001/api/branch/'),
  };
};

export const addBranch = (data, header) => {
  return {
    type: 'ADD_BRANCH',
    payload: Axios.post('http://192.168.100.31:3001/api/branch/', data, header),
  };
};

export const editBranch = (id, data, header) => {
  return {
    type: 'EDIT_BRANCH',
    payload: Axios.put(
      `http://192.168.100.31:3001/api/branch/${id}`,
      data,
      header,
    ),
  };
};

export const deleteBranch = (id, header) => {
  return {
    type: 'DELETE_BRANCH',
    payload: Axios.delete(
      `http://192.168.100.31:3001/api/branch/${id}`,
      header,
    ),
  };
};
