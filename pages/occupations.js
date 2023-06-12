import React, { useState, useEffect } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import Head from "next/head";
import DataTable from "react-data-table-component";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import { Alert, Modal } from "react-bootstrap";
import DeleteMetadata from '../public/images/icons/DeleteMetadata.svg';
import OccupationAction from '../public/images/icons/OccupationAction.svg';
import { BASE_URL } from "../baseURL";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormControl } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';


const validationSchema = Yup.object().shape({
  occupationName: Yup.string()
    .required('Occupation Name is required'),
  category: Yup.string()
    .required('Category is required'),
  subcategory: Yup.string()
    .required('Subcategory is required'),
  description: Yup.string()
    .required('Description is required'),
  riskCategory: Yup.string()
    .required('Risk Category is required')
});
const categories = [
  "Agriculture",
  "Animal Husbandary and Animal Products",
  "Fishing and Meat/Poultry",
  "Business/Small Enterprise",
  "Individual Self-employed(Service)",
];

const allSubcategories = [
  { category: "Agriculture", name: "Self-employed" },
  { category: "Agriculture", name: "Skilled Labour" },
  { category: "Animal Husbandary and Animal Products", name: "Self-employed" },
  { category: "Animal Husbandary and Animal Products", name: "Skilled Labour" },
  { category: "Fishing and Meat/Poultry", name: "Self-employed" },
  { category: "Fishing and Meat/Poultry", name: "Skilled Labour" },
  { category: "Business/Small Enterprise", name: "Product Sales/Trade Business" },
  { category: "Business/Small Enterprise", name: "Packaged Food, Restaurant, Eatery" },
  { category: "Business/Small Enterprise", name: "Service Business" },
  { category: "Business/Small Enterprise", name: "Manufacturing" },
  { category: "Individual Self-employed(Service)", name: "Skilled Labour" },
  { category: "Individual Self-employed(Service)", name: "Agents" },
  { category: "Individual Self-employed(Service)", name: "Independant Professionals" },
  { category: "Individual Self-employed(Service)", name: "Other" },
];
export default function Occupations() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [data, setData] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [target, setTarget] = useState(null);



  function SwitchComponent({ apiValue, onToggle }) {
    const [checked, setChecked] = useState(apiValue);
  
    const handleToggle = () => {
      setChecked(!checked);
      onToggle(!checked);
    };
  
    return (
      // <label>
      //   <input type="checkbox" checked={checked} onChange={handleToggle} />
      //   {checked ? 'On' : 'Off'}
      // </label>
      <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        label={apiValue ? 'Active' : 'Not Active'}
        checked={apiValue}
        onChange={(e) => onToggle(e.target.checked)}
      />
    </Form>
    );
  }

  const columns = [
    // { name: "#", selector: (row) => row.id },
    { name: "Occupation", selector: (row) => row.occupationName },
    { name: "Category", selector: (row) => row.category },
    { name: "Subcategory", selector: (row) => row.subcategory },
    { name: "Active/Deactive", selector: (row) => (
      <div>
         <SwitchComponent
        apiValue={row.ActiveDeactive === 'Active'}
        onToggle={(newValue) => HandleActiveDeactiveButton(row, newValue)}
      />
      </div>
       )},
    {
      name: "Created On",
      selector: (row) =>
        new Date(row.createdOn).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
    },
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div className="d-flex">
    //       <Button variant="" onClick={() => setSelectedOccupation(row)} style={{ lineHeight: "0.5" }} className="occupationActionButton">
    //         <div className="d-flex">
    //           <Image src={OccupationAction} alt="" />
    //         </div>
    //       </Button>
    //     </div>
    //   ),
    //   style: {
    //     textAlign: "right",
    //   },
    // },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          {/* Add your action buttons here */}
          <Button
            variant=""
            className="occupationActionButton"
            onClick={(event) => {
              setShowPopup(true);
              setSelectedRow(row);
              setTarget(event.target);
            }}
            style={{ lineHeight: "0.5" }}
          >
            <div className="d-flex">
              <Image src={OccupationAction} alt="" />
            </div>

          </Button>
        </div>
      ),
    },
  ];


  // Active and deactive button
  const HandleActiveDeactiveButton = async(row, newValue)=> {
    // console.log(newValue)
    const bearerToken = localStorage.getItem('access_token');
      // console.log("test")
      // console.log(row.ActiveDeactive)
      const response = await fetch(
        `${BASE_URL}/crm/incomeAssessment/occupations?update=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`

          },
          body: JSON.stringify([{
            id: row.id,
            active: newValue
          }]),
        }
      );
      // console.log(response)
      if (response.ok) {
        // The request was successful
        const data = await response.json();
        // console.log(data)
        // alert("Sucessfully added ")
        setShowSuccessModal(true);


        console.log("Sucessfully added")
        fetchData()
        setTimeout(() => setShowSuccessModal(false), 10000);
        // console.log(data)
      } else {
        // The request failed
        // Handle the error
        setShowErrorModal(true);
        setTimeout(() => setShowErrorModal(true), 10000);
        // alert("Something went wrong ")
      }
  }


  // Popup function shows the edit and view 
  function Popup({ row, onClose, onEditClick, onViewClick }) {
    return (
      <Overlay target={target} show={true} placement="bottom" rootClose={true} onHide={onClose}>
        {(props) => (
          <Popover id="popover-contained" {...props}>
            {/* <Popover.Header as="h3">Pop-up</Popover.Header> */}
            <Popover.Body className="p-0">
              {/* Add your pop-up content here */}
              {/* <p>Selected row: {JSON.stringify(row)}</p> */}
              {/* <Button variant="primary" onClick={onClose}>
                view
              </Button>
              <Button variant="primary" onClick={handleEditClick}>
                Edit
              </Button> */}
              {/* <p>view</p> */}
              <p className="" onClick={(() => onViewClick(row.id))}>
                view
              </p>
              <p className="" onClick={(() => onEditClick(row.id))}>
                Edit
              </p>

            </Popover.Body>
          </Popover>
        )}
      </Overlay>
    );
  }


  const handleOpenCreateModal = () => setShowCreateModal(true);

  const handleCloseCreateModal = () => {
    // Clear the input fields
    setInitialValues({
      occupationName: '',
      category: '',
      subcategory: '',
      description: '',
      riskCategory: '',
      metadata: [{ key: '', value: '' }]
    })
    // Close the modal
    setIsReadOnly(false);
    setSubmittingUsingEdit(false)
    setShowCreateModal(false);
  };

  // const handleAddMetadata = () => {
  //   setMetadata([...metadata, { key: "", value: "" }]);
  // };

  // const handleRemoveMetadata = (index) => {
  //   setMetadata(metadata.filter((_, i) => i !== index));
  // };

  // const handleMetadataChange = (index, keyOrValue, event) => {
  //   const newMetadata = [...metadata];
  //   newMetadata[index][keyOrValue] = event.target.value;
  //   setMetadata(newMetadata);
  // };

  // Get reqest 
  const fetchData = async () => {
    const bearerToken = localStorage.getItem('access_token');
    setLoading(true);

    const response = await fetch(
      `${BASE_URL}/crm/incomeAssessment/occupations`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      const newData = data.data.map((item) => ({
        ...item,
        occupationName: item.name,
        category: item.category,
        subcategory: item.subCategory,
        description: item.description,
        ActiveDeactive: item.active ? "Active" : "Not Active",
        // metadata: item.metadata,
        metadata: item.metadata
          ? Object.entries(item.metadata).map(([key, value]) => ({
            key,
            value,
          }))
          : [],
        createdOn: new Date(item.createdAt),
      }));
      console.log("Get is successful")

      setData(newData);
    } else {
      // Handle the error
      console.log("Something went worng")
    }
    setLoading(false);
    setInitialValues({
      occupationName: '',
      category: '',
      subcategory: '',
      description: '',
      riskCategory: '',
      metadata: [{ key: '', value: '' }]
    })

  };
  useEffect(() => {
    fetchData();
  }, []);

  const [submittingUsingEdit, setSubmittingUsingEdit] = useState(false)

  const handleFormSubmit = async (values) => {

    // Updating the OccupationId 
    if (submittingUsingEdit === true) {

      console.log("updating the occupation using edit")
      // Here you can add code to submit the form data to your backend or API
      const bearerToken = localStorage.getItem('access_token');
      // console.log("test")
      // console.log(values)
      const { occupationName, category, subcategory, description, riskCategory, metadata } = values;
      const response = await fetch(
        `${BASE_URL}/crm/incomeAssessment/occupations?update=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`

          },
          body: JSON.stringify([{
            id: occupationId,
            occupationCategory: category,
            occupationSubCategory: subcategory,
            occupation: occupationName,
            description: description,
            riskCategory: riskCategory,
            metadata: metadata.length && metadata.some(({ key, value }) => key || value)
              ? metadata.reduce((acc, { key, value }) => {
                if (key) acc[key] = value;
                return acc;
              }, {})
              : {},

          }]),
        }
      );

      if (response.ok) {
        // The request was successful
        const data = await response.json();
        // alert("Sucessfully added ")
        setShowSuccessModal(true);


        console.log("Sucessfully added")
        fetchData()
        setTimeout(() => setShowSuccessModal(false), 10000);
        // console.log(data)
      } else {
        // The request failed
        // Handle the error
        setShowErrorModal(true);
        setTimeout(() => setShowErrorModal(true), 10000);
        // alert("Something went wrong ")
      }

      // Add the new occupation to the data array
      // setData((prevData) => [
      //   ...prevData,
      //   {
      //     id: prevData.length + 1,
      //     occupationName: occupationName,
      //     category: category,
      //     subcategory,
      //     description,
      //     metadata,
      //     createdOn: new Date(),
      //   },
      // ]);

      // Close the create modal

    }
    else {
      console.log('posting new one')
      // Here you can add code to submit the form data to your backend or API
      const bearerToken = localStorage.getItem('access_token');
      console.log("test")
      // console.log(values)
      const { occupationName, category, subcategory, description, riskCategory, metadata } = values;
      const response = await fetch(
        `${BASE_URL}/crm/incomeAssessment/occupations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`

          },
          body: JSON.stringify([{

            occupationCategory: category,
            occupationSubCategory: subcategory,
            occupation: occupationName,
            description: description,
            riskCategory: riskCategory,
            metadata: metadata.length && metadata.some(({ key, value }) => key || value)
              ? metadata.reduce((acc, { key, value }) => {
                if (key) acc[key] = value;
                return acc;
              }, {})
              : {},

          }]),
        }
      );

      if (response.ok) {
        // The request was successful
        const data = await response.json();
        // alert("Sucessfully added ")
        setShowSuccessModal(true);


        console.log("Sucessfully added")
        fetchData()
        setTimeout(() => setShowSuccessModal(false), 10000);
        // console.log(data)
      } else {
        // The request failed
        // Handle the error
        setShowErrorModal(true);
        setTimeout(() => setShowErrorModal(true), 10000);
        // alert("Something went wrong ")
      }
    }
   
    handleCloseCreateModal();
  };

