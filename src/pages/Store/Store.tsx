import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule } from "ag-grid-community";

const StorePage: React.FC = () => {
  const [rowData, setRowData] = useState([
    { seqNo: 1, id: "ST035", label: "San Francisco Bay Trends", city: "San Francisco", state: "CA" },
    { seqNo: 2, id: "ST046", label: "Phoenix Sunwear", city: "Phoenix", state: "AZ" },
    { seqNo: 3, id: "ST064", label: "Dallas Ranch Supply", city: "Dallas", state: "TX" },
    { seqNo: 4, id: "ST066", label: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
  ]);

  const columnDefs = [
    { headerName: "Seq No.", field: "seqNo", sortable: true, filter: true, width: 120 },
    { headerName: "ID", field: "id", sortable: true, filter: true, width: 120 , hide: true},
    { headerName: "Label", field: "label", sortable: true, filter: true, width: 220 },
    { headerName: "City", field: "city", sortable: true, filter: true, width: 170 },
    { headerName: "State", field: "state", sortable: true, filter: true, width: 120 },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={() => handleEdit(params.data)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={() => handleDelete(params.data.seqNo)}
          >
            Delete
          </button>
        </div>
      ),
      width: 220,
    },
  ];

  const handleDelete = (seqNo: number) => {
    setRowData(rowData.filter((row) => row.seqNo !== seqNo));
  };

  const handleEdit = (data: any) => {
    const newLabel = prompt("Edit Label:", data.label);
    if (newLabel) {
      setRowData(
        rowData.map((row) => (row.seqNo === data.seqNo ? { ...row, label: newLabel } : row))
      );
    }
  };

  const handleAdd = () => {
    const newId = prompt("Enter ID:");
    const newLabel = prompt("Enter Label:");
    const newCity = prompt("Enter City:");
    const newState = prompt("Enter State:");
    if (newId && newLabel && newCity && newState) {
      setRowData([
        ...rowData,
        { seqNo: rowData.length + 1, id: newId, label: newLabel, city: newCity, state: newState },
      ]);
    }
  };

  return (
    <div className="">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Store Management</h2>
        <button className="mb-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition" onClick={handleAdd}>
          + Add Record
        </button>
        <div className="ag-theme-alpine w-full h-[600px] rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={5}
            modules={[ClientSideRowModelModule]}
            domLayout='autoHeight'
            rowHeight={55} // Increased row height
            headerHeight={70} // Increased header height
          />
        </div>
      </div>
    </div>
  );
};

export default StorePage;