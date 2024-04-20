import axios from 'axios';
import loginService from './login';

const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (blog) => {
  const config = { headers: { Authorization: loginService.getToken() } };
  const request = axios.post(baseUrl, blog, config);
  return request.then((response) => response.data);
};

export default { getAll, create };
