import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/login.module.css";
import Alert from "react-bootstrap/Alert";
import OTPScreen from "../components/OTPLogin";
import Image from "next/image";
import InprimeLogo from "../public/images/InprimeLogo.svg";
import { BASE_URL } from "../baseURL";

// Defining the validation schema for the create account form fields
const validationSchema = Yup.object().shape({
    mobileNumber: Yup.string()
        .matches(/^[0-9]+$/, "Mobile Number must be a number")
        .length(10, "Mobile Number must be 10 digits")
        .required("Mobile Number is required"),
});

// Initial values for the form fields
const initialValues = {
    mobileNumber: "",
};

// Create an account form
const loginForm = () => {
    const [status, setStatus] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userId, setUserId] = useState("");

    //Error handler
    const [errorAlert, errorSetAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    //Submit button loading
    const [iscontinueLoading, setcontinueLoading] = useState(false);

    const handleSubmit = async (values, { setSubmitting }) => {
        //Saving the phone number entered
        setPhoneNumber(values.mobileNumber);
        // console.log(values.mobileNumber);
        // console.log(phoneNumber)
        setcontinueLoading(true);

        try {
            // const response = await fetch(`${BASE_URL}/api/dsa/auth/send-otp`, {
            const response = await fetch(
                `${BASE_URL}/auth/crm/request/otp?mobileNo=${values.mobileNumber}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // body: JSON.stringify(values),
                }
            );
            // console.log(response)
            const data = await response.json();

            if (response.status == "200") {
                // console.log(data);
                // console.log(data.status);
                //saving user id
                setUserId(data.data.reqId);
                // console.log(data.data.reqId);
                setcontinueLoading(false);
                setStatus(true);
            } else {
                // console.log(data);
                console.log(data.status);
                console.log("Something went wrong");
                // Display an error message on failure
                setErrorMessage(data.error);
                errorSetAlert(true);
                setcontinueLoading(false);
            }
        } catch (error) {
            // Display a generic error message on exception
            alert("Something went wrong. Please try again later.");
            setcontinueLoading(false);
        }

        // Set the submitting state to false
        setcontinueLoading(false);
        setSubmitting(false);
    };

    const Input = ({ name }) => {
        const { setFieldValue } = useFormikContext();

        return (
            <Field
                as="input"
                id={name}
                name={name}
                type="tel"
                placeholder="Enter moblie number"
                onClick={() => errorSetAlert(false)}
                onChange={(event) => {
                    // Get the value of the input
                    const value = event.target.value;
                    // Use a regular expression to remove any non-numeric characters from the value
                    const numericValue = value.replace(/[^\d]/g, "");
                    // Update the value of the input field to only contain numeric characters
                    setFieldValue(name, numericValue);
                }}
            />
        );
    };

    return (
        <div>
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <div className={styles.formBackground}>
                    {status ? (
                        <>
                            <OTPScreen parentToChild={phoneNumber} parentToChilduserId={userId} />
                        </>
                    ) : (
                        <div className="">
                            <div className="d-flex align-items-center justify-content-center">
                                <Image src={InprimeLogo} alt="login Logo" />
                            </div>
                            <div
                                style={{
                                    height: errorAlert ? "auto" : "40px",
                                    paddingTop: "4px",
                                    paddingBottom: "4px",
                                    margin: "0",
                                }}
                            >
                                {errorAlert && (
                                    <Alert
                                        style={{ marginTop: "4px", marginBottom: "4px" }}
                                        variant="danger"
                                        onClose={() => errorSetAlert(false)}
                                        dismissible
                                    >
                                        <p>There is no Account on +91 {phoneNumber} this number.</p>
                                    </Alert>
                                )}
                            </div>
                            <h1 className={styles.formHeadding}>Log In into your account</h1>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form className={styles.form}>
                                        <div className="mb-3">
                                            <div className={styles.formControl}>
                                                <label htmlFor="mobile">Mobile Number</label>
                                                <br />
                                                <Input name="mobileNumber" />
                                                <ErrorMessage name="mobileNumber">
                                                    {(msg) => (
                                                        <div className="form-text text-danger">{msg}</div>
                                                    )}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        {iscontinueLoading ? (
                                            <div className={styles.animationEffect}>
                                                <div className={styles.animationContainer}>
                                                    <div className={styles.dotEffect}></div>
                                                    <div className={styles.dotEffect}></div>
                                                    <div className={styles.dotEffect}></div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className={styles.continueButton}
                                                >
                                                    Get OTP
                                                </button>
                                            </div>
                                        )}
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}
                </div>
            </div>
            <p className={styles.footerCopyright}>
                Copyright © 2023. All Rights Reserved.
            </p>
        </div>
    );
};

export default loginForm;
