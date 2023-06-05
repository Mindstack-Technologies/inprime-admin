// import React from 'react';
// import { ReactFormGenerator } from 'react-form-builder2';

// const jsonFormData = '{"task_data":[{"id":"DE137C62-1491-418C-8308-C7162E6CE315","element":"TextInput","text":"Text Input","required":false,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"text_input_F05F7E65-F7AD-4A4F-8FE3-58FFFA23F262","label":"Placeholder label"}]}' // your JSON form data here
// const formData = JSON.parse(jsonFormData);

// function MyForm() {
//   return (
//     <ReactFormGenerator
//       form_action="/path/to/form/submit"
//       form_method="POST"
//       data={formData.task_data}
//     />
//   );
// }
// export default MyForm;

// import React from 'react';
// import { ReactFormGenerator } from 'react-form-builder2';
// import "react-form-builder2/dist/app.css";

// const jsonFormData = '{"task_data":[{"id":"DE137C62-1491-418C-8308-C7162E6CE315","element":"TextInput","text":"Text Input","required":false,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"text_input_F05F7E65-F7AD-4A4F-8FE3-58FFFA23F262","label":"Placeholder label"}]}'
// const formData = JSON.parse(jsonFormData);

// function MyForm() {
//   const formStyle = {
//     padding: '10px',
//     fontSize: '20px'
//   };

//   return (
//     <ReactFormGenerator
//       form_action="/path/to/form/submit"
//       form_method="POST"
//       data={formData.task_data}
//       style={formStyle}
//     />
//   );
// }

// export default MyForm;

import React from "react";
import { ReactFormGenerator } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { BASE_URL } from "../baseURL";
import { useRouter } from 'next/router';


