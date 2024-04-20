import axios from 'axios';

const baseUrl = '/api/login';
let token = null;

const setToken = (t) => {
  token = `Bearer ${t}`;
};
const getToken = () => {
  return token;
};

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  setToken(response.data.token);
  return response.data;
};

const listenForUnauthenticated = (onUnauthed) => {
  axios.interceptors.response.use(null, (error) => {
    if (error?.response?.status === 401) {
      window.localStorage.removeItem('blogListUser');
      setToken(null);
      onUnauthed(error);
    }
    return Promise.reject(error);
  });
};

export default { login, token, getToken, setToken, listenForUnauthenticated };
