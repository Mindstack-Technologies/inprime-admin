import React, { useState, useEffect } from "react";
import FormBuilder, { Registry } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import Demobar from "@/components/DemoBar";
import AdminLayout from "@/layouts/AdminLayout";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "../baseURL";
import Head from "next/head";
import { Alert, InputGroup, Modal } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { useRouter } from 'next/router';
import GeoTagging from "@/components/Custom-FromBuliderTools/GeoTagging";
import MyDataGrid from "@/components/Custom-FromBuliderTools/Grid";
import MyConditionalInput from "../components/Custom-FromBuliderTools/ConditonalInput";
import MyFormElementsEdit from "../components/Custom-FromBuliderTools/MyFormElementsEdit";
import WebcamCapture from "../components/Custom-FromBuliderTools/WebcamCapture";
// import MyFormElementsEdit from "../node_modules/react-form-builder2/lib/form-elements-edit";
import dynamic from 'next/dynamic';


import MyInput from "@/components/Custom-FromBuliderTools/MyInput";
import { useDispatch, useSelector } from 'react-redux';
import { addInputOption } from "@/redux/transfer/transferDetails";


// const onPost = (data) => {
//   const jsonData = JSON.stringify(data);
//   const store = useSelector((store) => store);


//   const label = useSelector((state) => state.label.find((label) => label.id ));
//   const labelNames = label ? label.names : [];
//   const  inputs = label ? label.inputs : [];
//   const  inputTypes = label ? label.inputTypes : [];


//   console.log(' income assseesment template labelNames:', labelNames);
//   console.log('income assseesment template inputs:', inputs);
//   console.log(' income assseesment template inputTypes:', inputTypes);














//   // var sting = localStorage.getItem("totalData");
//   var sting = [{"label":"Nothisnf","active":false,"inputs":[{"label":"evrytad lkna","value":""}]},{"label":"fagfsgsfgdf","active":false,"inputs":[{"label":"hole vlaue ","value":""}]},{"label":"dgdsfghsdtfg","active":false,"inputs":[{"label":"ragfagatr","fileAttached":"No file attached"}]}];
//   var ids = localStorage.getItem('ids')
// console.log("ids of income" ,ids)

//   console.log("setting", sting)


// const matchingObject = data.task_data.find(obj => obj.id === ids);
// console.log("matchingObject", matchingObject)
// if (matchingObject) {
//   console.log("found")
//   // matchingObject.value = sting;
//   // matchingObject.newThing = "texting";
//   matchingObject.required = true;
//   var updatedData = data
//   console.log("updated", data)
// }
// else{
//   console.log("not found")
// }
// const jsonDataUpdated = JSON.stringify(updatedData)
//   localStorage.setItem('formData', jsonDataUpdated);

//   console.log("json data of the form builder updated" ,jsonDataUpdated);

//   console.log("json data of the form builder" ,jsonData);

//   // console.log(data)
// };

const Schema = Yup.object().shape({
  occupation: Yup.string().required("occupation is required"),
  // version: Yup.string().required("version is required"),
  templateName: Yup.string().required("template name is required"),
  form_title: Yup.string().required("form title is required"),
  form_name: Yup.string().required("form name is required"),
  description: Yup.string().required("description is required"),
});


