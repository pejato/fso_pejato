import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

function NewAnecdote() {
  const dispatch = useDispatch();
  const onSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>create new</h2>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  );
}

export default NewAnecdote;
