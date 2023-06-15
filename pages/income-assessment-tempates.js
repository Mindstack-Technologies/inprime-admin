import React, { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Head from "next/head";
import DataTable from "react-data-table-component";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SearchIcon from "../public/images/icons/search-icon.svg";
import OccupationAction from '../public/images/icons/OccupationAction.svg';
import Image from "next/image";
import { useRouter } from 'next/router';
import { BASE_URL } from "../baseURL";
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import Dropdown from "react-bootstrap/Dropdown";
import { Alert, Modal } from "react-bootstrap";
import CustomPagination from "../components/CustomPagination";
import CustomStylesTable from "@/components/CustomStylesTable";


function IncomeAssessmentPage() {
  const [data, setData] = useState([]);
  // const [showTemplate, setShowTemplate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [target, setTarget] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selected, setSelected] = useState('All');
  const [dropdownOccupationOptions, setDropdownOccupationOptions] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [selectedOccupationValue, setSelectedOccupationValue] = useState('All');

  const router = useRouter();


  // function SwitchComponent({ apiValue, onToggle }) {
  //   // const [checked, setChecked] = useState(apiValue);

  //   // const handleToggle = () => {
  //   //   setChecked(!checked);
  //   //   onToggle(!checked);
  //   // };

  //   return (
  //     // <label>
  //     //   <input type="checkbox" checked={checked} onChange={handleToggle} />
  //     //   {checked ? 'On' : 'Off'}
  //     // </label>
  //     <Form>
  //       <Form.Check
  //         type="switch"
  //         id="custom-switch"
  //         label={apiValue ? 'Active' : 'Not Active'}
  //         checked={apiValue}
  //         onChange={(e) => onToggle(e.target.checked)}
  //         className="purple-switch"
  //       />
  //     </Form>
  //   );
  // }

  const columns = [
    // { name: "#", selector: (row) => row.id },
    {
      name: "Template Name", selector: (row) => row.templateName,

    },
    { name: "Unique Template Name", selector: (row) => row.UniqueTemplateName, },
    { name: "Occupation", selector: (row) => row.occupation, },
    { name: "Version", selector: (row) => row.version, width: "100px" },
    {
      name: "Created On",
      selector: (row) =>
        new Date(row.createdOn).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      sortable: true,
      width: "120px",

    },
    {
      name: "Active/Deactive", selector: (row) => (
        row.ActiveDeactive
        // <div>
        //   <SwitchComponent
        //     apiValue={row.ActiveDeactive === 'Active'}
        //     onToggle={(newValue) => HandleActiveDeactiveButton(row, newValue)}
        //   />
        // </div>
      ),
      width: "150px",
    },
    {
      name: "Published", selector: (row) => row.published,
      width: "130px",
    },

    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div className="d-flex">
    //       {/* Add your action buttons here */}
    //       <Button
    //         variant=""
    //         // onClick={() => setSelectedOccupation(row)}
    //         onClick={() => {
    //           // console.log(row.occupationID);
    //           // localStorage.setItem('OccupationID', row.occupationID)
    //           // router.push('/formgenerator');
    //           router.push(`/formgenerator?occupationID=${row.occupationID}`);

    //           setSelectedOccupation(row);
    //         }}
    //         style={{ lineHeight: "0.5" }}
    //         className="occupationActionButton"
    //       >
    //         <div className=" d-flex">
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
      width: "100px",
    },
  ];

  const [showErrorModalMessage, setShowErrorModalMessage] = useState('')
  const [showErrorActiveDeactiveModal, setShowErrorActiveDeactiveModal] = useState(false)



  // Active and deactive button
  // const HandleActiveDeactiveButton = async (row, newValue) => {
  //   // console.log(newValue)
  //   const bearerToken = localStorage.getItem('access_token');
  //   // console.log("test")
  //   // console.log(row.occupationID)
  //   // console.log(row.id)
  //   // console.log(row.ActiveDeactive)
  //   const requestBody = {
  //     templateId: row.id,
  //     active: newValue
  //   };
  //   // console.log(requestBody)
  //   // console.log(JSON.stringify(requestBody))
  //   const response = await fetch(
  //     `${BASE_URL}/crm/incomeAssessment/template?occupationId=${row.occupationID}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${bearerToken}`
  //       },
  //       body: JSON.stringify(requestBody),
  //     }
  //   );
  //   // console.log(response)
  //   const data = await response.json();

  //   if (response.ok) {
  //     // The request was successful
  //     // const data = await response.json();
  //     // console.log(data)
  //     // alert("Sucessfully added ")
  //     setShowSuccessModal(true);


  //     console.log("Sucessfully added")
  //     fetchData()
  //     setTimeout(() => setShowSuccessModal(false), 10000);
  //     // console.log(data)
  //   } else {
  //     // The request failed
  //     // Handle the error
  //     // console.log(data.errorMessage)
  //     setShowErrorModalMessage(data.errorMessage)

  //     setShowErrorActiveDeactiveModal(true);
  //     setTimeout(() => setShowErrorActiveDeactiveModal(false), 10000);


  //     // useEffect( () => {
  //     //   // const bearerToken = localStorage.getItem('access_token');
  //     //   const testresponse =  fetch(`${BASE_URL}/crm/incomeAssessment/templates?occupationId=${occupationID}`,
  //     //     {
  //     //       headers: {
  //     //         'Authorization': `Bearer ${bearerToken}`
  //     //       }
  //     //     }
  //     //   )
  //     //   const data =  testresponse.json();
  //     //   console.log(data)

  //     // })
  //     // alert("Something went wrong ")
  //   }
  // }


  // Update the Popover component to use the custom styles
  function Popup({ row, onClose,
    handleDublicateClick
  }) {


    const handleEditClick = async () => {
      const bearerToken = localStorage.getItem('access_token');

      // Make the GET API request
      const response = await fetch(`${BASE_URL}/crm/incomeAssessment/templates?id=${row.id}`,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        }
      );
      const data = await response.json();
      // console.log(data)
      // Do something with the data
      // console.log(data.data[0]);
      router.push(`/income-assessment-tempate?occupationID=${row.occupationID}&mode=edit`);
      localStorage.setItem("income-assessment-data", JSON.stringify(data?.data?.[0]))
      // console.log(JSON.stringify(data))
    };

    const handleDuplicateClick = async () => {
      const bearerToken = localStorage.getItem('access_token');

      // Make the GET API request
      const response = await fetch(`${BASE_URL}/crm/incomeAssessment/templates?id=${row.id}`,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        }
      );
      const data = await response.json();
      // console.log(data)
      // Do something with the data
      // console.log(data.data[0]);
      router.push(`/income-assessment-tempate?occupationID=${row.occupationID}&mode=duplicate`);
      localStorage.setItem("income-assessment-data", JSON.stringify(data?.data?.[0]))
      // console.log(JSON.stringify(data))
    };



    const router = useRouter();
    const handleViewClick = () => {
      router.push(`/formgenerator?occupationID=${row.id}`);
    };

    return (

      <Overlay target={target} show={true} placement="bottom" rootClose={true} onHide={onClose}>
        {(props) => (
          <Popover id="popover-contained" {...props}>
            {/* <Popover.Header as="h3">Pop-up</Popover.Header> */}
            <Popover.Body className="p-0">
              {/* Add your pop-up content here */}
              {/* <p>Selected row: {JSON.stringify(row)}</p> */}
              {/* <Button variant="primary" onClick={handleViewClick}>
              view*/}

              <p onClick={handleViewClick}>
                View
              </p>
              {/* <p onClick={handleEditClick}>
                Edit
              </p> */}
              {row.published === "DRAFT" && (
                <p onClick={handleEditClick}>
                  Edit
                </p>
              )}
              <p
                onClick={handleDuplicateClick}
              // onClick={handleDublicateClick}
              // onClick={(() => handleDublicateClick(row))}
              >
                Duplicate
              </p>
            </Popover.Body>
          </Popover>
        )}
      </Overlay>
    );
  }

  // Gettings all the templates 

  useEffect(() => {
    fetchData();
  }, [selected, selectedOccupation]);


  // useEffect ( async ()=>{
  //   const bearerToken = localStorage.getItem('access_token');
  //   response = await fetch (`${BASE_URL}/crm/incomeAssessment/templates?occupationId=${occupationID}`,
  //   {
  //     headers: {
  //       'Authorization': `Bearer ${bearerToken}`
  //     }
  //   }
  // )
  // const data =await response.json();
  // console.log(data)

  // })


  const fetchData = async () => {
    const bearerToken = localStorage.getItem('access_token');

    setLoading(true);
    let apiUrl = `${BASE_URL}/crm/incomeAssessment/templates`;
    if (selected === 'Drafts') {
      apiUrl += '?status=DRAFT';
    } else if (selected === 'Published') {
      apiUrl += '?status=PUBLISHED';
    }

    if (selectedOccupation) {
      apiUrl += `${apiUrl.includes('?') ? '&' : '?'}occupationId=${selectedOccupation}`;
    }

    console.log(apiUrl)
    // const response = await fetch(`${BASE_URL}/crm/incomeAssessment/templates`,
    const response = await fetch(apiUrl,

      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );
    const data = await response.json();
    // console.log(data)
    if (response.status === 200) {
      // console.log(data.data)
      // const newData = data.data.map((item) => ({
      //   id: item.id,
      //   templateName: item.formTitle,
      //   version: item.version,
      //   occupation: item.formName,
      //   createdOn: new Date(item.createdAt),
      //   occupationID: item.occupationId
      //   // templateName: item.json.formTitle,
      //   // version: item.json.version,
      //   // occupation: item.json.formName,
      //   // createdOn: new Date(item.createdAt),
      // }));
      //  console.log(newData)
      const newDataPromises = data.data.map(async (item) => {
        // Make API call to get occupation data using item.occupationId
        const occupationResponse = await fetch(`${BASE_URL}/crm/incomeAssessment/occupations?id=${item.occupationId}`, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        });
        // console.log(occupationResponse)
        const occupationData = await occupationResponse.json();
        const occupationName = occupationData?.data?.[0]?.name;
        return {
          id: item.id,
          templateName: item.formTitle,
          version: item.version,
          occupation: occupationName,
          ActiveDeactive: item.active ? "Active" : "Not Active",
          createdOn: new Date(item.createdAt),
          published: item.status,
          occupationID: item.occupationId,
          json: item.json,
          formName: item.formName,
          formDescription: item.formDescription,
          UniqueTemplateName: item.templateName
        };
      });
      console.log("Get is successful")
      const newData = await Promise.all(newDataPromises);
      // console.log(newData)
      setData(newData);
    } else {
      // Handle the error
      alert("Something went wrong");
    }
    setLoading(false);

  };

  // const handleActionClick = (event) => {
  //   setShowPopover(!showPopover);
  //   target.current = event.target;
  // }


  // const handleEdit = (row) => {
  //   // Send GET request with row data as parameter
  //   fetch(`/your-endpoint-here?data=${row.data}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       // Handle response data here
  //     });
  // }
  {/* <Overlay
  show={showPopover}
  target={target.current}
  placement="bottom"
  containerPadding={20}
>
  <Popover id="popover-contained">
    <Popover.Content>
      <Button onClick={() => handleEdit(row)}>Edit</Button>
    </Popover.Content>
  </Popover>
</Overlay> */}
  const HandleClick = () => {
    router.push('/income-assessment-tempate');

  }
  const handlePoPupDublicateClick = async (row) => {
    const bearerToken = localStorage.getItem('access_token');

    console.log(row.UniqueTemplateName + " copy")
    // const dubllicateBody = {
    //   formTitle: row.templateName,
    //   formDescription: row.formDescription,
    //   formName: row.formName,
    //   task_data: row.json
    // }
    // console.log(dubllicateBody)
    const response = await fetch(
      `${BASE_URL}/crm/incomeAssessment/template?occupationId=${row.occupationID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${bearerToken}`
        },
        body: JSON.stringify({
          templateName: row.UniqueTemplateName + " copy",
          formTitle: row.templateName,
          formDescription: row.formDescription,
          formName: row.formName,
          task_data: row.json
        }),
      }
    );
    // console.log(response)
    const data = await response.json();
    // console.log(data)
    if (response.ok) {
      // The request was successful
      // const data = await response.json();
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
      // console.log(data.errorMessage)
      setShowErrorModalMessage(data.errorMessage)

      setShowErrorActiveDeactiveModal(true);
      setTimeout(() => setShowErrorActiveDeactiveModal(false), 10000);
      // alert("Something went wrong ")
    }

  }



  // getitng occupation for dropdown 
  // const [dropdownOccupationOptions, setDropdownOccupationOptions] = useState([]);
  // const [selectedOccupation, setSelectedOccupation]= useState('All');

  useEffect(() => {
    const bearerToken = localStorage.getItem('access_token');
    const fetchOccupationData = async () => {
      const response = await fetch(
        `${BASE_URL}/crm/incomeAssessment/occupations`,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        }
      );
      const occuaptionData = await response.json();
      console.log(occuaptionData)
      setDropdownOccupationOptions(occuaptionData.data);
      console.log('Get is successful')
    };

    fetchOccupationData();
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
        {/* {showPopup && <Popup row={selectedRow} onClose={() => setShowPopup(false)} />} */}
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
        {showErrorActiveDeactiveModal && (
          <Alert
            variant="danger"
            onClose={() => setShowErrorActiveDeactiveModal(false)}
            dismissible
            className="alert-top"
          >
            {showErrorModalMessage}
          </Alert>
        )}
        <div>
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div>
              <div className="row toolbar">
                <div className="col-lg-4">
                  <InputGroup className="mb-3 ms-3">
                    <InputGroup.Text id="basic-addon1">
                      <Image src={SearchIcon} width="18" height="18" alt=""></Image>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search"
                      aria-label="search"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-2">
                </div>
                <div className="col-lg-2 d-flex justify-content-end dorpdown-category-name">
                  <p className="m-0">Based on Occupation</p>
                  <Dropdown className="dorpdown-category">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="dorpdown-category-selection">
                      {selectedOccupationValue}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-category-menu">
                      <Dropdown.Item onClick={() => { setSelectedOccupation(null); setSelectedOccupationValue('All') }}>All</Dropdown.Item>
                      {dropdownOccupationOptions.map(option => (
                        <Dropdown.Item key={option.id} onClick={() => { setSelectedOccupation(option.id); setSelectedOccupationValue(option.name) }}>
                          {option.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="col-lg-2 d-flex justify-content-end dorpdown-category-name">
                  <p className="m-0">Based on Status</p>
                  <Dropdown className="dorpdown-category">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="dorpdown-category-selection">
                      {selected}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-category-menu">
                      <Dropdown.Item onClick={() => setSelected('All')}>All</Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelected('Drafts')}>Drafts</Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelected('Published')}>Published</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="col-lg-2 d-flex justify-content-end">
                  <Button variant="primary me-4" onClick={HandleClick}>
                    + Create New
                  </Button>
                </div>
              </div>
              {showPopup && <Popup row={selectedRow} onClose={() => setShowPopup(false)}
                handleDublicateClick={handlePoPupDublicateClick}
              />
              }
              <DataTable columns={columns} data={data} pagination
                paginationComponent={CustomPagination}
                customStyles={CustomStylesTable}



              />
              {/* {domLoaded ? (
            <DataTable columns={columns} data={data} pagination />
          ) : (
            ""
          )} */}
            </div>
          )}

        </div>
        {/* <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Action</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Button onClick={() => handleEdit(row)}>Edit</Button>
  </Modal.Body>
</Modal> */}

      </AdminLayout>
    </div>
  );
}

export default IncomeAssessmentPage;
