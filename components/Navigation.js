import ListGroup from "react-bootstrap/ListGroup";
import Image from "next/image";
import { useRouter } from "next/router";
export default function Navigation() {
  const router = useRouter();
  const path = router.pathname;
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
      <div className="d-flex justify-content-center mb-5 mt-5">
        <Image src="/images/logo.png" width="79" height="70" alt=""></Image>
      </div>
      <ListGroup>
        {/* <ListGroup.Item action href="/" className={path == "/" ? "active" : ""}>
          <Image
            src="/images/icons/dashboard.svg"
            width="15"
            height="16"
            alt=""
          ></Image>
          Dashboard
        </ListGroup.Item> */}
        {/* <ListGroup.Item
          action
          href="/loan-files"
          className={path == "/loan-files" ? "active" : ""}
        >
          <Image
            src="/images/icons/loan.svg"
            width="15"
            height="16"
            alt=""
          ></Image>
          Loan Files
        </ListGroup.Item> */}
        {/* <ListGroup.Item
          action
          href="/users"
          className={path == "/users" ? "active" : ""}
        >
          <Image
            src="/images/icons/users.svg"
            alt=""
            width="15"
            height="16"
          ></Image>
          Manage Users
        </ListGroup.Item> */}
        <ListGroup.Item
          action
          href="/occupations"
          className={path == "/occupations" ? "active" : ""}
        >
          <Image
            src="/images/icons/occupation.svg"
            width="15"
            height="16"
            alt=""
          ></Image>
          Occupations
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="/income-assessment-tempates"
          className={path == "/income-assessment-tempates"|| path == "/income-assessment-tempate" ? "active" : ""}
        >
          <Image
            src="/images/icons/assessment.svg"
            alt=""
            width="15"
            height="16"
          ></Image>
          Income Assessment Templates
        </ListGroup.Item>
        {/* <ListGroup.Item
          action
          href="/formgenerator"
          className={path == "/formgenerator" ? "active" : ""}
        >
          <Image
            src="/images/icons/assessment.svg"
            alt=""
            width="15"
            height="16"
          ></Image>
          formgenerator
        </ListGroup.Item> */}
        <ListGroup.Item action href="#link2" onClick={handleLogout}>
          <Image
            src="/images/icons/logout.svg"
            alt=""
            width="15"
            height="16"
          ></Image>
          Log Out
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
