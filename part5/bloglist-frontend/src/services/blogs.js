import axios from 'axios';
import loginService from './login';

const baseUrl = '/api/blogs';

const makeAuthHeader = () => {
  return { Authorization: loginService.getToken() };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (blog) => {
  const config = { headers: { ...makeAuthHeader() } };
  const request = axios.post(baseUrl, blog, config);
  return request.then((response) => response.data);
};

const update = (updatedBlog) => {
  const config = { headers: { ...makeAuthHeader() } };
  const request = axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config,
  );
  return request.then((response) => response.data);
};

export default { getAll, create, update };