export default function IncomeAssessmentTemplate() {

  const [ids, setIds] = useState();
  const store = useSelector((store) => store);
  const total = useSelector((state) => state.label)

  console.log('total', total)
  console.log("store", store)
  useEffect(() => {
    setIds(localStorage.getItem('ids'));

  }, [ids]);
  console.log("ids", ids)

  const label = useSelector((state) => state.label);

  const multiInputs = useSelector((state) => state.multilineInput);

  const [itemAdded, setItemAdded] = useState([]);
  useEffect(() => {
    changeDateFormat();
  }, [itemAdded]);
  const changeDateFormat = () => {
    const parentContainers = document?.querySelectorAll('.react-datepicker__input-container');
    parentContainers?.forEach(container => {
      container.querySelector('input').setAttribute("placeholder", "dd/MM/yyyy");
    });
  };


  const onPost = (data) => {


    // const jsonData = JSON.stringify(data);


    // localStorage.setItem('formData', jsonData);


    // console.log("json data of the form builder" ,jsonData);
    const jsonData = JSON.stringify(data);
    localStorage.setItem('formData', jsonData);
    // console.log(   " setItemAdded([...itemAdded, 'new item']);", setItemAdded([...itemAdded, 'new item']));
    setItemAdded([...itemAdded, 'new item']);
  };


  const ReactFormBuilder = dynamic(
    () => import('react-form-builder2').then((mod) => mod.ReactFormBuilder),
    { ssr: false }
  );
  // Custom form tools items



  //   const MyInput = ((props, ref) => {
  //     const { name, defaultValue, disabled } = props;
  //     // console.log(myProp); // logs the value of myProp

  //     return     <input ref={ref} name={name} defaultValue={defaultValue} disabled={disabled} />


  // });
  // const MyInput = React.forwardRef((props, ref) => {
  //   const { name, defaultValue, disabled } = props;
  //   return (<>
  //     <p>hello</p>
  //   {/* <input ref={ref} name={name} defaultValue={defaultValue} disabled={disabled} /> */}
  //   </>
  //   );
  // });
  // const MyInput = () => <input />;
  // const MyInput = React.forwardRef((props, ref) => {
  //   return <input ref={ref} />;
  // });

  // const MyInput = ((props) => {
  //   const { name, defaultValue, disabled } = props;
  //   console.log(props)
  //   return (
  //     <input name={name} defaultValue={defaultValue} disabled={disabled} />

  //   );
  // });

  // const GeoTagging = (props) => {
  //   const [location, setLocation] = useState(null);

  //   const handleGetLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const { latitude, longitude } = position.coords;
  //           setLocation({ latitude, longitude });
  //         },
  //         (error) => {
  //           console.error(error);
  //         }
  //       );
  //     } else {
  //       console.error('Geolocation is not supported by this browser.');
  //     }
  //   };

  //   return (
  //     <div>
  //       <button onClick={handleGetLocation}>Get Location</button>
  //       {location && (
  //         <div>
  //           Latitude: {location.latitude}
  //           <br />
  //           Longitude: {location.longitude}
  //         </div>
  //       )}
  //       {/* <p>hello</p> */}


  //     </div>
  //   );
  // };

  const TestComponent = () => <h2>Hello</h2>;



  // Registry.register('MyGeoTagging', GeoTagging);
  try {
    Registry.register('MyGeoTagging', GeoTagging);
    Registry.register('MyInput', MyInput);
    Registry.register('TestComponent', TestComponent);
    Registry.register('MyDataGrid', MyDataGrid);
    Registry.register('MyConditionalInput', MyConditionalInput);


  } catch (error) {

  }
  const registeredElements = Registry.list();
  // console.log(registeredElements);
  const handleRowsChange = (newRows) => {
    // handle row changes here
    console.log(newRows);
  };

  const items = [{
    key: 'TestComponent',
    element: 'CustomElement',
    component: TestComponent,
    type: 'custom',
    field_name: 'test_component',
    name: 'Something You Want',
    icon: 'fa fa-cog',
    static: true,
    props: { test: 'test_comp' },
    label: 'Label Test',
  },
  {
    key: 'MyInput',
    element: 'CustomElement',
    component: MyInput,
    type: 'custom',
    forwardRef: true,
    field_name: 'my_input_',
    name: 'My Input',
    icon: 'fa fa-cog',
    props: {
      test: 'test_input',
      myProp: 'myValue'
    },
    label: 'Label Input',
  },
  {
    key: 'MyGeoTagging',
    element: 'CustomElement',
    type: 'custom',
    forwardRef: true,
    field_name: 'my_input_geotagging',
    name: 'GeoTagging',
    icon: 'fa fa-map-marker',
    static: true,
    // content: 'GeoTagging Component',
    props: { test: 'test_input' },

    component: GeoTagging,

  },
  {
    key: 'MyDataGrid',
    name: 'Data Grid',
    element: 'CustomElement',
    type: 'custom',
    field_name: 'my_input_MyDataGrid',
    icon: 'fa fa-table',
    component: MyDataGrid,
    // props: {
    //   onRowsChange: handleRowsChange,
    // },

  },
  {
    key: 'MyConditionalInput',
    name: 'Conditional Input',
    element: 'CustomElement',
    icon: 'fa fa-check-square',
    field_name: 'my_input_MyConditionalInput',
    type: 'custom',
    forwardRef: true,
    static: true,
    props: { test: 'test_input' },
    component: MyConditionalInput,
  },
  {
    key: 'WebcamCapture',
    name: 'Webcam Capture',
    element: 'CustomElement',
    type: 'custom',
    field_name: 'webcam_capture',
    icon: 'fa fa-camera',
    component: WebcamCapture, // the custom component you created
  },


  { key: 'Header' },
  { key: 'Label' },
  { key: 'Paragraph' },
  { key: 'LineBreak' },
  { key: 'Dropdown' },
  { key: 'Tags' },
  { key: 'Checkboxes' },
  // { key: 'MultipleChoice' },
  { key: 'TextInput' },
  // { key: 'Email' },
  { key: 'NumberInput' },
  // { key: 'PhoneNumber' },
  // { key: 'MultiLineInput' },
  { key: 'TwoColumnRow' },
  { key: 'ThreeColumnRow' },
  { key: 'FourColumnRow' },
  // { key: 'FiveColumnRow' },
  { key: 'TextArea' },
  { key: 'Image' },
  { key: 'Rating' },
  { key: 'RadioButtons' },
  // { key: 'Date' },
  { key: 'DatePicker' },
  { key: 'Signature' },
  // { key: 'Website' },
  { key: 'HyperLink' },
  // { key: 'Download' },
  { key: 'Range' },
  { key: 'Camera' },
  // { key: 'FileAttachment' },
  { key: 'FileUpload' },
    //23
    //25
  ];


  // console.log(items)










  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitBiuttonisLoading, setSubmitBiuttonisLoading] = useState(false)
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)
  const [showReactgeneratorEmpty, setShowReactgeneratorEmpty] = useState(false)

  const [initialValues, setInitialValues] = useState('')


  const [formsData, setFormData] = useState(
    // [{"id":"6B4F521F-1561-489F-9640-C3B66E2E18E6","element":"Header","text":"Header Text","static":true,"required":false,"bold":false,"italic":false,"content":"<p style=\"text-align:center;\">Header ","canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"dirty":false},{"id":"46C4452C-F982-4AE1-AE42-96E4FF249A10","element":"TextInput","text":"Text Input","required":true,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"text_input_3459BB15-DD99-4187-982B-B979EB8524A6","label":"Name ","dirty":false},{"id":"DC4E97D3-BA97-4529-8D2E-A8FCB3BFD1CC","element":"RadioButtons","text":"Multiple Choice","required":true,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"radiobuttons_1AABD0E8-60DE-4BC0-B123-26446304F52B","label":"Select ","options":[{"value":"place_holder_option_1","text":"Place holder option 1","key":"radiobuttons_option_420398A8-B343-41B7-8607-B1DD77088BCC"},{"value":"place_holder_option_2","text":"Place holder option 2","key":"radiobuttons_option_C1DD4E75-9CFB-4FE7-9F63-A1D4B98F3710"},{"value":"place_holder_option_3","text":"Place holder option 3","key":"radiobuttons_option_F25B166F-87C3-407B-956C-3D9F4CE03FBE"}],"dirty":false},{"id":"75799FD7-5658-4741-A6CA-6F4E75BBF495","element":"FileUpload","text":"File Upload","required":false,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"file_upload_803A759E-4268-47A1-BBE2-67437990571B","label":"Placeholder label"},{"id":"E1171553-757E-496B-B2A3-394EF6B42054","element":"Camera","text":"Camera","required":false,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"camera_94274634-08B1-4EFD-BDD2-5E8030CE108B","label":"Placeholder label"}]
    ''
  );
  const [errorMessage, setErrorMessage] = useState('')
  const [submitErrorMessagePopup, setSubmitErrorMessagePopup] = useState(false)

  const [saveErrorMessagePopup, setSaveErrorMessagePopup] = useState(false)


  const [saveButtonIsClicked, setSaveButtonIsClicked] = useState(false)
  const [updateButtonIsClicked, setUpdateButtonIsClicked] = useState(false)

  const [saveErrorMessageSameTemplate, setSaveErrorMessageSameTemplate] = useState(false)

  const [options, setOptions] = useState([]);


  const router = useRouter();
  const mode = router.query.mode;





  // Posting the from 
  const handleSubmit = async (values) => {
    // console.log(saveButtonIsClicked)
    console.log("formsData", formsData)

    const fulldata = localStorage.getItem("formData")
    //  var ids = localStorage.getItem('ids')
    // console.log('state.label:', label);
    var taskData
    const jsonDatafulldata = JSON.parse(fulldata);
    console.log("jsonDatafulldata", jsonDatafulldata)
    if (jsonDatafulldata === null) {
      console.log("jsonDatafulldata === null")
      taskData = null
      // console.log ("formsData targetting", formsData.map(value=>value))



      var i = 0;
      formsData?.forEach(formElement => {

        console.log("multiInputs", multiInputs)

        console.log("multiInputs.filter(k => { return k.id == formElement.id })", multiInputs.filter(k => { return k.id == formElement.id }))
        let filtered_multiInputs = multiInputs.filter(k => { return k.id == formElement.id });
        let filteredLabel = label.filter(l => { return l.id == formElement.id });
        console.log("filtered_multiInputs", filtered_multiInputs.length > 0)
        console.log("jsonDatafulldata final values", filteredLabel);
        if (filteredLabel.length > 0) {
          console.log("jsonDatafulldata final values", filteredLabel[0].names);
          // jsonDatafulldata.task_data[i]["value"] = [ "inputs":filteredLabel[0].inputs,"inputTypes":filteredLabel[0].inputTypes, "names":filteredLabel[0].names];

          // console.log()
          let final_json = [];
          let j = 0;
          filteredLabel[0].names.forEach((name) => {
            let element = {};
            element["label"] = name;
            element["active"] = false;
            element["inputs"] = [];

            let k = 0;
            filteredLabel[0].inputs[j].forEach((input) => {
              let inp_element = {};
              console.log("jsonDatafulldata input type", filteredLabel[0].inputTypes[j][k]);
              // if(filteredLabel[0].inputTypes[j][k] == 'text'){
              //   inp_element =  {"value":"","label":input};
              // }else if(filteredLabel[0].inputTypes[j][k] == 'file'){
              //   inp_element =  {"fileAttached":"No file attached","label":input};
              // }
              if (filteredLabel[0].inputTypes[j][k] == 'text') {
                inp_element = { "value": "", "label": input, "inputType": "text" };
              } else if (filteredLabel[0].inputTypes[j][k] == 'number') {
                inp_element = { "value": "", "label": input, "inputType": "number" };
              } else if (filteredLabel[0].inputTypes[j][k] == 'dropdown') {
                inp_element = { "value": "", "label": input, "inputType": "dropdown" };
              } else if (filteredLabel[0].inputTypes[j][k] == 'file') {
                inp_element = { "fileAttached": "No file attached", "label": input, "inputType": "file" };
              }
              element["inputs"].push(inp_element);
              k++;
            });

            j++;

            final_json.push(element);

          });


          formsData[i].value = final_json;
        }
        if (filtered_multiInputs.length > 0) {
          console.log("jsonDatafulldata final values", filtered_multiInputs[0].names);
          let final_multiInput_json = [];
          let j = 0;
          filtered_multiInputs[0].names.forEach((name) => {
            let element = {};
            element["label"] = name;
            // element["active"] = false;
            element["inputs"] = [];

            let k = 0;
            filtered_multiInputs[0].inputs[j].forEach((input) => {
              let inp_element = {};
              console.log("jsonDatafulldata input type", filtered_multiInputs[0].inputTypes[j][k]);
              if (filtered_multiInputs[0].inputTypes[j][k] == 'text') {
                inp_element = { "value": "", "label": input, "inputType": "text" };
              } else if (filtered_multiInputs[0].inputTypes[j][k] == 'number') {
                inp_element = { "value": "", "label": input, "inputType": "number" };
              }
              element["inputs"].push(inp_element);
              k++;
            });

            j++;

            final_multiInput_json.push(element);

          });


          formsData.task_data[i]["value"] = final_multiInput_json;

      }
        i++;
      });

      console.log("jsonDatafulldata final values 1", formsData);

    }
    else {
      console.log("state label", label);
      console.log('jsonDatafulldata', jsonDatafulldata.task_data)

      var i = 0;
      jsonDatafulldata.task_data.forEach(formElement => {
        // console.log("multiInputs", multiInputs)

        // console.log("multiInputs.filter(k => { return k.id == formElement.id })", multiInputs.filter(k => { return k.id == formElement.id }))
        let filtered_multiInputs = multiInputs.filter(k => { return k.id == formElement.id });
        // console.log("filtered_multiInputs", filtered_multiInputs.length > 0)

        let filteredLabel = label.filter(l => { return l.id == formElement.id });

        console.log("jsonDatafulldata final values", filteredLabel);
        if (filteredLabel.length > 0) {
          console.log("jsonDatafulldata final values ", filteredLabel[0].inputs)
          console.log("jsonDatafulldata final values inputOptions", filteredLabel[0].inputOptions);
          let final_json = [];
          let j = 0;
          filteredLabel[0].names.forEach((name) => {
            // console.log(inputOptions)
            let element = {};
            element["label"] = name;
            element["active"] = false;
            element["inputs"] = [];
            element["inputOptions"]=[];


            let k = 0;
            filteredLabel[0].inputs[j].forEach((input) => {
              console.log(`${j} + ${k} , j + k`)
              let inp_element = {};
              console.log("jsonDatafulldata input type", filteredLabel[0].inputTypes[j][k]);
              if (filteredLabel[0].inputTypes[j][k] == 'text') {
                inp_element = { "value": "", "label": input, "inputType": "text" };
              } else if (filteredLabel[0].inputTypes[j][k] == 'number') {
                inp_element = { "value": "", "label": input, "inputType": "number" };
              } else if (filteredLabel[0].inputTypes[j][k] == 'dropdown') {
                inp_element = { "value": "", "label": input, "inputType": "dropdown" };
              } else if (filteredLabel[0].inputTypes[j][k] == 'file') {
                inp_element = { "fileAttached": "No file attached", "label": input, "inputType": "file" };
              }
              element["inputs"].push(inp_element);
              // console.log ("inp_element", element["inputs"].push(inp_element))
              k++;
            });
            let l = 0;
          
            filteredLabel[0].inputOptions[j].forEach((inputOption) => {
              console.log("inputOption", inputOption)
              console.log ("inp_element", element["inputOptions"])
              element["inputOptions"].push(inputOption);
              l++;
            });

            j++;

            final_json.push(element);

          });


          jsonDatafulldata.task_data[i]["value"] = final_json;

        }
        if (filtered_multiInputs.length > 0) {
          console.log("entering to filtered_multiInputs")
          console.log("jsonDatafulldata final values", filtered_multiInputs[0].names);
          let final_multiInput_json = [];
          let j = 0;
          filtered_multiInputs[0].names.forEach((name) => {
            let element = {};
            element["label"] = name;
            // element["active"] = false;
            element["inputs"] = [];

            let k = 0;
            filtered_multiInputs[0].inputs[j].forEach((input) => {
              let inp_element = {};
              console.log("jsonDatafulldata input type", filtered_multiInputs[0].inputTypes[j][k]);
              if (filtered_multiInputs[0].inputTypes[j][k] == 'text') {
                inp_element = { "value": "", "label": input, "inputType": "text" };
              } else if (filtered_multiInputs[0].inputTypes[j][k] == 'number') {
                inp_element = { "value": "", "label": input, "inputType": "number" };
                // } else if (filteredLabel[0].inputTypes[j][k] == 'dropdown') {
                //   inp_element = { "value": "", "label": input, "inputType": "dropdown" };
                // } else if (filteredLabel[0].inputTypes[j][k] == 'file') {
                //   inp_element = { "fileAttached": "No file attached", "label": input, "inputType": "file" };
              }
              element["inputs"].push(inp_element);
              k++;
            });

            j++;

            final_multiInput_json.push(element);

          });


          jsonDatafulldata.task_data[i]["value"] = final_multiInput_json;

        }
        i++;
      });

      console.log("jsonDatafulldata final values 1", jsonDatafulldata);
      taskData = JSON.stringify(jsonDatafulldata);
    }
    console.log('final Taskdata', taskData)
















    // save button is clicked
    if (saveButtonIsClicked === true) {
      setIsLoading(true);

      console.log('save button is clicked')
      // console.log(values.templateName)
      const occupationId = values.occupation;
      const url = `${BASE_URL}/crm/incomeAssessment/template?occupationId=${occupationId}`;

      // const taskData = localStorage.getItem("formData")
      // console.log(taskData)
      if (taskData === null && formsData === null) {
        console.log("both are null")
        setShowReactgeneratorEmpty(true)
        setTimeout(() => setShowReactgeneratorEmpty(false), 10000);

      }
      // else if(taskData !== null ){
      //   console.log("test not null ")
      //   setShowReactgeneratorEmpty(true)
      //   setTimeout(() => setShowReactgeneratorEmpty(false), 10000);
      // }

      else if (taskData === null) {
        console.log('form is not edited ')

        // console.log(formsData)
        const bearerToken = localStorage.getItem('access_token');

        const data = {
          occupationId: values.occupation,
          formTitle: values.form_title,
          // version: values.version,
          templateName: values.templateName,
          formDescription: values.description,
          formName: values.form_name,
          task_data: formsData,
        };
        // console.log(data)
        console.log("body data", data)

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${bearerToken}`

            },
            body: JSON.stringify(data),
          });
          // console.log(response)
          const responsedata = await response.json();
          console.log(responsedata)

          if (response.ok) {
            // const data = await response.json();
            // console.log(data);
            if (responsedata.errorCode === "400") {
              setErrorMessage(data.errorMessage)
              setSaveErrorMessagePopup(true);
              setTimeout(() => setSaveErrorMessagePopup(false), 10000);
            } else {
              setShowSuccessModal(true);
              setTimeout(() => {
                router.push("/income-assessment-tempates");
                setShowSuccessModal(true);
                setTimeout(() => {
                  setShowSuccessModal(false);
                }, 3000);
              }, 1000);
              // setTimeout(() => setShowSuccessModal(false), 10000);
              console.log("Post request is done")
              setSaveButtonIsClicked(false)
              setIsLoading(false);
              // router.push("/income-assessment-tempates")
            }
          } else {
            setErrorMessage(responsedata.errorMessage)
            setSaveErrorMessageSameTemplate(true);
            setTimeout(() => setSaveErrorMessageSameTemplate(false), 10000);

            // setShowErrorModal(true);
            // setTimeout(() => setShowErrorModal(false), 10000);
            // console.log("here it got error")
          }
        } catch (error) {
          console.error(error);
        }


      } else {
        console.log('form is  edited or new form')

        const bearerToken = localStorage.getItem('access_token');

        const convert = JSON.parse(taskData)
        const onlyArry = convert.task_data
        // console.log(convert)
        // console.log(onlyArry)
        // console.log(onlyArry.length)
        if (onlyArry.length == 0) {
          console.log("it containe empty []")
          setShowReactgeneratorEmpty(true)
          setTimeout(() => setShowReactgeneratorEmpty(false), 10000);
        }
        // const data = {
        //   occupationId: values.occupation,
        //   formTitle: values.form_title,
        //   version: values.version,
        //   formDesc: values.description,
        //   formName: values.form_name,
        //   sections: onlyArry,
        // };
        else {
          const data = {
            // occupationId: values.occupation,
            formTitle: values.form_title,
            // version: values.version,
            templateName: values.templateName,
            formDescription: values.description,
            formName: values.form_name,
            task_data: onlyArry,
          };
          console.log("body data", data)

          try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`

              },
              body: JSON.stringify(data),
            });
            // console.log(response)
            const outputdata = await response.json();
            console.log(outputdata)

            if (response.ok) {
              // const data = await response.json();
              // console.log(data);
              setShowSuccessModal(true);
              setTimeout(() => {
                router.push("/income-assessment-tempates");
                setShowSuccessModal(true);
                setTimeout(() => {
                  setShowSuccessModal(false);
                }, 3000);
              }, 1000);
              // setTimeout(() => setShowSuccessModal(false), 10000);
              console.log("Post request is done")
              setSaveButtonIsClicked(false)
              setIsLoading(false);
              // router.push("/income-assessment-tempates")
            } else {
              setErrorMessage(outputdata.errorMessage)

              setSaveErrorMessageSameTemplate(true);
              setTimeout(() => setSaveErrorMessageSameTemplate(false), 10000);
              // console.log("here it got error")
              // console.log(outputdata)
              // console.log(outputdata.errorMessage)

            }
          } catch (error) {
            console.error(error);

          }
        }
      }
      setSaveButtonIsClicked(false)
      setIsLoading(false);
    }


    // Update button is clciked
    else if (updateButtonIsClicked === true) {
      setIsUpdateLoading(true);

      console.log('Update button is clicked')
      // console.log(templateId)
      const occupationId = values.occupation;
      const url = `${BASE_URL}/crm/incomeAssessment/template?occupationId=${occupationId}`;

      // const taskData = localStorage.getItem("formData")
      // console.log("taskData", taskData)
      // console.log("formsData", formsData)
      // console.log("formsData check ", formsData === [] )

      if (taskData === null && formsData === null || formsData.length === 0) {
        console.log("both are null")
        setShowReactgeneratorEmpty(true)
        setTimeout(() => setShowReactgeneratorEmpty(false), 10000);

      }
      // else if(taskData !== null ){
      //   console.log("test not null ")
      //   setShowReactgeneratorEmpty(true)
      //   setTimeout(() => setShowReactgeneratorEmpty(false), 10000);
      // }

      else if (taskData === null) {
        console.log('form is not edited ')

        // console.log(formsData)
        const bearerToken = localStorage.getItem('access_token');

        const data = {
          // occupationId: values.occupation,
          formTitle: values.form_title,
          // version: values.version,
          formDescription: values.description,
          formName: values.form_name,
          templateId: templateId,

          task_data: formsData,
        };
        // console.log(data)

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${bearerToken}`

            },
            body: JSON.stringify(data),
          });
          // console.log(response)
          if (response.ok) {
            const data = await response.json();
            // console.log(data);
            if (data.errorCode === "400") {
              setErrorMessage(data.errorMessage)
              setSaveErrorMessagePopup(true);
              setTimeout(() => setSaveErrorMessagePopup(false), 10000);
            } else {
              setShowSuccessModal(true);
              setTimeout(() => {
                router.push("/income-assessment-tempates");
                setShowSuccessModal(true);
                setTimeout(() => {
                  setShowSuccessModal(false);
                }, 3000);
              }, 1000);
              // setTimeout(() => setShowSuccessModal(false), 10000);
              console.log("Post request is done")
              setUpdateButtonIsClicked(false)
              setIsUpdateLoading(false);
              // router.push("/income-assessment-tempates")

            }
          } else {
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(true), 10000);
          }
        } catch (error) {
          console.error(error);
        }


      } else {
        console.log('form is  edited or new form')

        const bearerToken = localStorage.getItem('access_token');

        const convert = JSON.parse(taskData)
        const onlyArry = convert.task_data
        // console.log(convert)
        // console.log(onlyArry)
        // console.log(onlyArry.length)
        if (onlyArry.length == 0) {
          console.log("it containe empty []")
          setShowReactgeneratorEmpty(true)
          setTimeout(() => setShowReactgeneratorEmpty(false), 10000);
        }
        // const data = {
        //   occupationId: values.occupation,
        //   formTitle: values.form_title,
        //   version: values.version,
        //   formDesc: values.description,
        //   formName: values.form_name,
        //   sections: onlyArry,
        // };
        else {
          const data = {
            // occupationId: values.occupation,
            formTitle: values.form_title,
            // version: values.version,
            formDescription: values.description,
            formName: values.form_name,
            templateId: templateId,

            task_data: onlyArry,
          };
          // console.log(data)

          try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`

              },
              body: JSON.stringify(data),
            });
            // console.log(response)
            if (response.ok) {
              const data = await response.json();
              // console.log(data);
              setShowSuccessModal(true);
              setTimeout(() => {
                router.push("/income-assessment-tempates");
                setShowSuccessModal(true);
                setTimeout(() => {
                  setShowSuccessModal(false);
                }, 3000);
              }, 1000);
              // setTimeout(() => setShowSuccessModal(false), 10000);
              console.log("Post request is done")
              setUpdateButtonIsClicked(false)
              setIsUpdateLoading(false);
              // router.push("/income-assessment-tempates")

            } else {
              setShowErrorModal(true);
              setTimeout(() => setShowErrorModal(false), 10000);
            }
          } catch (error) {
            console.error(error);

          }
        }
      }
      setUpdateButtonIsClicked(false)
      setIsUpdateLoading(false);
    }


    // Submit button is working here
    else {
      setSubmitBiuttonisLoading(true)
      console.log("submit button is clicked")
      // console.log(templateId)
      const occupationId = values.occupation;
      const url = `${BASE_URL}/crm/incomeAssessment/template?occupationId=${occupationId}`;

      // const taskData = localStorage.getItem("formData")
      // console.log(taskData)
      if (taskData === null && formsData === null || formsData.length === 0) {
        console.log("both are null")
        setShowReactgeneratorEmpty(true)
        setTimeout(() => setShowReactgeneratorEmpty(false), 10000);

      }
      // else if(taskData !== null ){
      //   console.log("test not null ")
      //   setShowReactgeneratorEmpty(true)
      //   setTimeout(() => setShowReactgeneratorEmpty(false), 10000);
      // }

      else if (taskData === null) {
        console.log('form is not edited ')

        // console.log(formsData)
        const bearerToken = localStorage.getItem('access_token');

        const data = {
          occupationId: values.occupation,
          formTitle: values.form_title,
          // version: values.version,
          templateName: values.templateName,
          templateId: templateId,
          publish: true,
          formDescription: values.description,
          formName: values.form_name,
          task_data: formsData,
        };
        // console.log(data)

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${bearerToken}`

            },
            body: JSON.stringify(data),
          });
          // console.log(response)
          const outputdata = await response.json();

          if (response.ok) {
            // const data = await response.json();
            // console.log(data.errorCode);
            if (data.errorCode === "400") {
              setErrorMessage(data.errorMessage)
              setSubmitErrorMessagePopup(true);
              setTimeout(() => setSubmitErrorMessagePopup(true), 10000);
            } else {
              setShowSuccessModal(true);
              setTimeout(() => {
                router.push("/income-assessment-tempates");
                setShowSuccessModal(true);
                setTimeout(() => {
                  setShowSuccessModal(false);
                }, 3000);
              }, 1000);
              // setTimeout(() => setShowSuccessModal(false), 10000);
              console.log("Post request is done")
              setSaveButtonIsClicked(false)
              setSubmitBiuttonisLoading(false)
              // router.push("/income-assessment-tempates")

            }
          } else {
            // setShowErrorModal(true);
            // setTimeout(() => setShowErrorModal(true), 10000);
            setErrorMessage(outputdata.errorMessage)
            setSaveErrorMessageSameTemplate(true);
            setTimeout(() => setSaveErrorMessageSameTemplate(false), 10000);
            // console.log("here it got error")
            // console.log(outputdata)
            // console.log(outputdata.errorMessage)
          }
        } catch (error) {
          console.error(error);
        }

      } else {
        console.log('form is  edited or new form')

        const bearerToken = localStorage.getItem('access_token');

        const convert = JSON.parse(taskData)
        const onlyArry = convert.task_data
        // console.log(convert)
        // console.log(onlyArry)
        // console.log(onlyArry.length)
        if (onlyArry.length == 0) {
          console.log("it containe empty []")
          setShowReactgeneratorEmpty(true)
          setTimeout(() => setShowReactgeneratorEmpty(false), 10000);
        }
        // const data = {
        //   occupationId: values.occupation,
        //   formTitle: values.form_title,
        //   version: values.version,
        //   formDesc: values.description,
        //   formName: values.form_name,
        //   sections: onlyArry,
        // };
        else {
          const data = {
            occupationId: values.occupation,
            formTitle: values.form_title,
            // version: values.version,
            templateName: values.templateName,
            templateId: templateId,
            publish: true,
            formDescription: values.description,
            formName: values.form_name,
            task_data: onlyArry,
          };
          // console.log(data)

          try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`

              },
              body: JSON.stringify(data),
            });
            // console.log(response)
            const outputdata = await response.json();

            if (response.ok) {
              // const data = await response.json();
              // console.log(data);
              setShowSuccessModal(true);
              setTimeout(() => {
                router.push("/income-assessment-tempates");
                setShowSuccessModal(true);
                setTimeout(() => {
                  setShowSuccessModal(false);
                }, 3000);
              }, 1000);
              // setTimeout(() => setShowSuccessModal(false), 10000);
              console.log("Post request is done")
              setSaveButtonIsClicked(false)
              setSubmitBiuttonisLoading(false)

              // router.push("/income-assessment-tempates")

            } else {
              // setShowErrorModal(true);
              // setTimeout(() => setShowErrorModal(true), 10000);
              setErrorMessage(`${outputdata.errorMessage} So save First`)
              setSaveErrorMessageSameTemplate(true);
              setTimeout(() => setSaveErrorMessageSameTemplate(false), 10000);
              // console.log("here it got error")
              // console.log(outputdata)
              // console.log(outputdata.errorMessage)
            }
          } catch (error) {
            console.error(error);

          }
        }
      }
      setSaveButtonIsClicked(false)
      setSubmitBiuttonisLoading(false)

    }

    localStorage.removeItem("formData")
    localStorage.removeItem("income-assessment-data")
    // router.push(`/income-assessment-tempates`);

  };


  // const versions = ['1.0', '2.0', '3.0'];

  // const [isSubmitting, setisSubmitting] = useState(false)

  useEffect(() => {
    const bearerToken = localStorage.getItem('access_token');
    const fetchData = async () => {
      const response = await fetch(
        `${BASE_URL}/crm/incomeAssessment/occupations`,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        }
      );
      const data = await response.json();
      setOptions(data.data);
      console.log('Get is successful')
      setIsLoading(false);
    };
    setInitialValues(
      {
        occupation: "",
        version: "1.0",
        form_title: "",
        form_name: "",
        description: "",
        templateName: ""
      }
    )
    fetchData();
  }, []);


  const [download, setDownload] = useState(false)
  const [templateId, setTemplateId] = useState('')
  useEffect(() => {
    setDownload(true)
    const getsaveddata = localStorage.getItem("income-assessment-data")
    // console.log(getsaveddata)
    if (getsaveddata !== null && getsaveddata !== undefined) {
      console.log("not null")
      // console.log(JSON.parse(getsaveddata))
      const savedData = JSON.parse(getsaveddata)
      // console.log(savedData.formName)
      setFormData(savedData.json)
      // console.log(savedData.id)
      setTemplateId(savedData.id)

      // console.log(savedData.json)
      // const converting = JSON.stringify(savedData.json)
      // console.log(converting)
      // setFormData( [{"id":"6B4F521F-1561-489F-9640-C3B66E2E18E6","element":"Header","text":"Header Text","static":true,"required":false,"bold":false,"italic":false,"content":"<p style=\"text-align:center;\">Header ","canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"dirty":false},{"id":"46C4452C-F982-4AE1-AE42-96E4FF249A10","element":"TextInput","text":"Text Input","required":true,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"text_input_3459BB15-DD99-4187-982B-B979EB8524A6","label":"Name ","dirty":false},{"id":"DC4E97D3-BA97-4529-8D2E-A8FCB3BFD1CC","element":"RadioButtons","text":"Multiple Choice","required":true,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"radiobuttons_1AABD0E8-60DE-4BC0-B123-26446304F52B","label":"Select ","options":[{"value":"place_holder_option_1","text":"Place holder option 1","key":"radiobuttons_option_420398A8-B343-41B7-8607-B1DD77088BCC"},{"value":"place_holder_option_2","text":"Place holder option 2","key":"radiobuttons_option_C1DD4E75-9CFB-4FE7-9F63-A1D4B98F3710"},{"value":"place_holder_option_3","text":"Place holder option 3","key":"radiobuttons_option_F25B166F-87C3-407B-956C-3D9F4CE03FBE"}],"dirty":false},{"id":"75799FD7-5658-4741-A6CA-6F4E75BBF495","element":"FileUpload","text":"File Upload","required":false,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"file_upload_803A759E-4268-47A1-BBE2-67437990571B","label":"Placeholder label"},{"id":"E1171553-757E-496B-B2A3-394EF6B42054","element":"Camera","text":"Camera","required":false,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"camera_94274634-08B1-4EFD-BDD2-5E8030CE108B","label":"Placeholder label"}])


      setInitialValues(
        {
          occupation: savedData.occupationId,
          // version: "1.0",
          // templateName: savedData.templateName,
          form_title: savedData.formTitle,
          form_name: savedData.formName,
          description: savedData.formDescription,
          templateName: savedData?.templateName
        }
      )
    }
    else {
      console.log("it is null")

      // console.log(getsaveddata)
      setInitialValues(
        {
          occupation: "",
          // version: "1.0",
          // templateName: "",
          form_title: "",
          form_name: "",
          description: "",
          templateName: ""
        }
      )
      setFormData(null)


    }
    // console.log(getsaveddata)

  }, []);
  //   const saveButtonIsClicked =() =>{
  // console.log('clilcked')
  //   }


  return (
    <div>
      <Head>
        <title>Income Assessment Template</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
      </Head>
      <AdminLayout>
        {submitErrorMessagePopup && (
          <Alert
            variant="danger"
            onClose={() => setSubmitErrorMessagePopup(false)}
            dismissible
            className="alert-top" // <-- add this line
          >
            {errorMessage}
          </Alert>
        )}
        {saveErrorMessagePopup && (
          <Alert
            variant="danger"
            onClose={() => setSaveErrorMessagePopup(false)}
            dismissible
            className="alert-top" // <-- add this line
          >
            {errorMessage}
          </Alert>
        )}
        {saveErrorMessageSameTemplate && (
          <Alert
            variant="danger"
            onClose={() => setSaveErrorMessageSameTemplate(false)}
            dismissible
            className="alert-top" // <-- add this line
          >
            {errorMessage}
          </Alert>
        )}
        {showSuccessModal && (
          <Alert
            variant="success"
            onClose={() => setShowSuccessModal(false)}
            dismissible
            className="alert-top" // <-- add this line
          >
            Successfully added
          </Alert>
        )}
        {/* {JSON.stringify(formsData)} */}
        {/* Error alert */}
        {showErrorModal && (
          <Alert
            variant="danger"
            onClose={() => setShowErrorModal(false)}
            dismissible
            className="alert-top" // <-- add this line
          >
            Something went wrong
          </Alert>
        )}


        {showReactgeneratorEmpty && (
          <Alert
            variant="danger"
            onClose={() => setShowReactgeneratorEmpty(false)}
            dismissible
            className="alert-top" // <-- add this line
          >
            Form is empty
          </Alert>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={Schema}
          onSubmit={handleSubmit}
          enableReinitialize={true}

        >
          {({
            values,
            // versions,
            // handleChange,
            // handleBlur,
            // handleSubmit,
            // isSubmitting,
          }) => (
            <Form className="mb-5 pl-3 pr-4 assessment-form">
              <div className="text-right">
                {/* <button
                  type="submit"
                  onClick={() => setSaveButtonIsClicked(true)}
                  // onClick={handleButtonClick}
                  // disabled={isSubmitting}
                  disabled={isLoading}
                  className="btn btn-primary   mb-3 mt-2 mr-2"
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="mr-2"
                      />
                      Loading...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>

                <button
                  type="submit"
                  onClick={() => setUpdateButtonIsClicked(true)}
                  // onClick={handleButtonClick}
                  // disabled={isSubmitting}
                  disabled={isUpdateLoading}
                  className="btn btn-primary   mb-3 mt-2 mr-2"
                >
                  {isUpdateLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="mr-2"
                      />
                      Loading...
                    </>
                  ) : (
                    "Update"
                  )}
                </button> */}

                {(mode === 'duplicate' || !mode) && (
                  <button
                    type="submit"
                    onClick={() => setSaveButtonIsClicked(true)}
                    disabled={isLoading}
                    className="btn btn-primary mb-3 mt-2 mr-2"
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="mr-2"
                        />
                        Loading...
                      </>
                    ) : (
                      'Save'
                    )}
                  </button>
                )}

                {mode && mode === 'edit' && (
                  <button
                    type="submit"
                    onClick={() => setUpdateButtonIsClicked(true)}
                    disabled={isUpdateLoading}
                    className="btn btn-primary mb-3 mt-2 mr-2"
                  >
                    {isUpdateLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="mr-2"
                        />
                        Loading...
                      </>
                    ) : (
                      'Update'
                    )}
                  </button>
                )}

                {mode && (

                  <button
                    type="submit"
                    // onClick={handleButtonClick}
                    // disabled={isSubmitting}
                    disabled={submitBiuttonisLoading}
                    className="btn btn-primary   mb-3 mt-2 mr-2"
                  >
                    {submitBiuttonisLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="mr-2"
                        />
                        Loading...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                )}

              </div>
              <div className="row">
                <div className="col-lg-6">
                  <label htmlFor="occupation">
                    Occupation <span>*</span>
                  </label>
                  <Field
                    id="occupation"
                    name="occupation"
                    component="select"
                    className="form-control-selection"
                    value={values.occupation}
                  >
                    <option value="" >Select an Occupation</option>
                    {options?.map((options) => (

                      <option key={options.id} value={options.id}>
                        {options.name}
                      </option>
                    ))}
                  </Field>
                  <div style={{ height: "20px" }}>
                    <ErrorMessage name="occupation">
                      {(msg) => <div className="form-text text-danger">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="col-lg-6">
                  <label htmlFor="templateName">
                    Unique Template Name <span>*</span>
                  </label>
                  <Field

                    type="text"
                    id="templateName"
                    name="templateName"

                    // value={values.form_title}
                    className="form-control"
                    placeholder="Enter Form Unique Template Name"
                  />
                  <div style={{ height: "20px" }}>
                    <ErrorMessage name="templateName">
                      {(msg) => <div className="form-text text-danger">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <label htmlFor="form_title">
                    Form Title <span>*</span>
                  </label>
                  <Field
                    type="text"
                    id="form_title"
                    name="form_title"
                    // value={values.form_title}
                    className="form-control"
                    placeholder="Enter Form Title"
                  />
                  <div style={{ height: "20px" }}>
                    <ErrorMessage name="form_title">
                      {(msg) => <div className="form-text text-danger">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="col-lg-6">
                  <label htmlFor="form_name">
                    Form Name <span>*</span>
                  </label>
                  <Field
                    type="text"
                    id="form_name"
                    name="form_name"

                    // value={values.form_name}
                    className="form-control"
                    placeholder="Enter Form Name"
                  />
                  <div style={{ height: "20px" }}>
                    <ErrorMessage name="form_name">
                      {(msg) => <div className="form-text text-danger">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <label htmlFor="description">
                    Description <span>*</span>
                  </label>
                  <Field
                    as="textarea"
                    type="text"
                    id="description"
                    name="description"

                    // value={values.description}
                    className="form-control"
                    placeholder="Enter Description"
                  ></Field>
                  <div style={{ height: "20px" }}>
                    <ErrorMessage name="description">
                      {(msg) => <div className="form-text text-danger">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <Demobar
        // postUrl={postUrl} 
        />
        {download &&
          <FormBuilder.ReactFormBuilder
            onPost={onPost}
            answer_data={registeredElements}
            // data={JSON.stringify(formsData)}
            data={formsData}
            toolbarItems={items}
            // customToolbarItems={items}

            // renderEditForm={props => <MyFormElementsEdit {...props} />}
            renderEditForm={props => {
              console.log("form bulider props", props);
              return <MyFormElementsEdit {...props} />;
            }}
          //url ={url}
          // saveUrl={saveUrl}
          />
        }
        {/* <Grid/> */}
        {/* <MyDataGrid/> */}
        {/* <MyDataGrid
              onRowsChange= {handleRowsChange}

          /> */}
      </AdminLayout>
      {/* Success modal */}
      {/* <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Body className="text-center fs-5 p-0 text-success font-weight-bold">Successfully added</Modal.Body>
      </Modal> */}

      {/* Error modal */}
      {/* <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Body className="text-center fs-5 p-0 text-danger font-weight-bold">Something went wrong</Modal.Body>
      </Modal> */}
    </div>
  );
}

