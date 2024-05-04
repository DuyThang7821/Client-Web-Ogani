import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

export const setAuthToken = token => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

export default instance;