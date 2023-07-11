// import React, { useState, useEffect } from 'react';
// import 'react-data-grid/lib/styles.css';

// // import { Registry } from 'react-form-builder2';
// import DataGrid from 'react-data-grid';

// const MyDataGrid = () => {
//   const [columns, setColumns] = useState([
//     { key: 'id', name: 'ID' },
//     { key: 'title', name: 'Title' }
//   ]);

//   const [rows, setRows] = useState([
//     { id: 0, title: 'Example' },
//     { id: 1, title: 'Demo' }
//   ]);

//   const handleAddColumn = () => {
//     console.log(columns)
//     const newColumnKey = `column${columns.length}`;
//     const newColumn = { key: newColumnKey, name: newColumnKey };
//     setColumns([...columns, newColumn]);
//   };
//   // const handleAddColumn = () => {
//   //   const newColumnKey = `column_${Date.now()}`;
//   //   const newColumn = { key: newColumnKey, name: newColumnKey };
//   //   setColumns([...columns, newColumn]);
//   // };

//   const handleRemoveColumn = () => {
//     if (columns.length > 1) {
//       setColumns(columns.slice(0, -1));
//     }
//   };

//   const handleAddRow = () => {
//     const newRow = { id: rows.length };
//     setRows([...rows, newRow]);
//   };

//   const handleRemoveRow = () => {
//     if (rows.length > 1) {
//       setRows(rows.slice(0, -1));
//     }
//   };
//   useEffect(() => {
//     console.log(rows);
//     console.log(columns)
//   }, [rows], [columns]);


//   return (
//     <div>
//       <DataGrid key={columns.length} columns={columns} rows={rows} className="my-grid" />
//       <button onClick={handleAddColumn}>Add Column</button>
//       <button onClick={handleRemoveColumn}>Remove Column</button>
//       <button onClick={handleAddRow}>Add Row</button>
//       <button onClick={handleRemoveRow}>Remove Row</button>
//     </div>
//   );
// };


// export default MyDataGrid;


// import React, { useState } from 'react';

// const MyMultilineInput = React.forwardRef((props, ref) => {
//   const { data, defaultValue } = props;

//   // define the initial state of your inputs
//   const [inputs, setInputs] = useState([
//     { label: 'Input label', value: '' },
//   ]);

//   // define functions to add, remove, and update inputs
//   const handleAddInput = () => {
//     setInputs(inputs => [...inputs, { label: 'Input label', value: '' }]);
//   };

//   const handleRemoveInput = index => {
//     setInputs(inputs => inputs.filter((input, i) => i !== index));
//   };

//   const handleInputLabelChange = (index, label) => {
//     setInputs(inputs =>
//       inputs.map((input, i) =>
//         i === index ? { ...input, label } : input
//       )
//     );
//   };

//   const handleInputValueChange = (index, value) => {
//     setInputs(inputs =>
//       inputs.map((input, i) =>
//         i === index ? { ...input, value } : input
//       )
//     );
//   };

//   return (
//     <div>
//       {/* render your custom component here */}
//       {inputs.map((input, index) => (
//         <div key={index}>
//           <label>
//             <input
//               type="text"
//               value={input.label}
//               onChange={event =>
//                 handleInputLabelChange(index, event.target.value)
//               }
//             />
//           </label>
//           <textarea
//             value={input.value}
//             onChange={event =>
//               handleInputValueChange(index, event.target.value)
//             }
//           />
//           <button onClick={() => handleRemoveInput(index)}>
//             Remove Input
//           </button>
//         </div>
//       ))}
//       <button onClick={handleAddInput}>Add Input</button>
//     </div>
//   );
// });

// export default MyMultilineInput;



// import React from 'react';
// import { connect } from 'react-redux';
// import {
//   addInput,
//   removeInput,
//   updateInputLabel,
//   updateInputValue,
// } from '../../redux/transfer/multilineInputDetails';

// const MyMultilineInput = React.forwardRef((props, ref) => {
//   const { data, defaultValue } = props;

//   // define functions to add, remove, and update inputs
//   const handleAddInput = () => {
//     props.addInput();
//   };

//   const handleRemoveInput = index => {
//     props.removeInput(index);
//   };

//   const handleInputLabelChange = (index, label) => {
//     props.updateInputLabel({ index, label });
//   };

//   const handleInputValueChange = (index, value) => {
//     props.updateInputValue({ index, value });
//   };

