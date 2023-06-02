import React, { useState, useEffect } from "react";
import FormBuilder from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import Demobar from "@/components/DemoBar";
import AdminLayout from "@/layouts/AdminLayout";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "../baseURL";
import Head from "next/head";
import { Alert, Modal } from "react-bootstrap";
import { Spinner } from "react-bootstrap";


const onPost = (data) => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('formData', jsonData);
  // console.log( jsonData);
  // console.log(data)
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {

    setIsLoading(true);
    const occupationId = values.occupation;
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
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 10000);
        console.log("Post request is done")
      } else {
        setShowErrorModal(true);
        setTimeout(() => setShowErrorModal(true), 10000);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);


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
      setIsLoading(false);
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
          }) => (
            <Form className="mb-5 pl-3 pr-4 assessment-form">
              <div className="text-right">
                 <button
                type="submit"
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
                  "Submit"
                )}
              </button>
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
            </Form>
          )}
        </Formik>
        <Demobar
        // postUrl={postUrl} 
        />
        <FormBuilder.ReactFormBuilder
          onPost={onPost}
        // url={url}
        // saveUrl={saveUrl}
        />
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

