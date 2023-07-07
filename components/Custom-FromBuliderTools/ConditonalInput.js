// import React, { useState } from 'react';
// import MyInput from './MyInput';
// // import { Registry } from 'react-form-builder2';
// // import MyInput from './MyInput';

// const MyConditionalInput = React.forwardRef((props, ref) => {
//   const [conditions, setConditions] = useState([false]);

//   const handleCheckboxChange = (index) => (event) => {
//     const newConditions = [...conditions];
//     newConditions[index] = event.target.checked;
//     setConditions(newConditions);
//   };

//   const handleAddCondition = () => {
//     setConditions([...conditions, false]);
//   };
//   console.log(props);
//   return (
//     <div>
//       {conditions.map((condition, index) => (
//         <div key={index} >
//           <label>
//             Condition {index + 1}:
//             <input
//               type="checkbox"
//               checked={condition}
//               onChange={handleCheckboxChange(index)}
//               ref={ref}
//             />
//           </label>
//           <MyInput></MyInput>

//           {/* {condition && (
// //             <label>
// //               Input {index + 1}:
// //               <input type="text"              
// //             //    ref={Ref}
// // />
// //             </label>
// <MyInput></MyInput>
//           )} */}
//         </div>
//       ))}
//       <button onClick={handleAddCondition}>Add Condition</button>
//       <p>test</p>
//     </div>
//   );
// });

// // Registry.register('MyConditionalInput', MyConditionalInput);
// export default MyConditionalInput;


// import React from 'react';
// import { FormElement } from 'react-form-builder2';

// class CustomElement extends FormElement {
//   static toolbarEntry() {
//     return {
//       element: 'CustomElement',
//       name: 'Custom Element',
//       group: 'Custom',
//       icon: 'fa fa-star',
//     };
//   }

//   static defaultOptions() {
//     return {
//       label: 'Custom Element',
//       choices: [
//         { value: 'choice1', label: 'Choice 1', input: '' },
//         { value: 'choice2', label: 'Choice 2', input: '' },
//       ],
//     };
//   }

//   renderComponent() {
//     const { choices } = this.props.data;
//     const { value } = this.state;

//     return (
//       <div>
//         <label>{this.props.data.label}</label>
//         <select
//           className="form-control"
//           value={value}
//           onChange={(e) => this.setState({ value: e.target.value })}
//         >
//           {choices.map((choice) => (
//             <option key={choice.value} value={choice.value}>
//               {choice.label}
//             </option>
//           ))}
//         </select>
//         {choices
//           .filter((choice) => choice.value === value)
//           .map((choice) => (
//             <input
//               key={choice.value}
//               type="text"
//               className="form-control"
//               placeholder={`Input for ${choice.label}`}
//               defaultValue={choice.input}
//               onBlur={(e) => {
//                 choice.input = e.target.value;
//                 this.setState({ choices });
//               }}
//             />
//           ))}
//       </div>
//     );
//   }
// }

// export default CustomElement;

// import React, { useState } from 'react';
// import { FormElement } from 'react-form-builder2';

// const CustomElement = React.forwardRef((props) => {
//   const [value, setValue] = useState('');

//   const { choices } = props.data;
//   console.log(props.data)
//   return (
//     <div>
//       <label>{props.data.label}</label>
//       <select
//         className="form-control"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//       >
//         {choices.map((choice) => (
//           <option key={choice.value} value={choice.value}>
//             {choice.label}
//           </option>
//         ))}
//       </select>
//       {value === 'choice1' && (
//         <input type="text" className="form-control" placeholder="Input for Choice 1" />
//       )}
//       {value === 'choice2' && (
//         <input type="file" className="form-control" />
//       )}
//     </div>
//   );
// });

// // CustomElement.toolbarEntry = () => {
// //   return {
// //     element: 'CustomElement',
// //     name: 'Custom Element',
// //     group: 'Custom',
// //     icon: 'fa fa-star',
// //   };
// // };

// CustomElement.defaultOptions = () => {
//   return {
//     label: 'Custom Element',
//     choices: [
//       { value: 'choice1', label: 'Choice 1' },
//       { value: 'choice2', label: 'Choice 2' },
//     ],
//   };
// };

// export default CustomElement;



// import React, { useState } from 'react';

// const CustomElement = (props) => {
//   const [value, setValue] = useState('');

//   const { choices } = props.data;
//   console.log(props.data)

