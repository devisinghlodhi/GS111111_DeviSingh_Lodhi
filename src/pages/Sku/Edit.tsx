import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

interface UpdateSKUFormProps {
    id: string;
}

const UpdateSKUForm: React.FC<UpdateSKUFormProps> = ({ id }) => {
  const dispatch = useDispatch();
  const { sku_data } = useSelector((state: RootState) => state.dataReducer);

  const skuToUpdate = sku_data.find((sku) => sku.id === id) || {};

  const [updatedLabel, setUpdatedLabel] = useState(skuToUpdate.label || "");
  const [updatedClass, setUpdatedClass] = useState(skuToUpdate.class || "");
  const [updatedDepartment, setUpdatedDepartment] = useState(skuToUpdate.department || "");
  const [updatedPrice, setUpdatedPrice] = useState(skuToUpdate.price || "");
  const [updatedCost, setUpdatedCost] = useState(skuToUpdate.cost || "");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "update_sku",
      payload: {
        id: id,
        label: updatedLabel,
        class: updatedClass,
        department: updatedDepartment,
        price: Number(updatedPrice),
        cost: Number(updatedCost),
      },
    });
    dispatch({ type: "closeModal" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Update SKU</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        {/* First Row */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Updated Label:</label>
            <input
              type="text"
              value={updatedLabel}
              onChange={(e) => setUpdatedLabel(e.target.value)}
              required
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Updated Class:</label>
            <input
              type="text"
              value={updatedClass}
              onChange={(e) => setUpdatedClass(e.target.value)}
              required
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Updated Department:</label>
            <input
              type="text"
              value={updatedDepartment}
              onChange={(e) => setUpdatedDepartment(e.target.value)}
              required
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Updated Price:</label>
            <input
              type="number"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(e.target.value)}
              required
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Third Row */}
        <div>
          <label className="block text-gray-700 font-medium">Updated Cost:</label>
          <input
            type="number"
            value={updatedCost}
            onChange={(e) => setUpdatedCost(e.target.value)}
            required
            className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Update SKU
        </button>
      </form>
    </div>
  );
};

export default UpdateSKUForm;
