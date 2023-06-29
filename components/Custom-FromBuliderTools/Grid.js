import React, { useState } from 'react';
// import { Registry } from 'react-form-builder2';
import DataGrid from 'react-data-grid';

const MyDataGrid = () => {
    const [columns, setColumns] = useState([
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' }
    ]);
  
    const [rows, setRows] = useState([
      { id: 0, title: 'Example' },
      { id: 1, title: 'Demo' }
    ]);
  
    const handleAddColumn = () => {
      const newColumnKey = `column${columns.length}`;
      const newColumn = { key: newColumnKey, name: newColumnKey };
      setColumns([...columns, newColumn]);
    };
  
    const handleRemoveColumn = () => {
      if (columns.length > 1) {
        setColumns(columns.slice(0, -1));
      }
    };
  
    const handleAddRow = () => {
      const newRow = { id: rows.length };
      setRows([...rows, newRow]);
    };
  
    const handleRemoveRow = () => {
      if (rows.length > 1) {
        setRows(rows.slice(0, -1));
      }
    };
  
    return (
      <div>
        <DataGrid columns={columns} rows={rows} className="my-grid" />
        <button onClick={handleAddColumn}>Add Column</button>
        <button onClick={handleRemoveColumn}>Remove Column</button>
        <button onClick={handleAddRow}>Add Row</button>
        <button onClick={handleRemoveRow}>Remove Row</button>
      </div>
    );
  };


  export default MyDataGrid;