//   return (
//     <div>
//       <label>{props.data.label}</label>
//       <select
//         className="form-control"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//       >
//         {choices.map((choice) => (
//           <option key={choice.value} value={choice.value}>
//             {choice.label}
//           </option>
//         ))}
//       </select>
//       {value === 'choice1' && (
//         <input type="text" className="form-control" placeholder="Input for Choice 1" />
//       )}
//       {value === 'choice2' && (
//         <input type="file" className="form-control" />
//       )}
//     </div>
//   );
// };

// // CustomElement.toolbarEntry = () => {
// //   return {
// //     element: 'CustomElement',
// //     name: 'Custom Element',
// //     group: 'Custom',
// //     icon: 'fa fa-star',
// //   };
// // };

// CustomElement.defaultOptions = () => {
//   return {

//     label: 'Custom Element',
//     choices: [
//       { value: 'choice1', label: 'Choice 1' },
//       { value: 'choice2', label: 'Choice 2' },
//     ],
//   };
// };

// export default CustomElement;


// import React, { useState } from 'react';

// const ConditionalInput = (props) => {
//   const [value, setValue] = useState('');

//   const { choices } = props.data;

//   return (
//     <div>
//       <label>{props.data.label}</label>
//       <select
//         className="form-control"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//       >
//         {choices?.map((choice) => (
//           <option key={choice.value} value={choice.value}>
//             {choice.label}
//           </option>
//         ))}
//       </select>
//       {value === 'choice1' && (
//         <input type="text" className="form-control" placeholder="Input for Choice 1" />
//       )}
//       {value === 'choice2' && (
//         <input type="file" className="form-control" />
//       )}
//     </div>
//   );
// };

// ConditionalInput.toolbarEntry = () => {
//   return {
//     element: 'CustomElement',
//     name: 'Conditional Input',
//     group: 'Custom',
//     icon: 'fa fa-star',
//   };
// };

// ConditionalInput.defaultOptions = () => {
//   return {
//     label: 'Conditional Input',
//     choices: [
//       { value: 'choice1', label: 'Choice 1' },
//       { value: 'choice2', label: 'Choice 2' },
//     ],
//   };
// };

// export default ConditionalInput;






// import React, { useState } from 'react';

// const ConditionalInput = ({ options }) => {
//   console.log(options)
//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const selectedOptionInputs =
//     selectedOption && options.find((option) => option.value === selectedOption).inputs;

//   return (
//     <div>
//       <label>Select an option:</label>
//       {options?.map((option) => (
//         <div key={option.value}>
//           <input
//             type="radio"
//             name="conditionalInputOption"
//             value={option.value}
//             onChange={handleOptionChange}
//           />
//           <label>{option.label}</label>
//         </div>
//       ))}

//       {selectedOptionInputs &&
//         selectedOptionInputs.map((input, index) => (
//           <div key={index}>
//             <label>Enter input for {selectedOption}:</label>
//             <input type={input.type} />
//           </div>
//         ))}
//     </div>
//   );
// };

// export default ConditionalInput;



// import React, { useState } from 'react';
// import { ElementStore } from 'react-form-builder2';
// import MyInput from './MyInput';


// import { SET_NAME } from '../../redux/transfer/transferDetails'
// import { useDispatch, useSelector } from 'react-redux';

// const MyConditionalInput = React.forwardRef((props, ref) => {


//   const dispatch = useDispatch()

//   const store = useSelector((store) => store)

//   console.log(store)

//   const [conditions, setConditions] = useState([false, false]);
//   // ElementStore.dispatch("updateOrder", ["123", "456"] );
//   // store.dispatch('updateOrder', data);
//   const handleCheckboxChange = (index) => (event) => {
//     const newConditions = [...conditions];
//     newConditions[index] = event.target.checked;
//     setConditions(newConditions);

//   };

//   const handleAddCondition = () => {
//     setConditions([...conditions, false]);
//   };

//   dispatch(SET_NAME("nothing"))

//   console.log("props", props)
//   // props.nothing = "test"

//   // [
//   //   1: {
//   //     label: "ASdad",
//   //     input : {
//   //       label: "",
//   //       placeholder: ""
//   //     }
//   //   }]
//   // ]

//   // const {testing} = useSelector((state) => state.profile)
//   // console.log(JSON.stringify(testing.name))

