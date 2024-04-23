import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0,
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const anecdote = asObject(content);
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

export default {
  getAll,
  create,
};