const [occupationId, setOccupationId] = useState('')
  const [initialValues, setInitialValues] = useState('')

  const handlePoPupEditClick = async (id,) => {
    setSubmittingUsingEdit(true)
    setOccupationId(id)
    console.log("handle click")
    // console.log(id)
    const bearerToken = localStorage.getItem('access_token');
    // Make the GET API request
    const response = await fetch(`${BASE_URL}/crm/incomeAssessment/occupations?id=${id}`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log("good")
      // Convert the metadata object into an array of objects with key and value properties
      const metadataArray = Object.entries(data.data[0].metadata).map(([key, value]) => ({
        key,
        value,
      }));
      // console.log(metadataArray)
      setInitialValues({
        occupationName: data.data[0].name,
        category: data.data[0].category,
        subcategory: data.data[0].subCategory,
        description: data.data[0].description,
        riskCategory: data.data[0].riskCategory,
        metadata: metadataArray
        // metadata: [{ key: '', value: '' }]

      })
      setShowCreateModal(true)

    } else {
      console.log('bad')
      setInitialValues({
        occupationName: '',
        category: '',
        subcategory: '',
        description: '',
        riskCategory: '',
        metadata: [{ key: '', value: '' }]
      })

    }
    // setShowCreateModal(true)

    // Make the fetch request here
  };


  // View button is clicked this will work
  const [isReadOnly, setIsReadOnly] = useState(false);

  const handleViewClick = async (id) => {
    setIsReadOnly(true);
    setShowCreateModal(true)
    console.log("handle view click")
    // console.log(id)
    const bearerToken = localStorage.getItem('access_token');
    // Make the GET API request
    const response = await fetch(`${BASE_URL}/crm/incomeAssessment/occupations?id=${id}`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );
    const data = await response.json();
    console.log(data)

    if (response.ok) {
      console.log("good")
      // Convert the metadata object into an array of objects with key and value properties
      const metadataArray = Object.entries(data.data[0].metadata).map(([key, value]) => ({
        key,
        value,
      }));
      // console.log(metadataArray)
      setInitialValues({
        occupationName: data.data[0].name,
        category: data.data[0].category,
        subcategory: data.data[0].subCategory,
        description: data.data[0].description,
        riskCategory: data.data[0].riskCategory,
        metadata: metadataArray
      })
      setShowCreateModal(true)

    } else {
      console.log('bad')
      setInitialValues({
        occupationName: '',
        category: '',
        subcategory: '',
        description: '',
        riskCategory: '',
        metadata: [{ key: '', value: '' }]
      })

    }
  };

  return (
    <div>
      <Head>
        <title>Occupations</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        {showPopup && (
          <Popup
            row={selectedRow}
            onClose={() => setShowPopup(false)}
            setShowCreateModal={setShowCreateModal}
            // setFieldValue={setFieldValue} // Pass the setFieldValue function as a prop
            onEditClick={handlePoPupEditClick}
            onViewClick={handleViewClick}
          />
        )}
        {showSuccessModal && (
          <Alert
            variant="success"
            onClose={() => setShowSuccessModal(false)}
            dismissible
            className="alert-top"
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
            className="alert-top"
          >
            Something went wrong
          </Alert>
        )}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="row toolbar">
              <div className="col-lg-4">
                <InputGroup className="mb-3 ms-3">
                  <InputGroup.Text id="basic-addon1">
                    <Image
                      src="/images/icons/search-icon.svg"
                      width="18"
                      height="18"
                      alt=""
                    ></Image>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search"
                    aria-label="search"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </div>
              <div className="col-lg-8 d-flex justify-content-end">
                <Button variant="primary me-4" onClick={handleOpenCreateModal}>
                  + Create New
                </Button>
              </div>
            </div>
            <DataTable columns={columns} data={data} pagination />
          </>

        )}
      </AdminLayout>
      <Modal show={showCreateModal} onHide={handleCloseCreateModal} className="modal-lg">
        <Modal.Header closeButton className="occupationModalHeader">
          <Modal.Title>Create New Occupation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={
              //   {
              //   occupationName: '',
              //   category: '',
              //   subcategory: '',
              //   description: '',
              //   riskCategory: '',
              //   metadata: [{ key: '', value: '' }]
              // }
              initialValues
            }
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
            enableReinitialize={true}

          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue
            }) => {
              // Filter subcategories based on selected category
              const subcategories = allSubcategories.filter(
                (subcategory) => subcategory.category === values.category
              );

              return (
                <Form onSubmit={handleSubmit}  >
                  <Form.Group className="occupationModalGroup mb-3">
                    <Form.Label>Occupation Name<span>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="occupationName"
                      value={values.occupationName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      readOnly={isReadOnly}
                      placeholder="Enter occupation name"
                      onKeyPress={(event) => {
                        // Prevent non-alphabetic characters
                        if (!/[a-zA-Z\s]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                    {touched.occupationName && errors.occupationName && (
                      <div className="form-text text-danger">{errors.occupationName}</div>
                    )}
                  </Form.Group>
                  <Form.Group className="occupationModalGroup mb-3">
                    <Form.Label>Category<span>*</span></Form.Label>
                    <Form.Select
                      name="category"
                      value={values.category}
                      onChange={(event) => {
                        handleChange(event);
                        // Reset subcategory value when category changes
                        setFieldValue('subcategory', '');
                      }}
                      onBlur={handleBlur}
                      disabled={isReadOnly}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </Form.Select>
                    {touched.category && errors.category && (
                      <div className="form-text text-danger">{errors.category}</div>
                    )}
                  </Form.Group>
                  <Form.Group className="occupationModalGroup mb-3">
                    <Form.Label>Subcategory<span>*</span></Form.Label>
                    <Form.Select
                      name="subcategory"
                      value={values.subcategory}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isReadOnly}
                    >
                      <option value="">Select a subcategory</option>
                      {subcategories.map((subcategory) => (
                        <option key={subcategory.name} value={subcategory.name}>
                          {subcategory.name}
                        </option>
                      ))}
                    </Form.Select>
                    {touched.subcategory && errors.subcategory && (
                      <div className="form-text text-danger">{errors.subcategory}</div>
                    )}
                  </Form.Group>
                  <Form.Group className="occupationModalGroupDescription mb-3">
                    <Form.Label>Description<span>*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      readOnly={isReadOnly}
                      placeholder="Enter description "
                    />
                    {touched.description && errors.description && (
                      <div className="form-text text-danger">{errors.description}</div>
                    )}
                  </Form.Group>
                  <Form.Group className="occupationModalGroup mb-3">
                    <Form.Label>Risk Category</Form.Label>
                    <Form.Select
                      name="riskCategory"
                      value={values.riskCategory}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isReadOnly}
                    >
                      <option value="">Select a risk category</option>
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                    </Form.Select>
                    {touched.riskCategory && errors.riskCategory && (
                      <div className="form-text text-danger">{errors.riskCategory}</div>
                    )}
                  </Form.Group>

                  {/* Keep the metadata fields as text inputs */}
                  {values.metadata.map((data, index) => (
                    <Form.Group className="occupationModalGroup mb-3" key={index}>
                      <Form.Label>Metadata</Form.Label>
                      <div className="d-flex mb-3">
                        <InputGroup className="me-2">
                          <FormControl
                            type="text"
                            placeholder="Enter key"
                            name={`metadata[${index}].key`}
                            value={data.key}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            readOnly={isReadOnly}
                          />
                        </InputGroup>

                        <InputGroup className="">
                          <FormControl
                            type="text"
                            placeholder="Enter Value"
                            name={`metadata[${index}].value`}
                            value={data.value}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            readOnly={isReadOnly}
                          />
                        </InputGroup>

                        {values.metadata.length > 1 && (
                          <Button
                            variant=""
                            className="ms-2 occupationMetadataRemoveButton"
                            onClick={() => {
                              const newMetadata = [...values.metadata];
                              newMetadata.splice(index, 1);
                              setFieldValue('metadata', newMetadata);
                            }}
                            disabled={isReadOnly}
                          >
                            {/* - */}
                            <Image src={DeleteMetadata} />
                          </Button>
                        )}
                      </div>
                    </Form.Group>
                  ))}

                  {/* Keep the add metadata button */}
                  <p
                    onClick={
                      !isReadOnly
                        ? () => {
                          const newMetadata = [...values.metadata, { key: '', value: '' }];
                          setFieldValue('metadata', newMetadata);
                        }
                        : undefined
                    }
                    className="addOccupationMetadata"
                    disabled={isReadOnly}
                  >
                    + Add Metadata
                  </p>

                  <div className="occupationFooter">
                    {/* Update the cancel button to reset the form */}
                    <Button variant="secondary"
                      disabled={isReadOnly}
                      onClick={() => {
                        // resetForm();
                        handleCloseCreateModal();
                      }} className="occupatoionFooterCancelButton">
                      Cancel
                    </Button>
                    {/* Update the create button to submit the form */}
                    <Button variant="primary" type="submit" className="occupatoionFooterSubmitButton" disabled={isReadOnly}>
                      Create
                    </Button>
                  </div>

                </Form>
              );
            }}
          </Formik>
        </Modal.Body>

        {/* Keep the modal footer */}
        {/* <Modal.Footer className="occupationFooter"> */}
        {/* Update the cancel button to reset the form */}
        {/* <Button variant="secondary" onClick={() => {
          resetForm();
          handleCloseCreateModal();
        }} className="occupatoionFooterCancelButton">
          Cancel
        </Button> */}
        {/* Update the create button to submit the form */}
        {/* <Button variant="primary" type="submit" className="occupatoionFooterSubmitButton">
          Create
        </Button>
      </Modal.Footer> */}
      </Modal>
    </div>
  );
}