//   console.log(store.profile.name)
//   // dispatch(SET_NAME(name.current.value))

//   return (
//     <div>
//       <div>
//         {/* {conditions.slice(0, 2).map((condition, index) => ( */}
//         {conditions.map((condition, index) => (

//           <div key={index}>
//             <label>
//               Condition {index + 1}:
//               <input
//                 type="checkbox"
//                 checked={condition}
//                 onChange={handleCheckboxChange(index)}
//                 ref={ref}

//               />
//             </label>
//           </div>
//         ))}
//       </div>
//       {conditions.slice(0, 2).map((condition, index) =>
//         condition ? (
//           <div key={index}>
//             <input data="test" />
//           </div>
//         ) : null
//       )}
//       <button onClick={handleAddCondition}>Add Condition</button>
//     </div>
//   );
// });

// export default MyConditionalInput;




// // MyConditionalInput.js
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { SET_NAME } from '../../redux/transfer/transferDetails';

// const MyConditionalInput = React.forwardRef((props, ref) => {
//   const dispatch = useDispatch();
//   const store = useSelector((store) => store);
//   console.log(store);

//   const [conditions, setConditions] = useState([false, false]);
//   const handleCheckboxChange = (index) => (event) => {
//     const newConditions = [...conditions];
//     newConditions[index] = event.target.checked;
//     setConditions(newConditions);
//   };

//   const handleAddCondition = () => {
//     setConditions([...conditions, false]);
//   };

//   // dispatch(SET_NAME('nothing'));
//   console.log('props', props);
//   // console.log(store.profile.name);

//   const labelName = useSelector((state) => state.label.name);

//   console.log("Mycondittianal input", labelName)

//   return (
//     <div>
//       <div>
//         {conditions.map((condition, index) => (
//           <div key={index}>
//             <label>
//               {labelName} {index + 1}:
//               <input
//                 type="checkbox"
//                 checked={condition}
//                 onChange={handleCheckboxChange(index)}
//                 ref={ref}
//               />
//             </label>
//           </div>
//         ))}
//       </div>
//       {conditions.slice(0, 2).map((condition, index) =>
//         condition ? (
//           <div key={index}>
//             <input data="test" />
//           </div>
//         ) : null
//       )}
//       <button onClick={handleAddCondition}>Add Condition</button>
//     </div>
//   );
// });

// export default MyConditionalInput;



// // Updated MyConditionalInput.js
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { SET_NAME } from '../../redux/transfer/transferDetails';

// const MyConditionalInput = React.forwardRef((props, ref) => {
//   const dispatch = useDispatch();
//   const store = useSelector((store) => store);
//   console.log(store);

//   const [conditions, setConditions] = useState([false, false]);
//   const handleCheckboxChange = (index) => (event) => {
//     const newConditions = [...conditions];
//     newConditions[index] = event.target.checked;
//     setConditions(newConditions);
//   };

//   const handleAddCondition = () => {
//     setConditions([...conditions, false]);
//   };

//   // dispatch(SET_NAME('nothing'));
//   console.log('props', props);
//   // console.log(store.profile.name);

//   const labelNames = useSelector((state) => state.label.names);

//   {console.log("checking label name in conditon",labelNames)}

//   return (
//     <div>
//       <div>
//         {conditions.map((condition, index) => (
//           <div key={index}>
//             <label>
//               {labelNames[index]} {index + 1}:
//               <input
//                 type="checkbox"
//                 checked={condition}
//                 onChange={handleCheckboxChange(index)}
//                 ref={ref}
//               />
//             </label>
//           </div>
//         ))}
//       </div>
//       {conditions.slice(0, 2).map((condition, index) =>
//         condition ? (
//           <div key={index}>
//             <input data="test" />
//           </div>
//         ) : null
//       )}
//       <button onClick={handleAddCondition}>Add Condition</button>
//     </div>
//   );
// });

// export default MyConditionalInput;

// // MyConditionalInput.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { SET_NAME } from '../../redux/transfer/transferDetails';

// const MyConditionalInput = React.forwardRef((props, ref) => {
//   const dispatch = useDispatch();
//   const store = useSelector((store) => store);
//   console.log(store);

//   const [conditions, setConditions] = useState([false, false]);
//   const handleCheckboxChange = (index) => (event) => {
//     const newConditions = [...conditions];
//     newConditions[index] = event.target.checked;
//     setConditions(newConditions);
//   };

