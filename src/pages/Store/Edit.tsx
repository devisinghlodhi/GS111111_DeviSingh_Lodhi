import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

interface UpdateStoreFormProps {
  seqNo: number;
}

const UpdateStoreForm: React.FC<UpdateStoreFormProps> = ({ seqNo }) => {
  const dispatch = useDispatch();
  const { store_data } = useSelector((store: RootState) => store.dataReducer);

  const storeToUpdate = store_data.find((store) => store.seqNo === seqNo) || {};

  const [updatedLabel, setUpdatedLabel] = useState(storeToUpdate.label || "");
  const [updatedCity, setUpdatedCity] = useState(storeToUpdate.city || "");
  const [updatedState, setUpdatedState] = useState(storeToUpdate.state || "");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "update_store",
      payload: {
        seqNo,
        label: updatedLabel,
        city: updatedCity,
        state: updatedState,
      },
    });
    dispatch({ type: "closeModal" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Update Store</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Updated Label:</label>
          <input
            type="text"
            value={updatedLabel}
            onChange={(e) => setUpdatedLabel(e.target.value)}
            required
            className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Updated City:</label>
          <input
            type="text"
            value={updatedCity}
            onChange={(e) => setUpdatedCity(e.target.value)}
            required
            className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Updated State:</label>
          <input
            type="text"
            value={updatedState}
            onChange={(e) => setUpdatedState(e.target.value)}
            required
            className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Update Store
        </button>
      </form>
    </div>
  );
};

export default UpdateStoreForm;
