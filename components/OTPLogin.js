import React, { useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/login.module.css";
import Alert from "react-bootstrap/Alert";
import Image from "next/image";
import InprimeLogo from "../public/images/InprimeLogo.svg";
import { BASE_URL } from "../baseURL";
import { useFormik } from "formik";
import * as Yup from "yup";

const OTPScreen = (props) => {
    const phoneNumber = props.parentToChild;
    const userId = props.parentToChilduserId;

    const router = useRouter();

    //errorHandle
    const [errorAlert, errorSetAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [iscontinueLoading, setcontinueLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema: Yup.object({
            otp: Yup.string()
                .required("Required")
                .matches(/^[0-9]{6}$/, "Must be exactly 6 digits"),
        }),
        onSubmit: async (values) => {
            // Handle OTP submit logic here
            setcontinueLoading(true);

            try {
                const otpReasponse = await fetch(
                    `${BASE_URL}/auth/crm/verify/otp`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            mobileNo: phoneNumber,
                            reqId: userId,
                            otp: values.otp,
                        }),
                    }
                );
                // console.log(otpReasponse)
                const responseBody = await otpReasponse.json();

                // console.log(responseBody.data.token)
                if (otpReasponse.status == "200") {
                    window.localStorage.setItem("access_token", responseBody.data.token);
                    setcontinueLoading(false);

                    // Redirect to the home page on successful registration
                    router.push("/occupations");
                } else {
                    // Display an error message on failure
                    setErrorMessage(responseBody.errorMessage);
                    errorSetAlert(true);
                    setcontinueLoading(false);
                }
            } catch (error) {
                // Display a generic error message on exception
                alert("Something went wrong. Please try again later.");
                setcontinueLoading(false);
            }
        },
    });

    return (
        <>
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
                        <p>{errorMessage}</p>
                    </Alert>
                )}
            </div>


            <h1 className={styles.formHeadding}>Log In into your account</h1>

            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.otpCardInput}>
                        <label htmlFor="otp">
                            We've sent you an SMS with a 6-digit verification code on +91
                            <a> {phoneNumber}</a>
                        </label>
                        <br />
                        <input
                            id="otp"
                            type="text"
                            {...formik.getFieldProps("otp")}
                            placeholder="Enter your OTP"
                            onChange={(event) => {
                                // Get the value of the input
                                const value = event.target.value;
                                // Use a regular expression to remove any non-numeric characters from the value
                                const numericValue = value.replace(/[^\d]/g, "");
                                // Update the value of the input field to only contain numeric characters
                                formik.setFieldValue("otp", numericValue);
                            }}
                        />
                        {formik.touched.otp && formik.errors.otp ? (
                            <span style={{ color: "red" }}>{formik.errors.otp}</span>
                        ) : null}
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
                        <>
                            <button type="submit" className={styles.OTPButton}>
                                Verify OTP
                            </button>
                        </>
                    )}
                </form>
                <div className={styles.movetoLogin}>
                    <a href="/login">Go Back</a>
                </div>
            </div>
        </>
    );
};

export default OTPScreen;
