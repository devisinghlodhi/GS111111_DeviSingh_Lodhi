import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

const Modals: React.FC = () => {
  const { isOpen, content } = useSelector((store: RootState) => store.modalReducer);
  const dispatch = useDispatch();

  const [active, setActive] = useState<string | null>(null);

  const handleFocusIn = (e: FocusEvent) => {
    if ((document.activeElement as HTMLElement)?.tagName === "INPUT") {
      setActive(document.activeElement.tagName);
    }
  };

  useEffect(() => {
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  const handleClose = () => {
    if (active !== "INPUT") {
      dispatch({ type: "closeModal" });
    } else {
      setActive(null);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm z-50"
      onClick={handleClose} // Closes modal when clicking outside
    >
      <div 
        className="bg-white rounded-lg shadow-lg p-6 w-100 max-w-lg mx-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicked inside
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        {content}
      </div>
    </div>,
    document.body
  );
};

export default Modals;