//   const handleAddCondition = () => {
//     setConditions([...conditions, false]);
//   };

//   // dispatch(SET_NAME('nothing'));
//   console.log('props', props);
//   // console.log(store.profile.name);

//   const labelNames = useSelector((state) => state.label.names);

//   useEffect(() => {
//     setConditions((conditions) =>
//       conditions.length < labelNames.length
//         ? [...conditions, ...Array(labelNames.length - conditions.length).fill(false)]
//         : conditions.slice(0, labelNames.length)
//     );
//   }, [labelNames.length]);

//   return (
//     <div>
//       <div>
//         {conditions.map((condition, index) => (
//           <div key={index}>
//             <label>
//               {labelNames[index]} {index + 1}:
//               <input
//                 type="radio"
//                 checked={condition}
//                 onChange={handleCheckboxChange(index)}
//                 ref={ref}
//               />
//             </label>
//           </div>
//         ))}
//       </div>
//       {conditions.map((condition, index) =>
//         condition ? (
//           <div key={index}>
//             <input data="test" />
//           </div>
//         ) : null
//       )}
//       <button onClick={handleAddCondition}>Add Condition</button>
//     </div>
//   );
// });

// export default MyConditionalInput;




// // Updated version with radio button and ristriction MyConditionalInput.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { SET_NAME } from '../../redux/transfer/transferDetails';

// const MyConditionalInput = React.forwardRef((props, ref) => {
//   const dispatch = useDispatch();
//   const store = useSelector((store) => store);
//   console.log(store);

//   const [conditions, setConditions] = useState([false, false]);
//   const handleCheckboxChange = (index) => (event) => {
//     setConditions((conditions) =>
//       conditions.map((condition, i) => (i === index ? event.target.checked : false))
//     );
//   };

//   // dispatch(SET_NAME('nothing'));
//   console.log('props', props);
//   // console.log(store.profile.name);

//   const labelNames = useSelector((state) => state.label.names);

//   useEffect(() => {
//     setConditions((conditions) =>
//       conditions.length < labelNames.length
//         ? [...conditions, ...Array(labelNames.length - conditions.length).fill(false)]
//         : conditions.slice(0, labelNames.length)
//     );
//   }, [labelNames.length]);

//   return (
//     <div>
//       <div>
//         {conditions.map((condition, index) => (
//           <div key={index}>
//             <label>
//               {/* {labelNames[index]} {index + 1}: */}
//               {labelNames[index]} {index + 1}:
//               <input
//                 type="radio"
//                 checked={condition}
//                 onChange={handleCheckboxChange(index)}
//                 ref={ref}
//               />
//             </label>
//           </div>
//         ))}
//       </div>
//       {conditions.map((condition, index) =>
//         condition ? (
//           <div key={index}>
//             <input data="test" />
//           </div>
//         ) : null
//       )}
//     </div>
//   );
// });

// export default MyConditionalInput;



// //  Updated version with radio button and ristriction and the more input MyConditionalInput.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { SET_NAME } from '../../redux/transfer/transferDetails';

// const MyConditionalInput = React.forwardRef((props, ref) => {
//   const dispatch = useDispatch();
//   const store = useSelector((store) => store);
//   console.log(store);

//   const [conditions, setConditions] = useState([
//     { active: false },
//     { active: false },
//   ]);
//   // const handleCheckboxChange = (index) => (event) => {
//   //   setConditions((conditions) =>
//   //     conditions.map((condition, i) =>
//   //       i === index ? { ...condition, active: event.target.checked } : condition
//   //     )
//   //   );
//   // };
//   const handleCheckboxChange = (index) => (event) => {
//     setConditions((conditions) =>
//       conditions.map((condition, i) =>
//         i === index ? { ...condition, active: event.target.checked } : { ...condition, active: false }
//       )
//     );
//   };

//   // dispatch(SET_NAME('nothing'));
//   console.log('props', props);
//   // console.log(store.profile.name);

//   const labelNames = useSelector((state) => state.label.names);
//   const inputs = useSelector((state) => state.label.inputs);
//   console.log('conditional input', inputs);

//   useEffect(() => {
//     setConditions((conditions) =>
//       conditions.length < labelNames.length
//         ? [
//             ...conditions,
//             ...Array(labelNames.length - conditions.length).fill({
//               active: false,
//             }),
//           ]
//         : conditions.slice(0, labelNames.length)
//     );
//   }, [labelNames.length]);

