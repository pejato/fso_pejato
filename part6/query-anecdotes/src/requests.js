import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const create = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

export const update = async (update) => {
  const response = await axios.patch(`${baseUrl}/${update.id}`, update);
  return response.data;
};
