import React, { useState, useEffect, useRef } from "react";
import { updateElement } from "react-form-builder2";



const GeoTagging = React.forwardRef((props, ref) => {




  // const Map = ({ center, zoom }) => {
  //   const mapRef = useRef();
  
  //   useEffect(() => {
  //     const map = new window.google.maps.Map(mapRef.current, {
  //       center,
  //       zoom,
  //     });
  //   }, [center, zoom]);
  
  //   return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
  // };






  const { data, defaultValue } = props;
  const [location, setLocation] = useState(null);
  const logitudeLatitude = [];
  // console.log(props);
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
      console.error("Geolocation is not supported by this browser.");
    }
  };
  // console.log(defaultValue)
  var json_string = JSON.stringify({
    latitude: location?.latitude,
    longitude: location?.longitude,
  }) ;
var json_parse
  if (defaultValue && typeof defaultValue === 'string') {
    json_parse = JSON.parse(defaultValue);
    // console.log(json_parse)
    // console.log(JSON.parse(json_string))
    // console.log(json_string)
    // console.log(defaultValue)
    json_string = defaultValue
    // console.log(defaul)
    // json_string = 
    // json_parse = JSON.parse(json_string)
  } else {
    json_parse = JSON.parse(json_string)
    // console.log(json_string)
    //  console.log('json phrase is empty')
    //  console.log( json_parse)
     
    // handle invalid defaultValue
  }
 
  return (
    <div>
      {/* <input ref={ref} disabled = "false" type="checkbox" value/> */}
      <button onClick={handleGetLocation}>Get Location</button>
      <input
        ref={ref}
        disabled="true"
        // type=""
        type="hidden"
        defaultValue={`${defaultValue}`}
        // value
        value={json_string}
      />
      <br />
      <br />
      Latitude: {json_parse?.latitude}
      <br />
      Longitude: {json_parse?.longitude}
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


      <div>
      {/* <Map center={{ lat: 37.7749, lng: -122.4194 }} zoom={8} /> */}
    </div>
    </div>
  );
});

export default GeoTagging;
