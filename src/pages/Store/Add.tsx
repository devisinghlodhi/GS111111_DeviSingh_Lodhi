import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const StoreForm: React.FC = () => {
  const dispatch = useDispatch();
  const {store_data} = useSelector((state: RootState) => state.dataReducer);

  const [seqNo, setSeqNo] = useState("");
  const [newId, setNewId] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (store_data.some((store) => store.seqNo === Number(seqNo))) {
      setError("Seq No already exists");
      return;
    }
    if (store_data.some((store) => store.id === newId)) {
      setError("ID already exists");
      return;
    }

    setError("");
    dispatch({
      type: "add_store",
      payload: {
        seqNo: Number(seqNo),
        id: newId,
        label: newLabel,
        city: newCity,
        state: newState,
      },
    });
    setSeqNo("");
    setNewId("");
    setNewLabel("");
    setNewCity("");
    setNewState("");

    dispatch({ type: "closeModal" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Add Store</h2>
     
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Seq No:</label>
            <input 
              type="number" 
              value={seqNo} 
              onChange={(e) => setSeqNo(e.target.value)} 
              required 
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">ID:</label>
            <input 
              type="text" 
              value={newId} 
              onChange={(e) => setNewId(e.target.value)} 
              required 
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm" 
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Label:</label>
            <input 
              type="text" 
              value={newLabel} 
              onChange={(e) => setNewLabel(e.target.value)} 
              required 
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">City:</label>
            <input 
              type="text" 
              value={newCity} 
              onChange={(e) => setNewCity(e.target.value)} 
              required 
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm" 
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">State:</label>
          <input 
            type="text" 
            value={newState} 
            onChange={(e) => setNewState(e.target.value)} 
            required 
            className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm" 
          />
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button 
          type="submit" 
          className="w-full py-3 px-4 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Add Store
        </button>
      </form>
    </div>
  );
};

export default StoreForm;
