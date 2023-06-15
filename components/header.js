import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import { useRouter } from "next/router";
import backButton from "../public/images/BackButton.svg";
import { BASE_URL } from "../baseURL";


export default function Header() {

  const [adminUser, setAdminUser] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [adminImage, setAdminImage] = useState('');
  const router = useRouter();


  useEffect(() => {

    const bearerToken = localStorage.getItem('access_token');
    const fetchData = async () => {
      // setLoading(true);

      const response = await fetch(`${BASE_URL}/crm/profile`,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        }
      );
      const data = await response.json();
      // console.log(data)
      if (response.status === 200) {
        // console.log(`${data.data}`)
        console.log("Get is successful")
        setAdminUser(data?.data?.firstName)
        setAdminImage(data?.data?.profilePic)
        setProfileData(data);

        // setData(newData);
      }else if(response.status === 401){
        localStorage.removeItem('access_token');
        router.push('/login')

      } else {
        // Handle the error
        // alert("Something went wrong");
      }
      // setLoading(false);

    };
    fetchData();
  }, []);

  // const handleActionClick = (event) => {
  //   setShowPopover(!showPopover);
  //   target.current = event.target;
  // }



  const pathname = router.pathname;
  const handleLogout = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('formData');
    localStorage.removeItem('OccupationID')
    console.log('Logged Out');
    // window.location.reload();
    router.push('/login');
  };
  return (
    <>
      <nav className="header-nav">
        <div className="row mx-0">
          <div className="col-lg-8">
            {pathname == "/occupations" ? (
              <h4>Occupations</h4>
            ) : pathname == "/income-assessment-tempates" ? (
              <h4>Income Assessment Templates </h4>
            ) : pathname == "/income-assessment-tempate" ? (
              <>
                <div className="d-flex">
                  <Image onClick={() => { router.push('/income-assessment-tempates'); localStorage.removeItem('income-assessment-data'); localStorage.removeItem("formData") }} src={backButton} style={{ width: "15px", height: "15px", alignItems: "center", margin: "5px", marginRight: '10px', cursor: "pointer" }} alt="back button" />
                  <h4>Income Assessment Template</h4>
                </div>
              </>
            ) : pathname == "/users" ? (
              <h4>Users</h4>
            ) : pathname == "/loan-files" ? (
              <h4>Loan Files</h4>
            ) : pathname == "/" ? (
              <h4>Dashboard</h4>
            ) : (
              ""
            )}
          </div>
          <div className="col-lg-4 d-flex justify-content-end">
            <Dropdown >
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {/* <Image
                  src="/images/user_pic.png"
                  width="28"
                  height="28"
                  alt=""
                ></Image>{" "} */}
                {adminImage ? (
                  <Image src={adminImage} width="28" height="28" alt="" style={{borderRadius: "50%", marginRight: "8px"}} />
                ) : (
                  <img src="/images/profile-default.svg" width="28" height="28" alt="" style={{borderRadius: "50%", marginRight: "8px"}}/>
                )}
                {adminUser}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setShowProfile(true)}>Show profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout} >Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>
      {/* Modal to display profile details */}
      <Modal show={showProfile} onHide={() => setShowProfile(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {profileData && (
            <div style={{ padding: "20px" }}>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold" }}>First Name:</span>{" "}
                {profileData.data.firstName}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold" }}>Last Name:</span>{" "}
                {profileData.data.lastName}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                {profileData.data.email}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold" }}>Mobile No:</span>{" "}
                {profileData.data.mobileNo}
              </div>
              {/* Render other profile details here */}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
