import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule } from "ag-grid-community";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import SKUForm from "./Add";
import UpdateSKUForm from "./Edit";

const SKUPage: React.FC = () => {
  const { sku_data } = useSelector((store: RootState) => store.dataReducer);
  const dispatch = useDispatch();

  const columnDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true, width: 120 },
    { headerName: "Label", field: "label", sortable: true, filter: true, width: 220 },
    { headerName: "Class", field: "class", sortable: true, filter: true, width: 170 },
    { headerName: "Department", field: "department", sortable: true, filter: true, width: 170 },
    { headerName: "Price", field: "price", sortable: true, filter: true, width: 120 },
    { headerName: "Cost", field: "cost", sortable: true, filter: true, width: 120 },
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
            onClick={() => handleDelete(params.data.id)}
          >
            Delete
          </button>
        </div>
      ),
      width: 220,
    },
  ];

  const handleDelete = (id: string) => {
    dispatch({ type: "delete_sku", payload: id });
  };

  const handleEdit = (data: any) => {
    dispatch({ type: "openModal", payload: <UpdateSKUForm id={data.id} /> });
  };

  const handleAdd = () => {
    dispatch({ type: "openModal", payload: <SKUForm /> });
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">SKU Management</h2>
        <button
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
          onClick={handleAdd}
        >
          + Add SKU
        </button>
        <div className="ag-theme-alpine w-full h-[600px] rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <AgGridReact
            rowData={sku_data}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={5}
            modules={[ClientSideRowModelModule]}
            domLayout='autoHeight'
            rowHeight={55} 
            headerHeight={70} 
          />
        </div>
      </div>
    </div>
  );
};

export default SKUPage;
