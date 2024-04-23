import { createSlice } from '@reduxjs/toolkit';

const toSortedByMostVotes = (anecdotes) =>
  anecdotes.toSorted((a, b) => b.votes - a.votes);

const sortByMostVotes = (anecdotes) =>
  anecdotes.sort((a, b) => b.votes - a.votes);

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
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return toSortedByMostVotes(action.payload);
    },
  },
});

export const { vote, createAnecdote, setAnecdotes } = anecdoteReducer.actions;
export default anecdoteReducer.reducer;
