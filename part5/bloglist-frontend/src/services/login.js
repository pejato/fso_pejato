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

export default { login, token, getToken, setToken };
