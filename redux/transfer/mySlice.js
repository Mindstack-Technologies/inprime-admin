// import { createSlice } from '@reduxjs/toolkit';

// const mySlice = createSlice({
//     name: 'mySlice',
//     initialState: {
//       inputSets: [],
//     },
//     reducers: {
//       setInputSets(state, action) {
//         state.inputSets = action.payload;
//       },
//     },
//   });
  
//   export const { setInputSets } = mySlice.actions;


// // mySlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const mySlice = createSlice({
//   name: 'mySlice',
//   initialState: {
//     inputSets: [],
//   },
//   reducers: {
//     updateInputSets(state, action) {
//       state.inputSets = action.payload;
//       console.log("inputSetsSlice", inputSets)
//     },
//   },
// });

// export const { updateInputSets } = mySlice.actions;
// export default mySlice;


import { createSlice } from '@reduxjs/toolkit';

const mySlice = createSlice({
  name: 'mySlice',
  initialState: {
    inputSets: [],
  },
  reducers: {
    addInputSet(state, action) {
      const newInput = action.payload;
      state.inputSets.push(newInput);
    },
    removeInputSet(state, action) {
      const setIndex = action.payload;
      if (state.inputSets.length > 1) {
        state.inputSets = state.inputSets.filter((_, index) => index !== setIndex);
      }
    },
  },
});

export const { addInputSet, removeInputSet } = mySlice.actions;
export default mySlice;