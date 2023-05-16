import Dropdown from "react-bootstrap/Dropdown";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      <nav className="header-nav">
        <div className="row mx-0">
          <div className="col-lg-8">
            {pathname == "/occupations" ? (
              <h4>Occupations</h4>
            ) : pathname == "/income-assessment-tempate" ? (
              <h4>Income Assessment Templates</h4>
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
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <Image
                  src="/images/user_pic.png"
                  width="28"
                  height="28"
                  alt=""
                ></Image>{" "}
                Admin User
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </>
  );
}
