import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';

const toSortedByMostVotes = (anecdotes) =>
  anecdotes.toSorted((a, b) => b.votes - a.votes);

const sortByMostVotes = (anecdotes) =>
  anecdotes.sort((a, b) => b.votes - a.votes);

const createAnecdote = createAsyncThunk(
  'anecdotes/createAnecdote',
  async (content) => {
    return anecdoteService.create(content);
  },
);

const anecdoteReducer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action) {
      const index = state.findIndex((a) => a.id === action.payload);
      if (index === -1) {
        return;
      }
      state[index].votes += 1;
      sortByMostVotes(state);
    },
    setAnecdotes(state, action) {
      return toSortedByMostVotes(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAnecdote.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export { createAnecdote };

export const { vote, setAnecdotes } = anecdoteReducer.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteReducer.reducer;
