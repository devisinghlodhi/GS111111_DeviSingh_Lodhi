import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

const Modals: React.FC = () => {
  const { isOpen, content, size } = useSelector((store: RootState) => store.modalReducer);
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

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
          <div className={`bg-white rounded-lg shadow-lg p-6 w-80 max-w-lg mx-auto relative`}>
            <button
              onClick={() => dispatch({ type: "closeModal" })}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;