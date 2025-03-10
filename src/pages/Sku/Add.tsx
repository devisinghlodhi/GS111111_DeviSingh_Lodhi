import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const SKUForm: React.FC = () => {
  const dispatch = useDispatch();
  const { sku_data } = useSelector((state: RootState) => state.dataReducer);

  const [skuId, setSkuId] = useState("");
  const [skuLabel, setSkuLabel] = useState("");
  const [skuClass, setSkuClass] = useState("");
  const [skuDepartment, setSkuDepartment] = useState("");
  const [skuPrice, setSkuPrice] = useState("");
  const [skuCost, setSkuCost] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (sku_data.some((sku) => sku.id === skuId)) {
      setError("SKU ID already exists");
      return;
    }

    setError("");
    dispatch({
      type: "add_sku",
      payload: {
        id: skuId,
        label: skuLabel,
        class: skuClass,
        department: skuDepartment,
        price: Number(skuPrice),
        cost: Number(skuCost),
      },
    });
    setSkuId("");
    setSkuLabel("");
    setSkuClass("");
    setSkuDepartment("");
    setSkuPrice("");
    setSkuCost("");

    dispatch({ type: "closeModal" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Add SKU</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">ID:</label>
            <input 
              type="text" 
              value={skuId} 
              onChange={(e) => setSkuId(e.target.value)} 
              required 
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Label:</label>
            <input 
              type="text" 
              value={skuLabel} 
              onChange={(e) => setSkuLabel(e.target.value)} 
              required 
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Class:</label>
            <input 
              type="text" 
              value={skuClass} 
              onChange={(e) => setSkuClass(e.target.value)} 
              required 
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Department:</label>
            <input 
              type="text" 
              value={skuDepartment} 
              onChange={(e) => setSkuDepartment(e.target.value)} 
              required 
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Price:</label>
            <input 
              type="number" 
              value={skuPrice} 
              onChange={(e) => setSkuPrice(e.target.value)} 
              required 
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Cost:</label>
            <input 
              type="number" 
              value={skuCost} 
              onChange={(e) => setSkuCost(e.target.value)} 
              required 
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm" 
            />
          </div>
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button 
          type="submit" 
          className="w-full py-3 px-4 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Add SKU
        </button>
      </form>
    </div>
  );
};

export default SKUForm;