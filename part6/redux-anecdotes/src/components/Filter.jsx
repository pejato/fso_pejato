import { useDispatch } from 'react-redux';
import React from 'react';
import { filterChange } from '../reducers/filterReducer';

function VisibilityFilter() {
  const dispatch = useDispatch();
  const style = {
    marginBottom: 10,
  };
  return (
    <div style={style}>
      filter
      <input
        name="anecdote-filter"
        onChange={(e) => dispatch(filterChange(e.target.value))}
      />
    </div>
  );
}

export default VisibilityFilter;
