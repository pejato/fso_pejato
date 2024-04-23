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

const vote = createAsyncThunk('anecdotes/vote', async (anecdote) => {
  const payload = { id: anecdote.id, votes: anecdote.votes + 1 };
  return anecdoteService.update(payload);
});

const anecdoteReducer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeAnecdotes.fulfilled, (state, action) => {
        return toSortedByMostVotes(action.payload);
      })
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.push(action.payload);
        sortByMostVotes(state);
      })
      .addCase(vote.fulfilled, (state, action) => {
        const index = state.findIndex((a) => a.id === action.payload.id);
        if (index === -1) {
          state.push(action.payload);
        } else {
          state[index] = action.payload;
        }
        sortByMostVotes(state);
      });
  },
});

export { initializeAnecdotes, createAnecdote, vote };
export default anecdoteReducer.reducer;
