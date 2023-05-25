import React, { useState, useEffect } from "react";
import FormBuilder from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import Demobar from "@/components/DemoBar";
import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend } from "react-dnd-multi-backend";
import { TouchTransition } from "react-dnd-multi-backend";
import AdminLayout from "@/layouts/AdminLayout";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Head from "next/head";

// Form Data
const url = "/api/formdata";
const saveUrl = "/api/formdata";
const postUrl = "/api/form";

// const onPost = (data) => {
//   console.log("onPost=", data);
// };
const onPost = (data) => {
  const jsonData = JSON.stringify(data);
  console.log("onPost=", jsonData);
  try {
    const parsedData = JSON.parse(jsonData);
    // console.log("onPost=", jsonData);
    console.log("data is valid JSON");
  } catch (e) {
    console.log("data is not valid JSON:", e);
  }
};

const Schema = Yup.object().shape({
  amount: Yup.string().required("Amount is required"),
});

const initialValues = {
  amount: "",
};

const _handleSubmit = () => {};

export default function IncomeAssessmentTemplate() {
  
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
          onSubmit={_handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form className="mb-5 pl-3 pr-4 assessment-form">
              <div className="row">
                <div className="col-lg-6">
                  <label htmlFor="occupation">
                    Occupation <span>*</span>
                  </label>
                  <Field
                    name="occupation"
                    component="select"
                    className="form-control"
                  >
                    <option value="red">Marginal Farmer</option>
                  </Field>

                  {errors.occupation && touched.occupation}
                </div>
                <div className="col-lg-6">
                  <label htmlFor="version">
                    Version <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.occupation}
                    className="form-control"
                    placeholder="Enter Occupation"
                  />
                  {errors.version && touched.version}
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <label htmlFor="form_title">
                    Form Title <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="form_title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.form_title}
                    className="form-control"
                    placeholder="Enter form title"
                  />
                  {errors.form_title && touched.form_title}
                </div>
                <div className="col-lg-6">
                  <label htmlFor="form_name">
                    Form Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="form_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.form_name}
                    className="form-control"
                    placeholder="Enter form Name"
                  />
                  {errors.form_name && touched.form_name}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <label htmlFor="form_name">
                    Description <span>*</span>
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className="form-control"
                    placeholder="Enter Description"
                  ></textarea>
                  {errors.description && touched.description}
                </div>
              </div>

              {/* <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                Submit
              </button> */}
            </form>
          )}
        </Formik>
        <DndProvider backend={TouchBackend}>
          <Demobar postUrl={postUrl} />
          {/* <Demobar postUrl={postUrl} onPost={onPost} /> */}

          <FormBuilder.ReactFormBuilder
            onPost={onPost}
            url={url}
            saveUrl={saveUrl}
          />
        </DndProvider>
      </AdminLayout>
    </div>
  );
}





// import React, { useState, useEffect } from "react";
// import FormBuilder from "react-form-builder2";
// import "react-form-builder2/dist/app.css";
// import Demobar from "@/components/DemoBar";
// import { DndProvider } from "react-dnd";
// // import { HTML5Backend } from "react-dnd-html5-backend";
// import { TouchBackend } from "react-dnd-touch-backend";
// import { MultiBackend } from "react-dnd-multi-backend";
// import { TouchTransition } from "react-dnd-multi-backend";
// import AdminLayout from "@/layouts/AdminLayout";
// import { Formik, Field } from "formik";
// import * as Yup from "yup";

// import Head from "next/head";

// // Form Data
// const url = "/api/formdata";
// const saveUrl = "/api/formdata";
// const postUrl = "/api/form";

// const onPost = (data) => {
//   console.log("onPost=", data);
// };
// // const [formData, setFormData] = useState({});

// // const onPost = (data) => {
// //   console.log("onPost=", data);
// //   setFormData(data);
// // };

// const Schema = Yup.object().shape({
//   amount: Yup.string().required("Amount is required"),
// });

// const initialValues = {
//   amount: "",
// };

// const _handleSubmit = () => {};

// export default function IncomeAssessmentTemplate() {
//   // const [formData, setFormData] = useState({});

//   // const onPost = (data) => {
//   //   console.log("onPost=", data);
//   //   setFormData(data);
//   // };

//   // const [formData, setFormData] = useState(null);

//   // const onPost = (data) => {
//   //   // Save data to state
//   //   setFormData(data);
//   //   // console.log
//   // };

//   // useEffect(() => {
//   //   console.log(formData);
//   // }, [formData]);
//   return (
//     <div>
//       <Head>
//         <title>Income Assessment Template</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//         <link
//           rel="stylesheet"
//           href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
//         />
//         <link
//           rel="stylesheet"
//           href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
//           integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
//           crossOrigin="anonymous"
//         />
//       </Head>
//       <AdminLayout>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={Schema}
//           onSubmit={_handleSubmit}
//         >
//           {({
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             isSubmitting,
//             /* and other goodies */
//           }) => (
//             <form className="mb-5 pl-3 pr-4 assessment-form">
//               <div className="row">
//                 <div className="col-lg-6">
//                   <label htmlFor="occupation">
//                     Occupation <span>*</span>
//                   </label>
//                   <Field
//                     name="occupation"
//                     component="select"
//                     className="form-control"
//                   >
//                     <option value="red">Marginal Farmer</option>
//                   </Field>

//                   {errors.occupation && touched.occupation}
//                 </div>
//                 <div className="col-lg-6">
//                   <label htmlFor="version">
//                     Version <span>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="occupation"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.occupation}
//                     className="form-control"
//                     placeholder="Enter Occupation"
//                   />
//                   {errors.version && touched.version}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-lg-6">
//                   <label htmlFor="form_title">
//                     Form Title <span>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="form_title"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.form_title}
//                     className="form-control"
//                     placeholder="Enter form title"
//                   />
//                   {errors.form_title && touched.form_title}
//                 </div>
//                 <div className="col-lg-6">
//                   <label htmlFor="form_name">
//                     Form Name <span>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="form_name"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.form_name}
//                     className="form-control"
//                     placeholder="Enter form Name"
//                   />
//                   {errors.form_name && touched.form_name}
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-lg-12">
//                   <label htmlFor="form_name">
//                     Description <span>*</span>
//                   </label>
//                   <textarea
//                     type="text"
//                     name="description"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.description}
//                     className="form-control"
//                     placeholder="Enter Description"
//                   ></textarea>
//                   {errors.description && touched.description}
//                 </div>
//               </div>

//               {/* <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="btn btn-primary"
//               >
//                 Submit
//               </button> */}
//             </form>
//           )}
//         </Formik>
//         <DndProvider backend={TouchBackend}>
//           <Demobar postUrl={postUrl} />
//           {/* <Demobar postUrl={postUrl} onPost={onPost} /> */}
//           {/* <Demobar data={data} postUrl={postUrl} /> */}
//           {/* <Demobar data={formData} postUrl={postUrl} /> */}

//           <FormBuilder.ReactFormBuilder
//             onPost={onPost}
//             url={url}
//             saveUrl={saveUrl}
//           />
//         </DndProvider>
//       </AdminLayout>
//     </div>
//   );
// }
