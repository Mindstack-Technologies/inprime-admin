import React, { useState, useEffect } from "react";
import FormBuilder from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import Demobar from "@/components/DemoBar";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { TouchBackend } from "react-dnd-touch-backend";
// // import { HTML5Backend } from "react-dnd-html5-backend";
// import { MultiBackend } from "react-dnd-multi-backend";
// import { TouchTransition } from "react-dnd-multi-backend";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { TouchBackend } from "react-dnd-touch-backend";
// import MultiBackend from "react-dnd-multi-backend";
// import { TouchTransition } from "react-dnd-multi-backend-touch";
import AdminLayout from "@/layouts/AdminLayout";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "../baseURL";
import Head from "next/head";



// Form Data
// const url = "/api/formdata";
// const saveUrl = "/api/formdata";
// const postUrl = "/api/form";

// const onPost = (data) => {
//   console.log("onPost=", data);
// };
const onPost = (data) => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('formData', jsonData);

  // console.log("onPost=", jsonData);
  // console.log(data)
  // const jsonData = JSON.stringify(data);
  // localStorage.setItem('formData', JSON.stringify(data));
  localStorage.setItem('formData', jsonData);
  // const jsonData = JSON.stringify(data);
  // console.log("onPost=", jsonData);
  // try {
  //   const parsedData = JSON.parse(jsonData);
  //   // console.log("onPost=", jsonData);
  //   console.log("data is valid JSON");
  // } catch (e) {
  //   console.log("data is not valid JSON:", e);
  // }
};

const Schema = Yup.object().shape({
  occupation: Yup.string().required("occupation is required"),
  version: Yup.string().required("version is required"),
  form_title: Yup.string().required("form title is required"),
  form_name: Yup.string().required("form name is required"),
  description: Yup.string().required("description is required"),
});

const initialValues = {
  occupation: "",
  version: "",
  form_title: "",
  form_name: "",
  description: ""
};



export default function IncomeAssessmentTemplate() {

  const handleSubmit = async (values) => {


    // const baseUrl = "https://staging-api.inprime.in";
    const occupationId = values.occupation;
    // console.log(occupationId)
    const url = `${BASE_URL}/crm/incomeAssessment/template?occupationId=${occupationId}`;

    const taskData = localStorage.getItem("formData")
    const convert = JSON.parse(taskData)
    const onlyArry = convert.task_data
    // console.log(onlyArry)
    // const data = {
    //   occupationId: values.occupation,
    //   formTitle: values.form_title,
    //   version: values.version,
    //   formDesc: values.description,
    //   formName: values.form_name,
    //   sections: onlyArry,
    // };
    
    const data = {
      occupationId: values.occupation,
      formTitle: values.form_title,
      version: values.version,
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
        },
        body: JSON.stringify(data),
      });
      // console.log(response)
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        console.log("Post request is done")
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }

  };


  const versions = ['1.0', '2.0', '3.0'];

  const [options, setOptions] = useState([]);
  // const [isSubmitting, setisSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/crm/incomeAssessment/occupations`);
      const data = await response.json();
      setOptions(data.data);
      console.log('Get is successful')
      // console.log(options)
    };
    fetchData();
  }, []);

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
        <Formik
          initialValues={initialValues}
          validationSchema={Schema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            // versions,
            // handleChange,
            // handleBlur,
            // handleSubmit,
            // isSubmitting,
            /* and other goodies */
          }) => (
            <Form className="mb-5 pl-3 pr-4 assessment-form">
              <div className="row">
                <div className="col-lg-6">
                  <label htmlFor="occupation">
                    Occupation <span>*</span>
                  </label>
                  <Field
                    id="occupation"
                    name="occupation"
                    component="select"
                    className="form-control"
                    value={values.occupation}
                  >
                    <option value="" >Select a category</option>
                    {options.map((options) => (

                      <option key={options.id} value={options.id}>
                        {options.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="occupation">
                    {(msg) => <div className="form-text text-danger">{msg}</div>}
                  </ErrorMessage>
                  {/* {errors.occupation && touched.occupation} */}
                </div>
                <div className="col-lg-6">
                  <label htmlFor="version">
                    Version <span>*</span>
                  </label>
                  <Field as="select" id="version" name="version" className="form-control">
                    {/* Add a default option */}
                    <option value="">Select a version</option>

                    {/* Map over the versions array to create option elements */}
                    {versions.map((version) => (
                      <option key={version} value={version}>
                        {version}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="version">
                    {(msg) => <div className="form-text text-danger">{msg}</div>}
                  </ErrorMessage>
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
                    placeholder="Enter form title"
                  />
                  <ErrorMessage name="form_title">
                    {(msg) => <div className="form-text text-danger">{msg}</div>}
                  </ErrorMessage>
                  {/* {errors.form_title && touched.form_title} */}
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
                    placeholder="Enter form Name"
                  />
                  <ErrorMessage name="form_name">
                    {(msg) => <div className="form-text text-danger">{msg}</div>}
                  </ErrorMessage>
                  {/* {errors.form_name && touched.form_name} */}
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
                  <ErrorMessage name="description">
                    {(msg) => <div className="form-text text-danger">{msg}</div>}
                  </ErrorMessage>
                  {/* {errors.description && touched.description} */}
                </div>
              </div>
              {/* <button onClick={handleButtonClick}>Log Values</button> */}

              <button
                type="submit"
                // onClick={handleButtonClick}
                // disabled={isSubmitting}
                className="btn btn-primary  mt-3"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        {/* <DndProvider backend={MultiBackend} options={HTML5toTouch}> */}
        <Demobar
        // postUrl={postUrl} 
        />
        {/* <Demobar postUrl={postUrl} onPost={onPost} /> */}

        <FormBuilder.ReactFormBuilder
          onPost={onPost}
        // url={url}
        // saveUrl={saveUrl}
        />
        {/* </DndProvider> */}
        {/* <button
                type="submit"
                // disabled={isSubmitting}
                className="btn btn-primary"
              >
                Submit
              </button> */}
      </AdminLayout>
    </div>
  );
}

