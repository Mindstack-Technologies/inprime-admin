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


export default function Occupations() {
  const [domLoaded, setDomLoaded] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [metadata, setMetadata] = useState([{ key: "", value: "" }]);
  const [data, setData] = useState([]);
  const [occupationName, setOccupationName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [riskCategory, setRiskCategory] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);


  // Define the categories and subcategories arrays
  const categories = ["Agriculture", "Animal Husbandary and Animal Products", "Fishing and Meat/Poultry", "Business/Small Enterprise", "Individual Self-employed(Service)"];
  const subcategories = ["Self-employed", "Skilled Labour", "Manufacturing", "Independant Professionals", "Agents", "Other", ];
  // useEffect(() => {
  //   const bearerToken = localStorage.getItem('access_token');
  //   // Use bearerToken here
  // }, []);      // const OccupationID = localStorage.getItem('OccupationID');


  const columns = [
    { name: "#", selector: (row) => row.id },
    { name: "Occupation", selector: (row) => row.occupationName },
    { name: "Category", selector: (row) => row.category },
    { name: "Subcategory", selector: (row) => row.subcategory },
    {
      name: "Created On",
      selector: (row) =>
        new Date(row.createdOn).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <Button variant="" onClick={() => setSelectedOccupation(row)} style={{ lineHeight: "0.5" }} className="occupationActionButton"
          >
            <div className=" d-flex">
              <Image src={OccupationAction} alt="" />
            </div>
          </Button>
        </div>
      ),
      style: {
        textAlign: "right",
      },
    },
  ];

  const handleOpenCreateModal = () => setShowCreateModal(true);

  const handleCloseCreateModal = () => {
    // Clear the input fields
    setOccupationName("");
    setCategory("");
    setSubcategory("");
    setDescription("");
    setMetadata([{ key: "", value: "" }]);

    // Close the modal
    setShowCreateModal(false);
  };

  const handleAddMetadata = () => {
    setMetadata([...metadata, { key: "", value: "" }]);
  };

  const handleRemoveMetadata = (index) => {
    setMetadata(metadata.filter((_, i) => i !== index));
  };

  const handleMetadataChange = (index, keyOrValue, event) => {
    const newMetadata = [...metadata];
    newMetadata[index][keyOrValue] = event.target.value;
    setMetadata(newMetadata);
  };

  // Get reqest 
  const fetchData = async () => {
    const bearerToken = localStorage.getItem('access_token');
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
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = async () => {
    // Here you can add code to submit the form data to your backend or API
    const bearerToken = localStorage.getItem('access_token');

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
    handleCloseCreateModal();
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div>
      <Head>
        <title>Occupations</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
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

        {domLoaded ? (
          <>
            <DataTable columns={columns} data={data} pagination />

            {/* {selectedOccupation && (
              <div>
                <h3>{selectedOccupation.title}</h3>
                <p>{selectedOccupation.description}</p>

                <h4>Metadata</h4>
                <ul>
                  {selectedOccupation.metadata.map((data, index) => (
                    <li key={index}>
                      {data.key}: {data.value}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </>
        ) : (
          ""
        )}
      </AdminLayout>
      {/* Success modal */}
      {/* <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Body className="text-center fs-5 p-0 text-success font-weight-bold">Successfully added</Modal.Body>
      </Modal> */}

      {/* Error modal */}
      {/* <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Body className="text-center fs-5 p-0 text-danger font-weight-bold">Something went wrong</Modal.Body>
      </Modal>  */}
      {/* Success alert */}

      <Modal show={showCreateModal} onHide={handleCloseCreateModal} className="modal-lg" >
        <Modal.Header closeButton className="occupationModalHeader">
          <Modal.Title>Create New Occupation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="occupationModalGroup mb-3">
              <Form.Label>Occupation Name<span>*</span></Form.Label>
              <Form.Control
                type="text"
                value={occupationName}
                placeholder="Enter occupation name"
                onChange={(event) => setOccupationName(event.target.value)}
              />
            </Form.Group>

            {/* Change the category field to a dropdown */}
            <Form.Group className="occupationModalGroup mb-3">
              <Form.Label>Category<span>*</span></Form.Label>
              <Form.Select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {/* Add a default option */}
                <option value="">Select a category</option>

                {/* Map over the categories array to create option elements */}
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Change the subcategory field to a dropdown */}
            <Form.Group className="occupationModalGroup mb-3">
              <Form.Label>Subcategory<span>*</span></Form.Label>
              <Form.Select
                value={subcategory}
                onChange={(event) => setSubcategory(event.target.value)}
              >
                {/* Add a default option */}
                <option value="">Select a subcategory</option>

                {/* Map over the subcategories array to create option elements */}
                {subcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Keep the description field as a textarea */}
            <Form.Group className="occupationModalGroupDescription mb-3">
              <Form.Label>Description<span>*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                placeholder="Enter description "
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="occupationModalGroup mb-3">
              <Form.Label>Risk Category</Form.Label>
              <Form.Select
                value={riskCategory}
                onChange={(event) => setRiskCategory(event.target.value)}
              >
                <option value="">Select a risk category</option>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </Form.Select>
            </Form.Group>
            {/* Keep the metadata fields as text inputs */}

            {metadata.map((data, index) => (
              <Form.Group className="occupationModalGroup mb-3">
                <Form.Label>Metadata</Form.Label>
                <div key={index} className="d-flex mb-3">
                  <Form.Control
                    className="me-2"
                    type="text"
                    placeholder="Enter key"
                    value={data.key}
                    onChange={(event) =>
                      handleMetadataChange(index, "key", event)
                    }
                  />

                  <Form.Control
                    type="text"
                    placeholder="Enter Value"
                    value={data.value}
                    onChange={(event) =>
                      handleMetadataChange(index, "value", event)
                    }
                  />

                  {metadata.length > 1 && (
                    <Button
                      variant="ms-2"
                      className="occupationMetadataRemoveButton"
                      onClick={() => handleRemoveMetadata(index)}
                    >
                      {/* - */}
                      <Image src={DeleteMetadata} />
                    </Button>
                  )}
                </div>
              </Form.Group>

            ))}

            {/* Keep the add metadata button */}
            <p onClick={handleAddMetadata} className="addOccupationMetadata">
              + Add Metadata
            </p>
          </Form>
        </Modal.Body>

        {/* Keep the modal footer */}
        <Modal.Footer className="occupationFooter">
          <Button variant="secondary" onClick={handleCloseCreateModal} className="occupatoionFooterCancelButton">
            Cancel
          </Button>

          {/* Keep the create button */}
          <Button variant="primary" onClick={handleFormSubmit} className="occupatoionFooterSubmitButton">
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}