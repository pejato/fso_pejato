import { createSlice } from '@reduxjs/toolkit';

const filterReducer = createSlice({
  name: 'filter',
  initialState: { value: null },
  reducers: {
    filterChange(state, action) {
      state.value = action.payload;
    },
  },
});

export const { filterChange } = filterReducer.actions;
export default filterReducer.reducer;