//   return (
//     <div>
//       {/* render your custom component here */}
//       {props.inputs.map((input, index) => (
//         <div key={index}>
//           <label>
//             <input
//               type="text"
//               value={input.label}
//               onChange={event =>
//                 handleInputLabelChange(index, event.target.value)
//               }
//             />
//           </label>
//           <textarea
//             value={input.value}
//             onChange={event =>
//               handleInputValueChange(index, event.target.value)
//             }
//           />
//           <button onClick={() => handleRemoveInput(index)}>
//             Remove Input
//           </button>
//         </div>
//       ))}
//       <button onClick={handleAddInput}>Add Input</button>
//     </div>
//   );
// });

// const mapStateToProps = state => ({
//   inputs: state.multilineInput,
// });

// const mapDispatchToProps = {
//   addInput,
//   removeInput,
//   updateInputLabel,
//   updateInputValue,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MyMultilineInput);


// MyConditionalInput.js
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { SET_NAME } from '../../redux/transfer/transferDetails';
import { setID } from '../../redux/transfer/transferDetails';
import { updateObject } from '../../redux/transfer/transferDetails';
// import { updateInputSets } from '../../redux/transfer/mySlice';
// import mySlice from '../../redux/transfer/mySlice';
// import { updateInputSets } from '../../redux/transfer/multilineInputDetails';
import mySlice, { addInputSet, removeInputSet } from '../../redux/transfer/mySlice';

import { appendNewComponentmultilineInput } from '../../redux/transfer/multilineInputDetails';


