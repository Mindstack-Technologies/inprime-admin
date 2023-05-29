// import React, { useState, useEffect } from "react";
// import { useRouter } from 'next/router';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from "../styles/login.module.css";
// import Alert from 'react-bootstrap/Alert';
// import Image from "next/image";
// import InprimeLogo from '../public/images/InprimeLogo.svg'
// import { BASE_URL } from "../baseURL";


// const OTPScreen = (props) => {
//     const phoneNumber = props.parentToChild;
//     const userId = props.parentToChilduserId;
//     // console.log(phoneNumber);
//     // console.log(userId);
//     //errorHandle
//     const [errorAlert, errorSetAlert] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");

//     // OTP form
//     // const [timer, setTimer] = useState(30);
//     // const [isTimerActive, setIsTimerActive] = useState(true);
//     // const [otpHasBeenSent, setotpHasBeenSent] = useState(true);

//     const [otp, setOtp] = useState("");
//     const [error, setError] = useState("");


//     // const [isLoading, setIsLoading] = useState(false);

//     const [iscontinueLoading, setcontinueLoading] = useState(false);


//     // console.log(props.telphoneNumber);

//     // setIsTimerActive(false);
//     // Handle timer countdown
//     // useEffect(() => {
//     //     let interval;
//     //     if (isTimerActive && timer > 0) {
//     //         interval = setInterval(() => {
//     //             setTimer((prev) => prev - 1);
//     //         }, 1000);
//     //     } else if (timer === 0) {
//     //         setIsTimerActive(false);
//     //         setotpHasBeenSent(true);
//     //     }
//     //     return () => clearInterval(interval);
//     // }, [isTimerActive, timer]);


//     // TODO: Handle OTP resend logic

//     const handleOTPChange = (e) => {
//         // Only allow numbers as input
//         const re = /^[0-9\b]+$/;
//         if (e.target.value === "" || re.test(e.target.value)) {
//             setOtp(e.target.value);
//         }
//     };



//     // Redirect to the home page on successful registration or login

//     const router = useRouter();

//     const handleOTPSubmit = async (e) => {
//         e.preventDefault();

//         // Check if the input is 4 digits long
//         if (otp.length !== 4) {
//             setError("Please enter a valid 4-digit OTP");
//             return;
//         }
//         // Clear the error message
//         setError("");
//         setcontinueLoading(true);


//         // Call the login function with the otp as credential
//         try {
//             // console.log(phoneNumber)
//             // console.log(otp)
//             // console.log(userId)

//             const otpReasponse = await fetch(`${BASE_URL}/api/dsa/auth/verify-otp`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     mobileNumber: phoneNumber,
//                     otp: otp,
//                     requestId: userId
//                 }),
//             });
//             console.log(otpReasponse)
//             const responseBody = await otpReasponse.text();
//             console.log(responseBody);
//             //   const data = await otpReasponse.json();
//             //        console.log(data)    

//             // Set the result state
//             if (otpReasponse.status == "200") {
//                 console.log("login done");
//                 // console.log(otpResult)

//                 // Store token in local storage
//                 // console.log(otpResult.access_token);

//                 window.localStorage.setItem('access_token', responseBody);
//                 // window.localStorage.setItem('id', otpResult.id);

//                 setcontinueLoading(false);

//                 // Redirect to the home page on successful registration
//                 router.push('/');

//             } else {

//                 // Display an error message on failure
//                 setErrorMessage(otpReasponse.error);
//                 errorSetAlert(true);
//                 setcontinueLoading(false);

//             }
//         } catch (error) {

//             // Display a generic error message on exception
//             alert('Something went wrong. Please try again later.');
//             setcontinueLoading(false);

//         }

//     // }
// };

// return (
//     <>
//         <div className='d-flex align-items-center justify-content-center'><Image src={InprimeLogo} /></div>

//         <div style={{ height: '40px', paddingTop: '4px', paddingBottom: '4px', margin: '0' }}>
//             {errorAlert && (
//                 <Alert variant="danger" onClose={() => errorSetAlert(false)} dismissible>
//                     <Alert.Heading>{errorMessage}</Alert.Heading>
//                     <p>Please recheck the the OTP</p>
//                 </Alert>
//             )}
//         </div>

//         <h1>Log In into your account</h1>
//         {/* <h6>We've sent you an SMS with a 6-digit verification code on +91
//                 <a>
//                     {phoneNumber}
//                     {/* {props.parentToChild} */}
//         {/* </a> */}
//         {/* // </h6> */}