//   return (
//     <div>
//       <div>
//         {conditions.map((condition, index) => (
//           <div key={index}>
//             <label>
//               {labelNames[index]} :
//               <input
//                 type="radio"
//                 checked={condition.active}
//                 onChange={handleCheckboxChange(index)}
//                 ref={ref}
//               />
//             </label>
//             {condition.active && (
//               <div>
//                 {inputs[index].map(( inputLabel, inputIndex) => (
//                   <div key={inputIndex}>
//                     {console.log(inputIndex)}
//                 <label>{inputLabel}:</label>

//                     <input data="test" />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// });

// export default MyConditionalInput;


// // it hvae updated vues files and console .log MyConditionalInput.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { SET_NAME } from '../../redux/transfer/transferDetails';

// const MyConditionalInput = React.forwardRef((props, ref) => {
//   const dispatch = useDispatch();
//   const store = useSelector((store) => store);
//   console.log(store);

//   const [conditions, setConditions] = useState([
//     { active: false },
//     { active: false },
//   ]);

//   const handleCheckboxChange = (index) => (event) => {
//     setConditions((conditions) =>
//       conditions.map((condition, i) =>
//         i === index
//           ? { ...condition, active: event.target.checked }
//           : { ...condition, active: false }
//       )
//     );
//   };

//   const labelNames = useSelector((state) => state.label.names);
//   const inputs = useSelector((state) => state.label.inputs);
//   const inputTypes = useSelector((state) => state.label.inputTypes);

//   console.log('conditons:', conditions)
//   console.log('labelNames:', labelNames);
//   console.log('inputs:', inputs);
//   console.log('inputTypes:', inputTypes);

//   const inputDetails = inputs.map((inputArray, conditionIndex) =>
//   inputArray.map((inputLabel, inputIndex) => ({
//     conditionName: labelNames[conditionIndex],
//     inputType: inputTypes[conditionIndex][inputIndex],
//     inputLabel,
//     conditionActive: conditions[conditionIndex].active,
//   }))
// );

// console.log('inputDetails:', inputDetails);

// const conditionDetails = conditions.map((condition, conditionIndex) => ({
//   conditionName: labelNames[conditionIndex],
//   conditionStatus: condition.active,
//   inputs: inputs[conditionIndex].map((inputLabel, inputIndex) => ({
//     inputType: inputTypes[conditionIndex][inputIndex],
//     inputLabel,
//   })),
// }));

// console.log('conditionDetails:', conditionDetails);

//   useEffect(() => {
//     setConditions((conditions) =>
//       conditions.length < labelNames.length
//         ? [
//             ...conditions,
//             ...Array(labelNames.length - conditions.length).fill({
//               active: false,
//             }),
//           ]
//         : conditions.slice(0, labelNames.length)
//     );
//   }, [labelNames.length]);

//   return (
//     <div>
//       <div>
//         {conditions.map((condition, index) => (
//           <div key={index}>
//             <label>
//               {labelNames[index]} {index + 1}:
//               <input
//                 type="radio"
//                 checked={condition.active}
//                 onChange={handleCheckboxChange(index)}
//                 ref={ref}
//               />
//             </label>
//             {condition.active && (
//               <div>
//                 {inputs[index].map((inputLabel, inputIndex) => (
//                   <div key={inputIndex}>
//                     <label>{inputLabel}:</label>
//                     {inputTypes[index][inputIndex] === 'text' ? (
//                       <input data="test" />
//                     ) : (
//                       <input type="file" accept="image/png, image/jpeg"/>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// });

// export default MyConditionalInput;



// MyConditionalInput.js
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { SET_NAME } from '../../redux/transfer/transferDetails';
import { setID } from '../../redux/transfer/transferDetails';
import { updateObject } from '../../redux/transfer/transferDetails';

import { appendNewComponent } from '../../redux/transfer/transferDetails';