// const jsonFormData = {"task_data":[{"id":"9B729AB6-FC2B-423B-8618-059DC96D37CC","element":"Header","text":"Header Text","static":true,"required":false,"bold":false,"italic":false,"content":"<p style=\"text-align:center;\">Income Assessment of Salaried Individual\t\t\t\t\t\t\t ","canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"dirty":false},{"id":"DE5FF831-59F8-4AFD-B22C-C443A7AFB24D","element":"TextInput","text":"Text Input","required":true,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"text_input_26C2EC70-D0C7-4AA2-B4A5-F69562102C42","label":"Employer Name ","dirty":false},{"id":"93C8518D-6015-46D2-8FB1-092C4748FA00","element":"RadioButtons","text":"Multiple Choice","required":true,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"inline":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"radiobuttons_322FAA86-FD0B-4056-A76B-E3847469DAA2","label":"Sector ","options":[{"value":"organised","text":"Organised","key":"radiobuttons_option_15934A8E-A3EB-4EA2-8C03-B1EF1FA462A8"},{"value":"unorganised","text":"Unorganised","key":"radiobuttons_option_3E9FAF51-4C7D-40E8-B86E-6499C4527FA3"}],"dirty":false},{"id":"4842A896-FF3E-4C75-86DC-7631C3940A93","element":"RadioButtons","text":"Multiple Choice","required":true,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"radiobuttons_2B1F7FF0-D851-42AA-A45B-19FD023AD29B","label":"Industry ","options":[{"value":"agriculture","text":"Agriculture","key":"radiobuttons_option_97BD1579-0461-46A0-B4E6-46AB84346E3A"},{"value":"manufactur","text":"Manufactur","key":"radiobuttons_option_ABBCAE0C-2BC2-4FBD-89BE-3BC9C75B2BAB"},{"value":"construction","text":"Construction","key":"radiobuttons_option_110E27F3-95A2-4B81-985A-E2496352FB9F"},{"value":"trade","text":"Trade","key":"0809D97F-9BC1-4DDF-BE38-944EBDF9C4D2"},{"value":"transportation","text":"Transportation","key":"C7351201-6629-4559-BA12-68CC47F1A34C"},{"value":"hospitality","text":"Hospitality","key":"7F4E731E-8DD1-4FBA-AFF1-6DCB657AA14D"},{"value":"other_services","text":"Other Services","key":"A7E26F94-5894-4C7C-AC3D-946B9D5DE2DC"}],"dirty":false},{"id":"F7BD13E6-371A-4CD6-B561-1C8315301280","element":"RadioButtons","text":"Multiple Choice","required":true,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"inline":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"radiobuttons_59EF12F3-2CB0-462E-9D98-1A1F6666F115","label":"Type of Organisation ","options":[{"value":"government","text":"Government","key":"radiobuttons_option_7B1745FF-F145-4C21-9B8A-FD34052E5C14"},{"value":"proprietor","text":"Proprietor","key":"radiobuttons_option_2829826F-F857-47F4-90BD-A60515E7FE1E"},{"value":"pvt_ltd","text":"PVT LTD","key":"radiobuttons_option_F9B76EB4-6B08-41CF-B506-B1A125119912"},{"value":"retailers","text":"Retailers","key":"5A4C53FC-E6AC-4C46-9171-697228AE8CA1"},{"value":"psu","text":"PSU","key":"C9BC86AB-A768-4F1D-BEFE-D9E70786131E"},{"value":"partnership","text":"Partnership","key":"0D88E73C-D3B0-4082-9ACB-A51F7EFD76D7"},{"value":"public_ltd","text":"Public LTD","key":"83B374AF-9F19-4BD7-80F0-C81799535841"}],"dirty":false}]}
const jsonFormData = {
  task_data: [
    {
      id: "9B729AB6-FC2B-423B-8618-059DC96D37CC",
      element: "Header",
      text: "Header Text",
      static: true,
      required: false,
      bold: false,
      italic: false,
      content:
        '<p style="text-align:center;">Income Assessment of Salaried Individual\t\t\t\t\t\t\t ',
      canHavePageBreakBefore: true,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canPopulateFromApi: true,
      dirty: false,
    },
    {
      id: "DE5FF831-59F8-4AFD-B22C-C443A7AFB24D",
      element: "TextInput",
      text: "Text Input",
      required: true,
      canHaveAnswer: true,
      canHavePageBreakBefore: true,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canPopulateFromApi: true,
      field_name: "text_input_26C2EC70-D0C7-4AA2-B4A5-F69562102C42",
      label: "Employer Name ",
      dirty: false,
    },
    {
      id: "93C8518D-6015-46D2-8FB1-092C4748FA00",
      element: "RadioButtons",
      text: "Multiple Choice",
      required: true,
      canHaveAnswer: true,
      canHavePageBreakBefore: true,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      inline: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canPopulateFromApi: true,
      field_name: "radiobuttons_322FAA86-FD0B-4056-A76B-E3847469DAA2",
      label: "Sector ",
      options: [
        {
          value: "organised",
          text: "Organised",
          key: "radiobuttons_option_15934A8E-A3EB-4EA2-8C03-B1EF1FA462A8",
        },
        {
          value: "unorganised",
          text: "Unorganised",
          key: "radiobuttons_option_3E9FAF51-4C7D-40E8-B86E-6499C4527FA3",
        },
      ],
      dirty: false,
    },
    {
      id: "4842A896-FF3E-4C75-86DC-7631C3940A93",
      element: "RadioButtons",
      text: "Multiple Choice",
      required: true,
      canHaveAnswer: true,
      canHavePageBreakBefore: true,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canPopulateFromApi: true,
      field_name: "radiobuttons_2B1F7FF0-D851-42AA-A45B-19FD023AD29B",
      label: "Industry ",
      options: [
        {
          value: "agriculture",
          text: "Agriculture",
          key: "radiobuttons_option_97BD1579-0461-46A0-B4E6-46AB84346E3A",
        },
        {
          value: "manufactur",
          text: "Manufactur",
          key: "radiobuttons_option_ABBCAE0C-2BC2-4FBD-89BE-3BC9C75B2BAB",
        },
        {
          value: "construction",
          text: "Construction",
          key: "radiobuttons_option_110E27F3-95A2-4B81-985A-E2496352FB9F",
        },
        {
          value: "trade",
          text: "Trade",
          key: "0809D97F-9BC1-4DDF-BE38-944EBDF9C4D2",
        },
        {
          value: "transportation",
          text: "Transportation",
          key: "C7351201-6629-4559-BA12-68CC47F1A34C",
        },
        {
          value: "hospitality",
          text: "Hospitality",
          key: "7F4E731E-8DD1-4FBA-AFF1-6DCB657AA14D",
        },
        {
          value: "other_services",
          text: "Other Services",
          key: "A7E26F94-5894-4C7C-AC3D-946B9D5DE2DC",
        },
      ],
      dirty: false,
    },
    {
      id: "F7BD13E6-371A-4CD6-B561-1C8315301280",
      element: "RadioButtons",
      text: "Multiple Choice",
      required: true,
      canHaveAnswer: true,
      canHavePageBreakBefore: true,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      inline: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canPopulateFromApi: true,
      field_name: "radiobuttons_59EF12F3-2CB0-462E-9D98-1A1F6666F115",
      label: "Type of Organisation ",
      options: [
        {
          value: "government",
          text: "Government",
          key: "radiobuttons_option_7B1745FF-F145-4C21-9B8A-FD34052E5C14",
        },
        {
          value: "proprietor",
          text: "Proprietor",
          key: "radiobuttons_option_2829826F-F857-47F4-90BD-A60515E7FE1E",
        },
        {
          value: "pvt_ltd",
          text: "PVT LTD",
          key: "radiobuttons_option_F9B76EB4-6B08-41CF-B506-B1A125119912",
        },
        {
          value: "retailers",
          text: "Retailers",
          key: "5A4C53FC-E6AC-4C46-9171-697228AE8CA1",
        },
        {
          value: "psu",
          text: "PSU",
          key: "C9BC86AB-A768-4F1D-BEFE-D9E70786131E",
        },
        {
          value: "partnership",
          text: "Partnership",
          key: "0D88E73C-D3B0-4082-9ACB-A51F7EFD76D7",
        },
        {
          value: "public_ltd",
          text: "Public LTD",
          key: "83B374AF-9F19-4BD7-80F0-C81799535841",
        },
      ],
      dirty: false,
    },
    {
      id: "6F02ADE4-8560-454D-B34D-486AD2CAC578",
      element: "TextInput",
      text: "Text Input",
      required: true,
      canHaveAnswer: true,
      canHavePageBreakBefore: true,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canPopulateFromApi: true,
      field_name: "text_input_D53268DC-36DC-4776-98F6-347F3FC2BCF9",
      label: "Designation/Job Role ",
      dirty: false,
    },
    {
      id: "60219060-982A-49DE-BAF2-B48BD003473E",
      element: "DatePicker",
      text: "Date",
      required: true,
      readOnly: false,
      defaultToday: false,
      canHavePageBreakBefore: true,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canPopulateFromApi: true,
      dateFormat: "MM/dd/yyyy",
      timeFormat: "hh:mm aa",
      showTimeSelect: false,
      showTimeSelectOnly: false,
      showTimeInput: false,
      field_name: "date_picker_EA51B4EE-3A41-44D8-A7D9-85D837B5CCCD",
      label: "Working Since ",
      dirty: false,
    },
    {
      id: "FB60C1BF-1140-4FFC-8BE0-BCB44FEE0AA8",
      element: "NumberInput",
      text: "Number Input",
      required: true,
      canHaveAnswer: true,
      canHavePageBreakBefore: true,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canPopulateFromApi: true,
      field_name: "number_input_D018B4C8-E8AC-40E7-A52E-52A2E20C6CCA",
      label: "Net Monthly Income ",
      dirty: false,
    },
    {
      id: "03C3DA7C-EDE2-4375-917A-5C3C4D5E4945",
      element: "Checkboxes",
      text: "Checkboxes",
      required: true,
      canHaveAnswer: true,
      canHavePageBreakBefore: true,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      inline: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canPopulateFromApi: true,
      field_name: "checkboxes_C228D66B-2188-448B-A081-CC77BB8A5D3B",
      label: "Income Received in ",
      options: [
        {
          value: "bank_account",
          text: "Bank Account",
          key: "checkboxes_option_B0D80871-FA50-47BA-B204-6879F5DB2BEB",
        },
        {
          value: "cash",
          text: "Cash",
          key: "checkboxes_option_22E127A7-9CAC-43E2-A429-50CA04A71634",
        },
      ],
      dirty: false,
    },
    {
      id: "CD32D15B-9C45-4DD8-805E-1D197735BA19",
      element: "FileUpload",
      text: "File Upload",
      required: false,
      canHavePageBreakBefore: true,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canPopulateFromApi: true,
      field_name: "file_upload_FF0081AD-2F09-4113-8501-06C7EE95CCF7",
      label: "Upload Proof of Income ",
      dirty: false,
      fileType: "image",
    },
    {
      id: "FD5824B5-39F7-454B-9235-126AB7441DDC",
      element: "FileUpload",
      text: "File Upload",
      required: true,
      canHavePageBreakBefore: true,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canPopulateFromApi: true,
      field_name: "file_upload_4A6101F8-AE49-40C4-B35B-A0D8B22B0E47",
      label: "Bank Statement ",
      dirty: false,
    },
    {
      id: "E39A9F50-CE60-4576-945E-675AB64ABB20",
      element: "TextArea",
      text: "Multi-line Input",
      required: true,
      canHaveAnswer: true,
      canHavePageBreakBefore: true,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canPopulateFromApi: true,
      field_name: "text_area_5D7C1626-7BE7-4EF8-AAA5-BA2A83A58EFC",
      label: "Employer Address ",
      dirty: false,
    },
    {
      id: "4D1D1AF7-0A6F-42F8-9709-4BD0FB57E030",
      element: "TextInput",
      text: "Text Input",
      required: false,
      canHaveAnswer: true,
      canHavePageBreakBefore: true,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canPopulateFromApi: true,
      field_name: "text_input_EA0D9906-3740-4DC6-AD63-2CD5B8F9A62F",
      label: "Employer/Reference Name ",
      dirty: false,
    },
    {
      id: "79BD36AA-9FCF-4AA3-8ADE-434A9F4D7B44",
      element: "PhoneNumber",
      text: "Phone Number",
      required: false,
      canHaveAnswer: true,
      canHavePageBreakBefore: true,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canPopulateFromApi: true,
      field_name: "phone_input_2D16F0F9-53B6-46BD-B1BE-CBC5CBED2EDB",
      label: "Employer/Reference Mobile ",
      dirty: false,
    },
  ],
};

