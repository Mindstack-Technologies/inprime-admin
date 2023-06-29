// import {createSlice} from '@reduxjs/toolkit';

// const profileSlice =createSlice ({
//     name: 'profile',
//     initialState :{
//         name: 'empty',

// },
//     reducers: {
//         SET_NAME(state, action){
//             console.log("huhuuh")
//             state.name =action. payload
//         }
//     }
// })

// export const {SET_NAME} = profileSlice.actions

// export default profileSlice.reducer



// // labelSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const labelSlice = createSlice({
//   name: 'label',
//   initialState: {
//     name: 'Condition',
//   },
//   reducers: {
//     setLabelName(state, action) {
//       state.name = action.payload;
//     },
//   },
// });

// export const { setLabelName } = labelSlice.actions;
// export default labelSlice.reducer;


// // Updated labelSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const labelSlice = createSlice({
//   name: 'label',
//   initialState: {
//     names: ['Condition', 'Conditions'],
//   },
//   reducers: {
//     setLabelName(state, action) {
//       const { index, name } = action.payload;
//       state.names[index] = name;
//     },
//   },
// });

// export const { setLabelName } = labelSlice.actions;
// export default labelSlice.reducer;

// // Updated with addmore labelSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const labelSlice = createSlice({
//   name: 'label',
//   initialState: {
//     names: ['Condition', 'Condition'],
//   },
//   reducers: {
//     setLabelName(state, action) {
//       const { index, name } = action.payload;
//       state.names[index] = name;
//     },
//     addLabelName(state) {
//       state.names.push('Condition');
//     },
//     removeLabelName(state, action) {
//       state.names.splice(action.payload, 1);
//     },
//   },
// });

// export const { setLabelName, addLabelName, removeLabelName } = labelSlice.actions;
// export default labelSlice.reducer;


// //updated with add more conditon label and the input  labelSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const labelSlice = createSlice({
//   name: 'label',
//   initialState: {
//     names: ['Condition', 'Condition'],
//     inputs: [[false], [false]],
//   },
//   reducers: {
//     setLabelName(state, action) {
//       const { index, name } = action.payload;
//       state.names[index] = name;
//     },
//     addLabelName(state) {
//       state.names.push('Condition');
//       state.inputs.push([false]);
//     },
//     removeLabelName(state, action) {
//       state.names.splice(action.payload, 1);
//       state.inputs.splice(action.payload, 1);
//     },
//     addInput(state, action) {
//       state.inputs[action.payload].push(false);
//     },
//     removeInput(state, action) {
//       const { conditionIndex, inputIndex } = action.payload;
//       if (state.inputs[conditionIndex].length > 1) {
//         state.inputs[conditionIndex].splice(inputIndex, 1);
//       }
//     },
//   },
// });

// export const {
//   setLabelName,
//   addLabelName,
//   removeLabelName,
//   addInput,
//   removeInput,
// } = labelSlice.actions;
// export default labelSlice.reducer;





// // labelSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const labelSlice = createSlice({
//   name: 'label',
//   initialState: {
//     names: ['Condition', 'Condition'],
//     inputs: [['Input label'], ['Input label']],
//   },
//   reducers: {
//     setLabelName(state, action) {
//       const { index, name } = action.payload;
//       state.names[index] = name;
//     },
//     addLabelName(state) {
//       state.names.push('Condition');
//       state.inputs.push(['Input label']);
//     },
//     removeLabelName(state, action) {
//       state.names.splice(action.payload, 1);
//       state.inputs.splice(action.payload, 1);
//     },
//     addInput(state, action) {
//       state.inputs[action.payload].push('Input label');
//     },
//     removeInput(state, action) {
//       const { conditionIndex, inputIndex } = action.payload;
//       if (state.inputs[conditionIndex].length > 1) {
//         state.inputs[conditionIndex].splice(inputIndex, 1);
//       }
//     },
//     setInputName(state, action) {
//       const { conditionIndex, inputIndex, name } = action.payload;
//       state.inputs[conditionIndex][inputIndex] = name;
//     },
//   },
// });

// export const {
//   setLabelName,
//   addLabelName,
//   removeLabelName,
//   addInput,
//   removeInput,
//   setInputName,
// } = labelSlice.actions;
// export default labelSlice.reducer;



// updated with input and file
// labelSlice.js
import { createSlice } from '@reduxjs/toolkit';

const labelSlice = createSlice({
  name: 'label',
  initialState: {
    names: ['Condition', 'Condition'],
    inputs: [['Input label'], ['Input label']],
    inputTypes: [['text'], ['text']],
  },
  reducers: {
    setLabelName(state, action) {
      const { index, name } = action.payload;
      state.names[index] = name;
    },
    addLabelName(state) {
      state.names.push('Condition');
      state.inputs.push(['Input label']);
      state.inputTypes.push(['text']);
    },
    removeLabelName(state, action) {
      state.names.splice(action.payload, 1);
      state.inputs.splice(action.payload, 1);
      state.inputTypes.splice(action.payload, 1);
    },
    addInput(state, action) {
      state.inputs[action.payload].push('Input label');
      state.inputTypes[action.payload].push('text');
    },
    removeInput(state, action) {
      const { conditionIndex, inputIndex } = action.payload;
      if (state.inputs[conditionIndex].length > 1) {
        state.inputs[conditionIndex].splice(inputIndex, 1);
        state.inputTypes[conditionIndex].splice(inputIndex, 1);
      }
    },
    setInputName(state, action) {
      const { conditionIndex, inputIndex, name } = action.payload;
      state.inputs[conditionIndex][inputIndex] = name;
    },
    setInputType(state, action) {
      const { conditionIndex, inputIndex, inputType } = action.payload;
      state.inputTypes[conditionIndex][inputIndex] = inputType;
    },
  },
});

export const {
  setLabelName,
  addLabelName,
  removeLabelName,
  addInput,
  removeInput,
  setInputName,
  setInputType,
} = labelSlice.actions;
export default labelSlice.reducer;
