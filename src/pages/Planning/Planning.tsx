import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ClientSideRowModelModule } from "ag-grid-community";

const Planning: React.FC = () => {
  const { sku_data, store_data } = useSelector((state: RootState) => state.dataReducer);
  const [rowData, setRowData] = useState<any[]>([]);
  const months = ["Feb", "Mar", "Apr", "May"]; // Example months
  const weeksPerMonth = 4;

  useEffect(() => {
    const crossJoinData = store_data.flatMap((store) =>
      sku_data.map((sku) => {
        const row: any = {
          store: store.label,
          sku: sku.label,
          price: sku.price,
          cost: sku.cost,
        };

        months.forEach((month) => {
          for (let week = 1; week <= weeksPerMonth; week++) {
            row[`${month} Week ${week} SalesUnits`] = 0;
          }
        });
        return row;
      })
    );
    setRowData(crossJoinData);
  }, [sku_data, store_data]);

  const columnDefs = [
    { headerName: "Store", field: "store", pinned: "left" },
    { headerName: "SKU", field: "sku", pinned: "left" },
    ...months.map((month) => ({
      headerName: month,
      marryChildren: true,
      children: Array.from({ length: weeksPerMonth }, (_, i) => {
        const week = i + 1;
        return {
          headerName: `Week ${week}`,
          marryChildren: true,
          children: [
            {
              headerName: "Sales Units",
              field: `${month} Week ${week} SalesUnits`,
              editable: true,
              valueParser: (params: any) => parseInt(params.newValue) || 0,
            },
            {
              headerName: "Sales Dollars",
              valueGetter: (params: any) => {
                const units = params.data[`${month} Week ${week} SalesUnits`];
                return `$${(units * params.data.price).toFixed(2)}`;
              },
            },
            {
              headerName: "GM Dollars",
              valueGetter: (params: any) => {
                const units = params.data[`${month} Week ${week} SalesUnits`];
                return `$${((units * params.data.price) - (units * params.data.cost)).toFixed(2)}`;
              },
            },
            {
              headerName: "GM %",
              valueGetter: (params: any) => {
                const units = params.data[`${month} Week ${week} SalesUnits`];
                const salesDollars = units * params.data.price;
                const gmDollars = salesDollars - (units * params.data.cost);
                return salesDollars ? `${((gmDollars / salesDollars) * 100).toFixed(2)}%` : "0%";
              },
              cellStyle: (params: any) => {
                const value = parseFloat(params.value);
                if (value >= 40) return { backgroundColor: "green", color: "white" };
                if (value >= 10) return { backgroundColor: "yellow" };
                if (value > 5) return { backgroundColor: "orange" };
                return { backgroundColor: "red", color: "white" };
              },
            },
          ],
        };
      }),
    })),
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "80vh", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        modules={[ClientSideRowModelModule]}
        domLayout="autoHeight"
        rowHeight={55}
        headerHeight={70}
      />
    </div>
  );
};

export default Planning;
