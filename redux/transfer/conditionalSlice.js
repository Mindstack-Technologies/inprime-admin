import { createSlice } from '@reduxjs/toolkit';

const conditionsSlice = createSlice({
  name: 'conditions',
  initialState: ['false', 'false'],
  reducers: {
    addCondition: (state) => {
      state.push('false');
    },
    updateCondition: (state, action) => {
      const { index, value } = action.payload;
      state[index] = value;
    },
  },
});

export const { addCondition, updateCondition } = conditionsSlice.actions;
export default conditionsSlice.reducer;
