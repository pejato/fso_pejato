import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';

function AnecdoteList() {
  const anecdotes = useSelector((state) => {
    if (!state.filter.value) {
      return state.anecdotes;
    }
    return state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.value.toLowerCase()),
    );
  });

  const dispatch = useDispatch();

  const onAnecdoteClick = (anecdote) => {
    dispatch(vote(anecdote.id));
    showNotificationWithTimeout(dispatch, `Voted for '${anecdote.content}'`);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => onAnecdoteClick(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default AnecdoteList;
