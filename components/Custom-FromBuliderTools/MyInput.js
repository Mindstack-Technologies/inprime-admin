import React from "react";


const MyInput = ((props) => {
    const { name, defaultValue, disabled } = props;
    console.log(props)
    return (
      <input name={name} defaultValue={defaultValue} disabled={disabled} />

    );
  });

  export default MyInput;