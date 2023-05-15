import Dropdown from "react-bootstrap/Dropdown";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <nav>
        <div className="row mx-0">
          <div className="col-lg-8">
            <h4>Income Assessment Templates</h4>
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
