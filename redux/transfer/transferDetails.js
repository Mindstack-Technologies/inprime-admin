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
// // labelSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const labelSlice = createSlice({
//   name: 'label',
//   initialState: {
//     id:"",
//     names: ['Condition', 'Condition'],
//     inputs: [['Input label'], ['Input label']],
//     inputTypes: [['text'], ['text']],
//   },
//   reducers: {
//     setLabelName(state, action) {
//       const { index, name } = action.payload;
//       state.names[index] = name;
//     },
//     addLabelName(state) {
//       state.names.push('Condition');
//       state.inputs.push(['Input label']);
//       state.inputTypes.push(['text']);
//     },
//     removeLabelName(state, action) {
//       state.names.splice(action.payload, 1);
//       state.inputs.splice(action.payload, 1);
//       state.inputTypes.splice(action.payload, 1);
//     },
//     addInput(state, action) {
//       state.inputs[action.payload].push('Input label');
//       state.inputTypes[action.payload].push('text');
//     },
//     removeInput(state, action) {
//       const { conditionIndex, inputIndex } = action.payload;
//       if (state.inputs[conditionIndex].length > 1) {
//         state.inputs[conditionIndex].splice(inputIndex, 1);
//         state.inputTypes[conditionIndex].splice(inputIndex, 1);
//       }
//     },
//     setInputName(state, action) {
//       const { conditionIndex, inputIndex, name } = action.payload;
//       state.inputs[conditionIndex][inputIndex] = name;
//     },
//     setInputType(state, action) {
//       const { conditionIndex, inputIndex, inputType } = action.payload;
//       state.inputTypes[conditionIndex][inputIndex] = inputType;
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
//   setInputType,
// } = labelSlice.actions;
// export default labelSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const labelSlice = createSlice({
  name: 'label',
  initialState: {
    id:"",
    names: ['Condition', 'Condition'],
    inputs: [['Input label'], ['Input label']],
    inputTypes: [['text'], ['text']],
  },
  reducers: {
    setLabelName(state, action) {
          // console.log("STATE", state);
          // console.log("payload",action);
 
          const { index, id, name  } = action.payload;
          console.log("STATE", state);
          console.log("payload",action);
 
          console.log(id);


          // let i = 0;
          // for(let s of state){
          //   console.log("state id",s.id);
          //   if(s.id == id){
          //     state[i].names[index] = name;
          //   }
          //   i++;
          // }
       


          


            state.names[index] = name;
    },
    updateObject(state, action){
      const { object } = action.payload;
      state = object;
    },
    // addLabelName(state, action) {
    //   const { id } = action.payload;
    //   const label = state.find(label => label.id === id);
    //   if (label) {
    //     label.names = [...label.names, 'Condition'];
    //     label.inputs = [...label.inputs, ['Input label']];
    //     label.inputTypes = [...label.inputTypes, ['text']];
    //   }
    // },
    // removeLabelName(state, action) {
    //   const { id, index } = action.payload;
    //   const label = state.find(label => label.id === id);
    //   if (label) {
    //     label.names = label.names.filter((_, i) => i !== index);
    //     label.inputs = label.inputs.filter((_, i) => i !== index);
    //     label.inputTypes = label.inputTypes.filter((_, i) => i !== index);
    //   }
    // },
    // addInput(state, action) {
    //   const { id, conditionIndex } = action.payload;
    //   const label = state.find(label => label.id === id);
    //   if (label && conditionIndex >= 0 && conditionIndex < label.inputs.length) {
    //     label.inputs[conditionIndex] = [...label.inputs[conditionIndex], 'Input label'];
    //     label.inputTypes[conditionIndex] = [...label.inputTypes[conditionIndex], 'text'];
    //   }
    // },
    // removeInput(state, action) {
    //   const { id, conditionIndex, inputIndex } = action.payload;
    //   const label = state.find(label => label.id === id);
    //   if (label && conditionIndex >= 0 && conditionIndex < label.inputs.length && inputIndex >= 0 && inputIndex < label.inputs[conditionIndex].length) {
    //     if (label.inputs[conditionIndex].length > 1) {
    //       label.inputs[conditionIndex] = label.inputs[conditionIndex].filter((_, i) => i !== inputIndex);
    //       label.inputTypes[conditionIndex] = label.inputTypes[conditionIndex].filter((_, i) => i !== inputIndex);
    //     }
    //   }
    // },
    // setInputName(state, action) {
    //   const { id, conditionIndex, inputIndex, name } = action.payload;
    //   const label = state.find(label => label.id === id);
    //   if (label && conditionIndex >= 0 && conditionIndex < label.inputs.length && inputIndex >= 0 && inputIndex < label.inputs[conditionIndex].length) {
    //     let newInputs = [...label.inputs];
    //     newInputs[conditionIndex][inputIndex] = name;
    //     label.inputs = newInputs;
    //   }
    // },
    // setInputType(state, action) {
    //   const { id, conditionIndex, inputIndex, inputType } = action.payload;
    //   const label = state.find(label => label.id === id);
    //   if (label && conditionIndex >= 0 && conditionIndex < label.inputTypes.length && inputIndex >= 0 && inputIndex < label.inputTypes[conditionIndex].length) {
    //     let newInputTypes = [...label.inputTypes];
    //     newInputTypes[conditionIndex][inputIndex] = inputType;
    //     label.inputTypes = newInputTypes;
    //   }
    // },
    //     addLabelName(state) {
    //   state.names.push('Condition');
    //   state.inputs.push(['Input label']);
    //   state.inputTypes.push(['text']);
    // },
    addLabelName(state) {
      console.log('Adding label name');

      console.log('New state:', state);

      state.names.push('Condition');
      state.inputs.push(['Input label']);
      state.inputTypes.push(['text']);
      console.log('New state updated:', state);

    
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
    setID(state, action){

      const {id}=action.payload;

      console.log("ID sent",id);
      // state[state.length - 1].id=id;

      console.log("STATE OF COMP",state);


    },
    appendNewComponent(state, action){
      const {newComponent}=action.payload;
      // state.push(newComponent);
      console.log(state)
    }
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
  updateObject,
  setID
} = labelSlice.actions;
export default labelSlice.reducer;
