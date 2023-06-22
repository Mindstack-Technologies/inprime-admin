import React, { useState } from 'react';
import { updateElement } from 'react-form-builder2';

// const GeoTagging = (props) => {
//   const [location, setLocation] = useState(null);

//   const handleGetLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ latitude, longitude });
//         },
//         (error) => {
//           console.error(error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   };
const GeoTagging =  React.forwardRef((props, ref) => {
  const { data, defaultValue } = props;
  const [location, setLocation] = useState(null);
  const logitudeLatitude = []
console.log(props)
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          // handleChange({
          //   ...formData,
          //   [data.field_name]: { latitude, longitude },
          // });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
console.log(defaultValue)
  return (
    <div>
      {/* <input ref={ref} disabled = "false" type="checkbox" value/> */}
     {JSON.parse(defaultValue["Latitude"])}
    
     {/* Latitude: {JSON.parse(defaultValue?.latitude)}<br/> 
       Longitude: {JSON.parse(defaultValue?.longitude)} */}
      <button onClick={handleGetLocation}>Get Location</button>
            <input ref={ref} disabled = "true" type="" defaultValue={`${defaultValue}`} value={`{"Latitude": ${location?.latitude}, "Logitude": ${location?.longitude}}`}/>
            {/* <input ref={ref} disabled = "false" type="" defaultValue={defaultValue} value={location?.longitude}/> */}
      
      {/* <label for="sampleCheckbox">Sample Checkbox:</label>
<input ref={ref}type="checkbox" id="sampleCheckbox" name="sampleCheckbox" value={location?.latitude || ""}/>
<label for="sampleCheckbox">Sample Checkbox:</label>
<input ref={ref} type="checkbox" id="sampleCheckbox" name="sampleCheckbox" value={location?.latitude || ""}/> */}
      {location && (
        <div>
          {/* Latitude: {location.latitude} */}
          {/* <input ref={ref} disabled = "true" type="checkbox" value={[location.latitude, location.longitude]}/> */}
          <br />
          {/* Longitude: {location.longitude} */}
          {/* <input ref={ref} type="hidden" value={location.longitude}/> */}

        </div>
      )}
      {/* <p>hello</p> */}
    </div>
  );
});

export default GeoTagging;
// const GeoTagging = () => {
   
  
//     return (
//       <div>
//         {/* <button onClick={handleGetLocation}>Get Location</button>
//         {location && (
//           <div>
//             Latitude: {location.latitude}
//             <br />
//             Longitude: {location.longitude}
//           </div>
//         )} */}
//         <p>hello</p>
//       </div>
//     );
//   };
  
  // export default GeoTagging;
  