const MyConditionalInput = React.forwardRef((props, ref) => {
  const { data, defaultValue } = props;

  console.log("propss data vlues saved in the conditon", props.data.value)


  const dispatch = useDispatch();
  console.log("props of the conditional input", props)
  const id = props.data.id;
  const data_form_props = props.data.value
  console.log("data_form_props", data_form_props)
  localStorage.setItem('ids', id)

  var current_index = 0;
  var new_component
  // var new_component = {
  //   id: "",
  //   names: ['Condition', 'Condition'],
  //   inputs: [['Input label'], ['Input label']],
  //   inputTypes: [['text'], ['text']],
  // };
  const conditionLabel = data_form_props?.map(condition => condition.label);
  const consdtionalInputLabel = data_form_props?.map(condition => condition.inputs.map(input => input.label));
  // const condtionalInputTypes = data_form_props?.map(condition => condition.inputs.map(input => input.value ==""  ? 'text' : input.fileAttached ? 'file' : null));
  const condtionalInputTypes = data_form_props?.map(condition => condition.inputs.map(input => input.inputType == "text" ? 'text' : input.inputType == "number" ? 'number' : input.inputType == "dropdown" ? 'dropdown' : input.file == "file" ? 'file' : null));

  // console.log("file or input ", one)
  //   const two = data_form_props.inputs.map(input => input[0]);
  // const three = data_form_props.inputTypes.map(inputType => inputType[0]);
  // const one = data_form_props.names;
  // conso

  if (data_form_props) {
    console.log('inside thsi one ')
    var new_component = {
      id: '',
      // names: data_form_props.map(condition => condition.label),
      // inputs: data_form_props.map(condition => condition.inputs.map(input => input.label)),
      // inputTypes: data_form_props.map(condition => condition.inputs.map(input => input.value== '' ? 'text' : input.fileAttached ? 'file' : null)),
      names: conditionLabel,
      inputs: consdtionalInputLabel,
      inputTypes: condtionalInputTypes,
      // inputOptions: [[['Option 1', 'Option 2']], [['Option 1', 'Option 2']]],

    };
  } else {
    console.log('inside another one ')
    var new_component = {
      id: id,
      names: ['Condition', 'Condition'],
      inputs: [['Input label'], ['Input label']],
      inputTypes: [['text'], ['text']],
      // inputOptions: [[['Option 1', 'Option 2']], [['Option 1', 'Option 2']]],
    };
  }


  new_component.id = id;

  const store = useSelector((store) => store);

  console.log(store.label.length)
  let existingLable = store.label.filter((l) => { return l.id == id })

  if (existingLable.length == 0) {
    console.log('existingLable.length == 0')
    dispatch(appendNewComponent({ newComponent: new_component }))
  }

  store.label.forEach(element => {
    if (element.id == id) {
      return;
    }
    current_index++;
  });

  console.log("current_index", current_index);

  console.log('store:', store);

  const [conditions, setConditions] = useState([
    { active: false },
    { active: false },
  ]);

  console.log('conditions:', conditions);

  const handleCheckboxChange = (index) => (event) => {
    setConditions((conditions) =>
      conditions.map((condition, i) =>
        i === index
          ? { ...condition, active: event.target.checked }
          : { ...condition, active: false }
      )
    );
  };

  // const labelNames = useSelector((state) => state.label[current_index] ? state.label[current_index].names:[]);
  // const inputs = useSelector((state) => state.label[current_index] ? state.label[current_index].inputs:[]);
  // const inputTypes = useSelector((state) => state.label[current_index] ? state.label[current_index].inputTypes:[]);
  const label = useSelector((state) => state.label.find((label) => label.id === id));
  const labelNames = label ? label.names : [];
  const inputs = label ? label.inputs : [];
  const inputTypes = label ? label.inputTypes : [];


  // console.log('labelNames:', labelNames);
  // console.log('inputs:', inputs);
  // console.log('inputTypes:', inputTypes);

  const [inputValues, setInputValues] = useState(
    inputs.map((inputArray) =>
      inputArray.map(() => ({ textValue: '', fileValue: null }))
    )
  );

  const handleTextChange = (conditionIndex, inputIndex) => (event) => {
    setInputValues((inputValues) =>
      inputValues.map((inputArray, i) =>
        i === conditionIndex
          ? inputArray.map((inputValue, j) =>
            j === inputIndex
              ? { ...inputValue, textValue: event.target.value }
              : inputValue
          )
          : inputArray
      )
    );
  };

  const handleFileChange = (conditionIndex, inputIndex) => (event) => {
    setInputValues((inputValues) =>
      inputValues.map((inputArray, i) =>
        i === conditionIndex
          ? inputArray.map((inputValue, j) =>
            j === inputIndex
              ? { ...inputValue, fileValue: event.target.files[0] }
              : inputValue
          )
          : inputArray
      )
    );
  };

  console.log('inputValues:', inputValues);


  const logData = conditions.map((condition, conditionIndex) => {
    const conditionData = {
      label: labelNames[conditionIndex],
      active: condition.active,
      inputs: inputs[conditionIndex]?.map((inputLabel, inputIndex) => {
        const inputData = {
          label: inputLabel,
        };
        // if (inputTypes[conditionIndex][inputIndex] === 'text') {
        //   inputData.value = inputValues[conditionIndex][inputIndex]?.textValue;
        if (inputTypes[conditionIndex][inputIndex] === 'text' || inputTypes[conditionIndex][inputIndex] === 'number' || inputTypes[conditionIndex][inputIndex] === "dropdown") {
          inputData.value = inputValues[conditionIndex][inputIndex]?.textValue;
        } else {
          inputData.fileAttached = inputValues[conditionIndex][inputIndex].fileValue ? inputValues[conditionIndex][inputIndex]?.fileValue.name : 'No file attached';
        }
        return inputData;
      }),
    };
    return conditionData;
  });



  const totaldata = {
    conditions,
    labelNames,
    inputs,
    inputTypes,
    inputValues,
  };
  const jsonString = JSON.stringify(logData);
  console.log("total data", jsonString)

  localStorage.setItem('totalData', jsonString);

  useEffect(() => {
    setConditions((conditions) =>
      conditions.length < labelNames.length
        ? [
          ...conditions,
          ...Array(labelNames.length - conditions.length).fill({
            active: false,
          }),
        ]
        : conditions.slice(0, labelNames.length)
    );
    setInputValues(
      inputs.map((inputArray) =>
        inputArray.map(() => ({ textValue: '', fileValue: null }))
      )
    );
  }, [labelNames.length, inputs]);
  const json_string = "inputTypes"
  // const json_string = JSON.stringify({inputValues})
  console.log("defaultValue", defaultValue)
  console.log(json_string)

  console.log(id)


  return (
    <div>
      <div >
        <input
          ref={ref}
          type="hidden"
          defaultValue={`${defaultValue}`}
          // value
          value={jsonString}
        ></input>
        {/* <input
        ref={ref}
        // disabled="true"
        // type=""
        // type="hidden"
        defaultValue={`${defaultValue}`}
        // value
        // value
      /> */}

        {conditions.map((condition, index) => (
          <div key={index}>
            <label>
              {/* {labelNames[index]} {index + 1}: */}
              {labelNames[index]} :
              <input
                type="radio"
                checked={condition.active}
                onChange={handleCheckboxChange(index)}
              // ref={ref}

              />
            </label>
            {/* {console.log(`Radio button ${index + 1} checked:`, condition.active)} */}
            {condition.active && (
              <div>
                {inputs[index].map((inputLabel, inputIndex) => {
                  // console.log(inputLabel);
                  return (
                    <div key={inputIndex}>
                      <label>{inputLabel}:</label>
                      {inputTypes[index][inputIndex] === 'text' ? (
                        <input
                          data="test"
                          value={inputValues[index][inputIndex].textValue}
                          onChange={handleTextChange(index, inputIndex)}
                        />
                      ) : inputTypes[index][inputIndex] === 'number' ? (
                        <input
                          type="number"
                          data="test"
                          value={inputValues[index][inputIndex].textValue}
                          onChange={handleTextChange(index, inputIndex)}
                        />
                      ) : inputTypes[index][inputIndex] === 'dropdown' ? (
                        <select
                          data="test"
                          value={inputValues[index][inputIndex].textValue}
                          onChange={handleTextChange(index, inputIndex)}
                        >
                          {/* Add options here */}
                        </select>
                        // <select
                        //   data="test"
                        //   value={inputValues[index][inputIndex].textValue}
                        //   onChange={handleTextChange(index, inputIndex)}
                        // >
                        //   {inputOptions[index][inputIndex]?.map((option, optionIndex) => (
                        //     <option key={optionIndex} value={option}>{option}</option>
                        //   ))}
                        // </select>
                      ) : (
                        <>
                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange(index, inputIndex)}
                          />
                          {inputValues[index][inputIndex].fileValue && (
                            <p>
                              Selected file:{' '}
                              {
                                inputValues[index][inputIndex].fileValue.name
                              }
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default MyConditionalInput;


