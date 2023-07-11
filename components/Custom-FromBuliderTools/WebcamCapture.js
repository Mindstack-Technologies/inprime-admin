// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';

// const WebcamCapture = () => {
//   const webcamRef = useRef(null);
//   const [imgSrc, setImgSrc] = useState(null);

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImgSrc(imageSrc);
//   };

//   return (
//     <>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//       />
//       <button onClick={capture}>Capture photo</button>
//       {imgSrc && (
//         <img src={imgSrc} />
//       )}
//     </>
//   );
// };
// export default WebcamCapture
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [showWebcam, setShowWebcam] = useState(false);

    const capture = () => {
        console.log("capture photo")
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        setShowWebcam(false);
    };

    return (
        <>
            {showWebcam && (
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
            )}
            <button onClick={() => {
                if (showWebcam) {
                    capture();
                } else {
                    setShowWebcam(true);
                }
            }}>
                {showWebcam ? 'Capture photo' : 'Open webcam'}
            </button>
            {imgSrc && (
        <img src={imgSrc} />
      )}
            {/* {imgSrc && ( */}
            {/* <img src={imgSrc} /> */}
            {/* )} */}
        </>
    );
};
export default WebcamCapture;
