// import { createSlice } from '@reduxjs/toolkit';

// const multilineInputSlice = createSlice({
//   name: 'multilineInput',
//   initialState: [
//     { label: 'Input label', value: '' },
//   ],
//   reducers: {
//     addInput(state) {
//       state.push({ label: 'Input label', value: '' });
//     },
//     removeInput(state, action) {
//       const index = action.payload;
//       state.splice(index, 1);
//     },
//     updateInputLabel(state, action) {
//       const { index, label } = action.payload;
//       state[index].label = label;
//     },
//     updateInputValue(state, action) {
//       const { index, value } = action.payload;
//       state[index].value = value;
//     },
//   },
// });

// export const {
//   addInput,
//   removeInput,
//   updateInputLabel,
//   updateInputValue,
// } = multilineInputSlice.actions;
// export default multilineInputSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const multilineInputSlice = createSlice({
  name: 'multilineInput',
initialState: [{
    // id: "",
    // names: ['Condition', 'Condition'],
    // inputs: [['Input label'], ['Input label']],
    // inputTypes: [['text'], ['text']],
    // id: "",
    // names: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6'],
    // inputs: [['Input label'], ['Input label'], ['Input label'], ['Input label'], ['Input label'], ['Input label']],
    // inputTypes: [['text'], ['text'], ['text'], ['text'], ['text'], ['text']],

  
  }],
  reducers: {
    setLabelNamemultilineInput(state, action) {
      const { index, multiId, name } = action.payload;
    //   console.log("id in multilineInputSlice", multiId);
      let i = 0;
      for (let s of state) {
        console.log("state id", s.id);
        if (s.id == multiId) {
          state[i].names[index] = name;
        }
        i++;
      }
    },
    updateObjectmultilineInput(state, action) {
      const { object } = action.payload;
      state = object;
    },

    addLabelNamemultilineInput(state, action) {
      const multiId = action.payload;
      let i = 0;
      for (let s of state) {
        if (s.id == multiId) {
          console.log('going inside')
          state[i].names.push('Label');
          state[i].inputs.push(['Input label']);
          state[i].inputTypes.push(['text']);
        }
        i++;
      }
    },
    removeLabelNamemultilineInput(state, action) {
      const { index, multiId } = action.payload;
      let i = 0;
      for (let s of state) {
        if (s.id === multiId) {
          state[i].names.splice(index, 1);
          state[i].inputs.splice(index, 1);
          state[i].inputTypes.splice(index, 1);
        }
        i++;
      }
      // const { index } = action.payload;
      // state.names.splice(index, 1);
      // state.inputs.splice(index, 1);
      // state.inputTypes.splice(index, 1);
    },
    addInputmultilineInput(state, action) {
      const { index, multiId } = action.payload;

      let i = 0;
      for (let s of state) {
        console.log("state id", s.id);
        if (s.id == multiId) {
            console.log("state[i].inputTypes[index]",           state[i].inputTypes[index].push('text')            )
          state[i].inputs[index].push('Input label');
          state[i].inputTypes[index].push('text');
        }
        i++;
      }
    },
    removeInputmultilineInput(state, action) {
      const { conditionIndex, inputIndex, multiId } = action.payload;
      let i = 0;
      for (let s of state) {
        if (s.id == multiId) {
          if (state[i].inputs[conditionIndex].length > 1) {
            state[i].inputs[conditionIndex].splice(inputIndex, 1);
            state[i].inputTypes[conditionIndex].splice(inputIndex, 1);
          }
        }
        i++;
      }
    },
    setInputNamemultilineInput(state, action) {

      const { conditionIndex, inputIndex, name, multiId } = action.payload;
      let i = 0;
      for (let s of state) {
        if (s.id == multiId) {
          state[i].inputs[conditionIndex][inputIndex] = name;
        }
        i++;
      }
    },
    setInputTypemultilineInput(state, action) {
      const { conditionIndex, inputIndex, inputType, multiId } = action.payload;
      let i = 0;
      for (let s of state) {
        if (s.id == multiId) {
          state[i].inputTypes[conditionIndex][inputIndex] = inputType;
        }
        i++;
      }
    },
    setIDmultilineInput(state, action) {
      const id = action.payload;
      state[0].id = id;
    },
    appendNewComponentmultilineInput(state, action) {
      const { newComponent } = action.payload;
      console.log(newComponent)
      if (state[0].id == 0) {
        console.log("newComponent", newComponent)
        state[0].id = newComponent.id;
      } else {
        state.push(newComponent);
      }
    },
    updateInputSets(state, action) {
        // const {newInputs} = action.payload;
        // console.log("newInputs", newInputs)
        // state.inputSets = action.payload;
        const newInput = action.payload;
        state.inputSets.push(newInput);
    },
  
  },
});

export const {
  setLabelNamemultilineInput,
  addLabelNamemultilineInput,
  removeLabelNamemultilineInput,
  addInputmultilineInput,
  removeInputmultilineInput,
  setInputNamemultilineInput,
  setInputTypemultilineInput,
  updateObjectmultilineInput,
  setIDmultilineInput,
  appendNewComponentmultilineInput,
  updateInputSets,
} = multilineInputSlice.actions;
export default multilineInputSlice.reducer;