// const jsonFormData = '{"task_data":[{"id":"EE3CC1F6-3C6E-4A31-820B-905A4BC7268F","element":"TextInput","text":"Text Input","required":false,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"text_input_6567269D-3404-4BF2-9029-84D87EF839E2","label":"Placeholder label"}]}'
// const formData = JSON.parse(jsonFormData);

function MyForm() {
  const [domLoaded, setDomLoaded] = useState(false);
  const router = useRouter();

//   const [formData, setFormData] = useState(null);

//   useEffect(() => {
//     const jsonData = localStorage.getItem('formData');
//     if (jsonData) {
//       setFormData(JSON.parse(jsonData));
//     }
//   }, []);
//   console.log(formData)

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // const OccupationID = localStorage.getItem('OccupationID');
    const OccupationID = router.query.occupationID;
    console.log(OccupationID)
    if (OccupationID) {
      const bearerToken = localStorage.getItem('access_token');

      // console.log(OccupationID)
      // setFormData(JSON.parse(jsonData));
      async function fetchData() {
        try {

          const response = await fetch(`${BASE_URL}/crm/incomeAssessment/templates?id=${OccupationID}`,
          {
            headers: {
              'Authorization': `Bearer ${bearerToken}`
            }
          }
          );
          const data = await response.json();
          // console.log(data.data[0].json)
          setFormData(data.data[0].json);
              setDomLoaded(true);

        } catch (error) {
          console.error(error);
        }
      }
  
      fetchData();
    }
  }, []);
  // console.log(formData)

  // useEffect(() => {
  //   setDomLoaded(true);
  // }, []);
  return (
    <>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      />

      {domLoaded && (
        <ReactFormGenerator
          form_action="/sucess"
          form_method="POST"
          // data={jsonFormData.task_data}
          data={formData}
          className="my-form"
        />
      )}
    </>
  );
}

export default MyForm;