//         <div>




//             <form onSubmit={handleOTPSubmit}>
//                 <div className={styles.otpCardInput}>
//                     <label htmlFor="otp">We've sent you an SMS with a 6-digit verification code on +91
//                         <a>
//                             {phoneNumber}
//                         </a></label>
//                     <br />

//                     <input id="otp" type="text" value={otp} maxLength="4" placeholder="Enter OTP" onChange={handleOTPChange} onClick={() => errorSetAlert(false)} />
//                     {error && <span style={{ color: "red" }}>{error}</span>}
//                 </div>
//                 <div className={styles.resendOTP}>
//                     {/* {otpHasBeenSent ? (<></>) : (<><p className={styles.otpWillRecivie}>OTP has been sent you will recivie shortly</p></>)}
//                         {isTimerActive ? (
//                             <div>

//                                 <p className={styles.resendOTPTimer}>Resend OTP in {timer} seconds</p>
//                             </div>

//                         ) : (
//                             <div className={styles.resendOTPRequest}>
//                                 <p>Didn't receive OTP? <a
//                                     onClick={handleResend}
//                                 >Resend OTP</a></p>
//                             </div>
//                         )} */}
//                 </div>
//                 {iscontinueLoading ? (
//                     <div className={styles.animationEffect}>
//                         <div className={styles.animationContainer}>
//                             <div className={styles.dotEffect}></div>
//                             <div className={styles.dotEffect}></div>
//                             <div className={styles.dotEffect}></div>
//                         </div>
//                     </div>
//                 ) : (
//                     <>
//                         <button type="submit"
//                             className={styles.continueButton}>
//                             Verify OTP
//                         </button>
//                     </>
//                 )}
//             </form>
//             <div className={styles.movetoLogin}>
//                 <a href='/login'>Go Back</a>
//             </div>

//         </div>
//     </>

// )
// }

// export default OTPScreen;


import React, { useState } from "react";
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/login.module.css";
import Alert from 'react-bootstrap/Alert';
import Image from "next/image";
import InprimeLogo from '../public/images/InprimeLogo.svg'
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
                .matches(/^[0-9]{4}$/, "Must be exactly 4 digits"),
        }),
        onSubmit: async (values) => {
            // Handle OTP submit logic here
            setcontinueLoading(true);

            try {
                console.log(values.otp)
                const otpReasponse = await fetch(`${BASE_URL}/api/dsa/auth/verify-otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mobileNumber: phoneNumber,
                        otp: values.otp,
                        requestId: userId
                    }),
                });
                // console.log(otpReasponse)
                const responseBody = await otpReasponse.text();
                // console.log(responseBody)
                if (otpReasponse.status == "200") {
                    window.localStorage.setItem('access_token', responseBody);
                    setcontinueLoading(false);

                    // Redirect to the home page on successful registration
                    router.push('/');
                } else {
                    // Display an error message on failure
                    setErrorMessage(otpReasponse.error);
                    errorSetAlert(true);
                    setcontinueLoading(false);
                }
            } catch (error) {
                // Display a generic error message on exception
                alert('Something went wrong. Please try again later.');
                setcontinueLoading(false);
            }
        },
    });

    return (
        <>
            <div className='d-flex align-items-center justify-content-center'>
                <Image src={InprimeLogo} alt="login Logo"/>
                </div>

            <div style={{ height: '40px', paddingTop: '4px', paddingBottom: '4px', margin: '0' }}>
                {errorAlert && (
                    <Alert variant="danger" onClose={() => errorSetAlert(false)} dismissible>
                        <Alert.Heading>{errorMessage}</Alert.Heading>
                        <p>Please recheck the the OTP</p>
                    </Alert>
                )}
            </div>

            <h1 className={styles.formHeadding}>Log In into your account</h1>

            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.otpCardInput}>
                        <label htmlFor="otp">We've sent you an SMS with a 6-digit verification code on +91
                            <a>&nbsp;
                                {phoneNumber}
                            </a></label>
                        <br />
                        <input id="otp" type="text" {...formik.getFieldProps("otp")} placeholder="Enter your OTP"/>
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
                            <button type="submit"
                                className={styles.OTPButton}>
                                Verify OTP
                            </button>
                        </>
                    )}
                </form>
                <div className={styles.movetoLogin}>
                    <a href='/login'>Go Back</a>
                </div>

            </div>
        </>
    )
}

export default OTPScreen;