const MyMultilineInput = React.forwardRef((props, ref) => {
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
    const conditionLabel = data_form_props?.map(condition => condition.multilineInput);
    const consdtionalInputLabel = data_form_props?.map(condition => condition.inputs.map(input => input.multilineInput));
    // const condtionalInputTypes = data_form_props?.map(condition => condition.inputs.map(input => input.value ==""  ? 'text' : input.fileAttached ? 'file' : null));
    const condtionalInputTypes = data_form_props?.map(condition => condition.inputs.map(input => input.inputType == "text" ? 'text' : input.inputType == "number" ? 'number' : null));

    // console.log("file or input ", one)
    //   const two = data_form_props.inputs.map(input => input[0]);
    // const three = data_form_props.inputTypes.map(inputType => inputType[0]);
    // const one = data_form_props.names;
    // conso

    if (data_form_props) {
        console.log('inside this one ')
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
            names: ['Label ', 'Label ', 'Label ', 'Label ', 'Label ', 'Label '],
            inputs: [['Input label'], ['Input label'], ['Input label'], ['Input label'], ['Input label'], ['Input label']],
            inputTypes: [['text'], ['text'], ['text'], ['text'], ['text'], ['text']],
        };
    }


    new_component.id = id;

    const store = useSelector((store) => store);

    console.log(store.multilineInput.length)
    console.log(store.multilineInput)
    let existingLable = store.multilineInput.filter((l) => { return l.id == id })

    if (existingLable.length == 0) {
        console.log('existingLable.length == 0')
        console.log("new_component", new_component)
        dispatch(appendNewComponentmultilineInput({ newComponent: new_component }))
    }

    store.multilineInput.forEach(element => {
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
    const label = useSelector((state) => state.multilineInput.find((multilineInput) => multilineInput.id === id));

    const labelNames = label ? label.names : [];
    const inputs = label ? label.inputs : [];
    const inputTypes = label ? label.inputTypes : [];

    console.log("inputs", inputs)
    // console.log('labelNames:', labelNames);
    // console.log('inputs:', inputs);
    // console.log('inputTypes:', inputTypes);

    const [inputValues, setInputValues] = useState(
        inputs.map((inputArray) => (
            // console.l
            inputArray.map(() => ({ textValue: '', fileValue: null }))

        )
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

    //   const handleFileChange = (conditionIndex, inputIndex) => (event) => {
    //     setInputValues((inputValues) =>
    //       inputValues.map((inputArray, i) =>
    //         i === conditionIndex
    //           ? inputArray.map((inputValue, j) =>
    //             j === inputIndex
    //               ? { ...inputValue, fileValue: event.target.files[0] }
    //               : inputValue
    //           )
    //           : inputArray
    //       )
    //     );
    //   };

    console.log('inputValues:', inputValues);


    //   const logData = conditions.map((condition, conditionIndex) => {
    //     const conditionData = {
    //       label: labelNames[conditionIndex],
    //       active: condition.active,
    //       inputs: inputs[conditionIndex]?.map((inputLabel, inputIndex) => {
    //         const inputData = {
    //           label: inputLabel,
    //         };
    //         // if (inputTypes[conditionIndex][inputIndex] === 'text') {
    //         //   inputData.value = inputValues[conditionIndex][inputIndex]?.textValue;
    //         if (inputTypes[conditionIndex][inputIndex] === 'text' || inputTypes[conditionIndex][inputIndex] === 'number' || inputTypes[conditionIndex][inputIndex] === "dropdown") {
    //           inputData.value = inputValues[conditionIndex][inputIndex]?.textValue;
    //         } else {
    //           inputData.fileAttached = inputValues[conditionIndex][inputIndex].fileValue ? inputValues[conditionIndex][inputIndex]?.fileValue.name : 'No file attached';
    //         }
    //         return inputData;
    //       }),
    //     };
    //     return conditionData;
    //   });



    const totaldata = {
        // conditions,
        labelNames,
        inputs,
        inputTypes,
        inputValues,
    };
    //   const jsonString = JSON.stringify(logData);
    //   console.log("total data", jsonString)

    //   localStorage.setItem('totalData', jsonString);

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

    // const [inputss, setInputss] = useState([[]]);

    // const handleAddSet = () => {
    //     setConditions([...conditions, { active: false }]);
    // };

    // const handleRemoveSet = (setIndex) => {
    //     // setInputss(inputss.filter((_, g) => g !== setIndex));
    //     setConditions(conditions.filter((_, index) => index !== setIndex));

    // };
    const [inputSets, setInputSets] = useState([
        inputs
    ]);

    // useEffect(()=>{
    //     setInputSets(inputs)
    // }
    // ,[inputs])
    // dispatch(setInputSets(inputSets));
    console.log("inputSets", inputSets)
    useEffect (()=> {
        console.log("inputSetsuseeffect", inputSets)

    },[inputSets])
    const handleAddSet = () => {
        console.log( "inputSets.length", inputSets.length)
        setInputSets([...inputSets, inputs]);
        // console.log("inputs", inputs);

        // console.log("updateInputSets", updateInputSets);

    // dispatch(updateInputSets([...inputSets, inputs]));
// dispatch(setInputSets([...inputSets, inputs]));
        // dispatch(setInputSets([...inputSets, inputs]));

        // setLabelNames([...labelNames, newLabel]);

    };
    const handleRemoveSet = (setIndex) => {
        // setInputSets(inputSets.filter((_, index) => index !== setIndex));
        if (inputSets.length > 1) {
            setInputSets(inputSets.filter((_, index) => index !== setIndex));
            // dispatch(updateInputSets(inputSets.filter((_, index) => index !== setIndex)));
            console.log( "inputSets.length", inputSets.length)

        }
    };

// console.log('const inputSets = useSelector((state) => state.mySlice.inputSets);' useSelector((state) => state.mySlice))
// const inputSets = useSelector((state) => state.mySlice.inputSets);

// const handleAddSet = () => {
//   dispatch(addInputSet(inputs));
// };

// const handleRemoveSet = (setIndex) => {
//   dispatch(removeInputSet(setIndex));
// };
    return (
        <div>
            <div >
                <input
                    ref={ref}
                    type="hidden"
                    defaultValue={`${defaultValue}`}
                // value
                //   value={jsonString}
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
                {/* {inputs.map((set, setIndex) => (
                    <div key={setIndex}>
                        {conditions.map((condition, index) => ( */}
                {/* {inputSets.map((set, setIndex) => (
                    <div key={setIndex}> */}
                        {/* {console.log(setIndex)} */}
                        {/* {set.map((condition, index) => ( */}
                            {inputSets.map((set, setIndex) => (
                                <div key={setIndex}>
                                    {conditions.map((condition, index) => (
                            <div key={index}>
                                <label>
                                    {/* {labelNames[index]} {index + 1}: */}
                                    {labelNames[index]} :
                                    {/* <input
                // type="radio"
                // checked={condition.active}
                // onChange={handleCheckboxChange(index)}
              // ref={ref}

              /> */}
                                </label>
                                <div>
                                    {inputs[index]?.map((inputLabel, inputIndex) => {
                                        return (
                                            <div key={inputIndex}>

                                                <label>{inputLabel}</label>
                                                {inputTypes[index][inputIndex] === 'text' ? (

                                                    <input
                                                        data="test"
                                                        value={inputValues[index][inputIndex]?.textValue}
                                                        onChange={handleTextChange(index, inputIndex)}
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        data="test"
                                                        value={inputValues[index][inputIndex]?.textValue}
                                                        onChange={handleTextChange(index, inputIndex)}
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                                        }}

                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {/* <button onClick={() => handleRemoveSet(setIndex)}>Remove Set</button> */}
                        {inputSets.length > 1 && (
      <button onClick={() => handleRemoveSet(setIndex)}>Remove Set</button>
    )}
                        <button onClick={handleAddSet}>Add Set</button>

                    </div>
                    
                ))}
            </div>
        </div>
    );
});

export default MyMultilineInput;
