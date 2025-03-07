import { useState, useRef, useEffect } from "react";
import { CircleUserRound } from "lucide-react";
import { useDispatch } from "react-redux";

const UserProfile = () => {
    const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch({ type: "logout" });
    // console.log("User logged out");
    // Add your logout logic here
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon */}
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
        <CircleUserRound className="h-5 w-5 cursor-pointer" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign-Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
