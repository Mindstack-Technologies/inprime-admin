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
import CustomPagination from "../components/CustomPagination";
import CustomStylesTable from "@/components/CustomStylesTable";

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
  const [showingTemplateNameAndVersion, setshowingTemplateNameAndVersion] = useState(false)
  const [templatesArray, setTemplatesArray] = useState([]);
  const [showErrorMessageModal, setShowErrorMessageModal] = useState(false)
  const [errorMessageFromResponse, seterrorMessageFromResponse] = useState('')

  

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
    {
      name: "Occupation", selector: (row) => row.occupationName, sortable: true,
      // width: "auto"
    },
    {
      name: "Template Name", selector: (row) => row.templateName,
      // width: "auto"
    },
    {
      name: "Version", selector: (row) => row.version,
      width: "100px"
    },
    {
      name: "Category", selector: (row) => row.category,
      // width: "auto"
    },
    {
      name: "Subcategory", selector: (row) => row.subcategory,
      // width: "auto"
    },
    // { name: "Active/Deactive", selector: (row) => (
    //   <div>
    //      <SwitchComponent
    //     apiValue={row.ActiveDeactive === 'Active'}
    //     onToggle={(newValue) => HandleActiveDeactiveButton(row, newValue)}
    //   />
    //   </div>
    //    )}, 
    {
      name: "Active/Deactive",
      selector: (row) => (
        <div>
          <SwitchComponent
            apiValue={row.ActiveDeactive === 'Active'}
            onToggle={(newValue) => HandleActiveDeactiveButton(row, newValue)}
          />
        </div>
      ),
      sortable: true,
      sortFunction: (rowA, rowB) => {
        // Compare the values of rowA.ActiveDeactive and rowB.ActiveDeactive
        if (rowA.ActiveDeactive === rowB.ActiveDeactive) return 0;
        if (rowA.ActiveDeactive === 'Active') return -1;
        return 1;
      },
      width: "170px"

    },
    {
      name: "Created On",
      selector: (row) =>
        new Date(row.createdOn).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      sortable: true,
      width: "130px"


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
      width: "100px"
    },
  ];



  // setsuccessMessageFromResponse(responsedata.errorMessage)
  //     setShowSuccessMessageModal(true);
  //     setTimeout(() => setShowSuccessMessageModal(false), 10000);
  const [successMessageFromResponse, setsuccessMessageFromResponse] = useState('')
  const [showSuccessMessageModal, setShowSuccessMessageModal] = useState(false)

  // Active and deactive button
  const HandleActiveDeactiveButton = async (row, newValue) => {
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
    const responsedata = await response.json();

    // console.log(response)
    if (response.ok) {
      // The request was successful
      // const data = await response.json();
      // console.log(data)
      // alert("Sucessfully added ")
      // setShowSuccessModal(true);

      console.log("Sucessfully added")
      // fetchData()
      // setTimeout(() => setShowSuccessModal(false), 10000);

      setsuccessMessageFromResponse("Success fully Changed")
      setShowSuccessMessageModal(true);

      fetchData()

      setTimeout(() => setShowSuccessMessageModal(false), 10000);
      // console.log(data)
    } else {
      // The request failed
      // Handle the error
      seterrorMessageFromResponse(responsedata.errorMessage)
      setShowErrorMessageModal(true);
      setTimeout(() => setShowErrorMessageModal(false), 10000);
      // setShowErrorModal(true);
      // setTimeout(() => setShowErrorModal(false), 10000);
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
              <p className="" onClick={(() => onViewClick(row))}>
                View
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

  const handleOpenCreateModal = () => {
    setShowPopup(false);
    setShowCreateModal(true);
  }

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
    setIsEditClicked(false)

    setIsReadOnly(false);
    setSubmittingUsingEdit(false)
    setshowingTemplateNameAndVersion(false)
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
      // const newDataPromises = data.data.map(async (item) => {
      //   // Make API call to get occupation data using item.occupationId
      //   const occupationResponse = await fetch(`${BASE_URL}/crm/incomeAssessment/occupations?id=${item.occupationId}`, {
      //     headers: {
      //       'Authorization': `Bearer ${bearerToken}`
      //     }
      //   });
      //   // console.log(occupationResponse)
      //   const occupationData = await occupationResponse.json();
      //   const occupationName = occupationData?.data?.[0]?.name;
      //   return {
      //     id: item.id,
      //     templateName: item.formTitle,
      //     version: item.version,
      //     occupation: occupationName,
      //     ActiveDeactive: item.active ? "Active" : "Not Active",
      //     createdOn: new Date(item.createdAt),
      //     published: item.status,
      //     occupationID: item.occupationId,
      //     json: item.json,
      //     formName: item.formName,
      //     formDescription: item.formDescription,
      //     UniqueTemplateName :item.templateName
      //   };
      // });
      // console.log("Get is successful")
      // const newData = await Promise.all(newDataPromises);
      // // console.log(newData)
      // setData(newData);


      const newDataPromises = data.data.map(async (item) => {
        // Make API call to get occupation data using item.occupationId


        //   const occupationResponse = await fetch(`${BASE_URL}/crm/incomeAssessment/templates?id=${item.templateId}`, {
        //     headers: {
        //       'Authorization': `Bearer ${bearerToken}`
        //     }
        //   });
        //   // console.log(occupationResponse)
        //   const occupationData = await occupationResponse.json();
        //   // console.log(occupationData)
        //   const template_name = occupationData?.data?.[0]?.templateName;
        //   const version = occupationData?.data?.[0]?.version;

        let template_name;
        let version;
        if (item.templateId) {
          // Make API call to get occupation data using item.occupationId
          const occupationResponse = await fetch(
            `${BASE_URL}/crm/incomeAssessment/templates?id=${item.templateId}`,
            {
              headers: {
                'Authorization': `Bearer ${bearerToken}`,
              },
            }
          );
          // console.log(occupationResponse)
          const occupationData = await occupationResponse.json();
          // console.log(occupationData);
          template_name = occupationData?.data?.[0]?.templateName;
          version = occupationData?.data?.[0]?.version;
        }
        return {
          ...item,
          occupationName: item.name,
          category: item.category,
          subcategory: item.subCategory,
          description: item.description,
          ActiveDeactive: item.active ? "Active" : "Not Active",
          // metadata: item.metadata,
          templateId: item.templateId,
          templateName: template_name,
          version: version,
          metadata: item.metadata
            ? Object.entries(item.metadata).map(([key, value]) => ({
              key,
              value,
            }))
            : [],
          createdOn: new Date(item.createdAt),
        };
      });
      console.log("Get is successful")
      const newData = await Promise.all(newDataPromises);
      // console.log(newData)
      setData(newData);



      // const newData = data.data.map((item) => ({
      //   ...item,
      //   occupationName: item.name,
      //   category: item.category,
      //   subcategory: item.subCategory,
      //   description: item.description,
      //   ActiveDeactive: item.active ? "Active" : "Not Active",
      //   // metadata: item.metadata,
      //   templateId: item.templateId,
      //   metadata: item.metadata
      //     ? Object.entries(item.metadata).map(([key, value]) => ({
      //       key,
      //       value,
      //     }))
      //     : [],
      //   createdOn: new Date(item.createdAt),
      // }));
      // console.log("Get is successful")
      // console.log(newData)
      // setData(newData);


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
      TemplateName: '',
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
      // console.log(values.TemplateName)

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
            templateId: values.TemplateName,
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
      const responsedata = await response.json();


      if (response.ok) {
        // The request was successful
        // const responsedata = await response.json();
        // alert("Sucessfully added ")
        setShowSuccessModal(true);


        console.log("Sucessfully added")
        fetchData()
        setTimeout(() => setShowSuccessModal(false), 10000);
        // console.log(data)
      } else {
        // The request failed
        // Handle the error
        // console.log(responsedata)
        // console.log(responsedata.errorMessage)
        seterrorMessageFromResponse(responsedata.errorMessage)
        setShowErrorMessageModal(true);
        setTimeout(() => setShowErrorMessageModal(false), 10000);
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
  const [isEditClicked, setIsEditClicked] = useState(false);

  const handlePoPupEditClick = async (id,) => {
    setShowPopup(false);

    setIsEditClicked(true)
    // console.log(isEditClicked)
    setSubmittingUsingEdit(true)
    setshowingTemplateNameAndVersion(true)
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
      // console.log("good")
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
        TemplateName: data?.data?.[0]?.templateId,
        metadata: metadataArray
        // metadata: [{ key: '', value: '' }]

      })


      const templatesResponse = await fetch(`${BASE_URL}/crm/incomeAssessment/templates?occupationId=${id}&status=PUBLISHED`,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        }
      );
      const templatesData = await templatesResponse.json();
      // console.log(templatesData)

      if (templatesResponse.ok) {
        // Use the templatesData to update the state of your component
        // console.log(templatesData)
        const templatesArray = templatesData.data.map(template => ({
          version: template.version,
          id: template.id,
          templateName: template.templateName,
          formTitle: template.formTitle
        }));
        setTemplatesArray(templatesArray)
        // console.log(templatesArray)

      } else {
        // Handle error
      }



      setShowCreateModal(true)

    } else {
      console.log('bad')
      setInitialValues({
        occupationName: '',
        category: '',
        subcategory: '',
        description: '',
        riskCategory: '',
        templateName: '',
        metadata: [{ key: '', value: '' }]
      })

    }
    // setIsEditClicked(false)

    // setShowCreateModal(true)

    // Make the fetch request here
  };


  // View button is clicked this will work
  const [isReadOnly, setIsReadOnly] = useState(false);


  const [showViewClicked, setViewClicked] = useState(false);
  const [occupationDetailsToView, setOccupationDetailsToView] = useState({});

  const handleViewClose = () => {
    setViewClicked(false);
    setIsReadOnly(false);
    setshowingTemplateNameAndVersion(false);
  }
  const handleViewShow = () => setViewClicked(true);
  // useEffect(() => {
  //   if (showViewClicked) {
  //     const modalDialog = document.querySelector('.viewModel');
  //     if (modalDialog) {
  //       const top = (window.innerHeight - modalDialog.offsetHeight) / 2;
  //       modalDialog.style.top = `${top}px`;
  //     }
  //   }
  // }, [showViewClicked]);

  const handleViewClick = async (row) => {
    setShowPopup(false);

    setIsReadOnly(true);
    // console.log(row)
    setshowingTemplateNameAndVersion(true)
    // setShowCreateModal(true)
    console.log("handle view click")
    // console.log(id)
    const bearerToken = localStorage.getItem('access_token');
    // Make the GET API request
    const response = await fetch(`${BASE_URL}/crm/incomeAssessment/occupations?id=${row.id}`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );
    const data = await response.json();
    // console.log(data)

    if (response.ok) {
      console.log("good")
      // Convert the metadata object into an array of objects with key and value properties
      // const metadataArray = Object.entries(data.data[0].metadata).map(([key, value]) => ({
      //   key,
      //   value,
      // }));
      // console.log(metadataArray)
      //   setInitialValues({
      //     occupationName: data.data[0].name,
      //     category: data.data[0].category,
      //     subcategory: data.data[0].subCategory,
      //     description: data.data[0].description,
      //     riskCategory: data.data[0].riskCategory,
      //     TemplateName: data?.data?.[0]?.templateId,
      //     metadata: metadataArray
      //   })

      //   const templatesResponse = await fetch(`${BASE_URL}/crm/incomeAssessment/templates?occupationId=${id}&status=PUBLISHED`,
      //   {
      //     headers: {
      //       'Authorization': `Bearer ${bearerToken}`
      //     }
      //   }
      // );
      // const templatesData = await templatesResponse.json();
      // // console.log(templatesData)

      // if (templatesResponse.ok) {
      //   // Use the templatesData to update the state of your component
      //   // console.log(templatesData)
      //   const templatesArray = templatesData.data.map(template => ({
      //     version: template.version,
      //     id: template.id,
      //     templateName: template.templateName,
      //     formTitle: template.formTitle
      //   }));
      //   setTemplatesArray(templatesArray)
      //   // console.log(templatesArray)

      // } else {
      //   // Handle error
      // }



      //   setShowCreateModal(true)




      let templateName;
      let version;
      if (data?.data?.[0]?.templateId) {
        // Make API call to get template data using data.data[0].templateId
        const templateResponse = await fetch(
          `${BASE_URL}/crm/incomeAssessment/templates?id=${data.data[0].templateId}`,
          {
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
            },
          }
        );
        const templateData = await templateResponse.json();

        templateName = templateData?.data?.[0]?.templateName;
        version = templateData?.data?.[0]?.version;
      }



      const metadataArray = Object.entries(data.data[0].metadata).map(([key, value]) => ({
        key,
        value,
      }));


      setOccupationDetailsToView({
        occupationName: data.data[0].name,
        category: data.data[0].category,
        subcategory: data.data[0].subCategory,
        description: data.data[0].description,
        riskCategory: data.data[0].riskCategory,
        // templateName: data?.data?.[0]?.templateId,
        // TemplateName: data?.data?.[0]?.templateName,
        // version: data?.data?.[0]?.version,
        TemplateName: templateName,
        version: version,
        metadata: metadataArray
      });

      handleViewShow();

    } else {
      console.log('bad')
      setInitialValues({
        occupationName: '',
        category: '',
        subcategory: '',
        description: '',
        riskCategory: '',
        TemplateName: '',
        metadata: [{ key: '', value: '' }]
      })

    }
  };


  return (
    <div>
      {/* {console.log(isEditClicked)} */}

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
        {showSuccessMessageModal && (
          <Alert
            variant="success"
            onClose={() => setShowSuccessMessageModal(false)}
            dismissible
            className="alert-top"
          >
            {successMessageFromResponse}
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
        {showErrorMessageModal && (
          <Alert
            variant="danger"
            onClose={() => setShowErrorMessageModal(false)}
            dismissible
            className="alert-top"
          >
            {errorMessageFromResponse}
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
            {/* <DataTable columns={columns} data={data} pagination
              paginationComponent={CustomPagination}
              customStyles={CustomStylesTable}
            // className="myTable"
            // className="table-container"

            /> */}
             <div style={{ height: 'auto', }}>
                <DataTable
                  columns={columns}
                  data={data}
                  pagination
                  paginationComponent={CustomPagination}
                  customStyles={CustomStylesTable}
                  // customStyles={{
                  //   tableWrapper: {
                  //     style: {
                  //       display: 'block',
                  //       maxHeight: '300px',
                  //       overflowY: 'auto',
                  //     },
                  //   },
                  // }}
                  responsive
                  fixedHeader
                  highlightOnHover
                />
              </div>
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
              setFieldValue,
              // isEditClicked
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
                    <Form.Label>Risk Category<span>*</span></Form.Label>
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
                  <div className="d-flex mb-3">
                    {/* <Form.Group className="occupationModalGroup mb-3 me-2" style={{width: "100%"}}>
                    <Form.Label>Template Name</Form.Label>
                    <Form.Select
                      name="Template Name"
                      value={values.templateName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isReadOnly}
                    >
                      <option value="">Select a Template Name</option>
                      <option value="one">one</option>
                      <option value="two">two</option>
                      <option value="three">three</option>
                    </Form.Select>
                    {touched.riskCategory && errors.riskCategory && (
                      <div className="form-text text-danger">{errors.riskCategory}</div>
                    )}
                  </Form.Group> */}
                    {showingTemplateNameAndVersion && (
                      <Form.Group className="occupationModalGroup mb-3 me-2" style={{ width: "100%" }}>
                        <Form.Label>Template Name</Form.Label>
                        <Form.Select
                          name="TemplateName"
                          value={values.TemplateName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isReadOnly}
                        >
                          <option value="">Select a Template Name</option>
                          {templatesArray.map(template => (
                            // <option key={template.id} value={`${template.templateName} (${template.version})`}>{`${template.templateName} (${template.version})`}</option>
                            // ))}
                            // <option key={template.id} value={template.templateName ? `${template.templateName} (${template.version})` : ''}>{template.templateName ? `${template.templateName} (${template.version})` : `(${template.version})`}</option>
                            // ))}
                            <option key={template.id} value={template.id}>{template.templateName ? `${template.templateName} (${template.version})` : `(${template.version})`}</option>
                          ))}
                        </Form.Select>
                        {/* {touched.TemplateName && errors.TemplateName && (
                          <div className="form-text text-danger">{errors.riskCategory}</div>
                        )} */}
                      </Form.Group>
                    )}
                    {/* <Form.Group className="occupationModalGroup mb-3 me-2"style={{width: "100%"}}>
                    <Form.Label>Version</Form.Label>
                    <Form.Select
                      name="Version"
                      value={values.templateName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isReadOnly}
                    >
                      <option value="">Select a Version</option>
                      <option value="one">one</option>
                      <option value="two">two</option>
                      <option value="three">three</option>
                    </Form.Select>
                    {touched.riskCategory && errors.riskCategory && (
                      <div className="form-text text-danger">{errors.riskCategory}</div>
                    )}
                  </Form.Group> */}
                  </div>

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
                      {/* {isEditClicked ? "Update" : "Create"} */}
                      {isEditClicked ? ("Update") : ("Create")}
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
      <Modal show={showViewClicked} onHide={handleViewClose} className="viewModel" style={{ background: "none" }}>
        {/* <div className="viewModel"> */}
        <Modal.Header closeButton>
          <Modal.Title>Occupation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Occupation Name:</span>{" "}
              {occupationDetailsToView.occupationName}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Category:</span>{" "}
              {occupationDetailsToView.category}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Subcategory:</span>{" "}
              {occupationDetailsToView.subcategory}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
              {occupationDetailsToView.description}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Risk Category:</span>{" "}
              {occupationDetailsToView.riskCategory}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Template Name:</span>{" "}
              {occupationDetailsToView.TemplateName}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Version:</span>{" "}
              {occupationDetailsToView.version}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Metadata:</span>{" "}
              <ul>
                {occupationDetailsToView.metadata && occupationDetailsToView.metadata.map((item, index) => (
                  <li key={index}>{item.key}: {item.value}</li>
                ))}
              </ul>               </div>
            {/* Render other profile details here */}
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleViewClose}>
            Close
          </Button>
        </Modal.Footer> */}
        {/* </div> */}
      </Modal>
    </div>
  );
}



