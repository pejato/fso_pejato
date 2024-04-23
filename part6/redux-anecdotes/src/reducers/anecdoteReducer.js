import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';

const toSortedByMostVotes = (anecdotes) =>
  anecdotes.toSorted((a, b) => b.votes - a.votes);

const sortByMostVotes = (anecdotes) =>
  anecdotes.sort((a, b) => b.votes - a.votes);

const initializeAnecdotes = createAsyncThunk(
  'anecdotes/initializeAnecdotes',
  async () => {
    return anecdoteService.getAll();
  },
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAnecdotes.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export { initializeAnecdotes, createAnecdote };

export const { vote } = anecdoteReducer.actions;

export default anecdoteReducer.reducer;
