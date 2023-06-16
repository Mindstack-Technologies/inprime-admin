import React from 'react';

const CustomStylesTable = {
        headCells: {
            // style: {
            //   backgroundColor: '#ADD8E6', // Change the background color of the header cells
            //   fontSize: '12px', // Change the font size of the header cells

            //   background: "rgba(235, 236, 241, 0.3)",
            //   // border: "1px solid #EBECF1",
            //   // borderRadius: "4px 4px 0px 0px",

            //   // Add more styles here
            // },


        },
        head: {
            style: {
                backgroundColor: '#ADD8E6', // Change the background color of the header cells
                fontSize: '12px', // Change the font size of the header cells
                // backgroundColor: 'white',
                background: 'rgba(235, 236, 241, 1)',
                border: "1px solid #EBECF1",
                borderRadius: "4px 4px 0px 0px",
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "15px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "rgba(51, 51, 51, 0.8)",

                // Add more styles here
            },
        },
        rowCells: {
            style: {
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: '14px',
                lineHeight: "17px",
                color: "#333333",

            }

        },
        rows: {
            style: {
                borderRadius: "4px 4px 0px 0px",
                background: "#FFFFFF",
                // border: "1px solid #EBECF1",

            }
        },
        tableWrapper: {
            style: {
              display: 'block',
              minHeight: "70vh",
              height: '100%',
              maxHeight: '70vh',
              overflowY: 'auto',
            },
          },
        // Add more custom styles here
    };
  
  export default CustomStylesTable ;

