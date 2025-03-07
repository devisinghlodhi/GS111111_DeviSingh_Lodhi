import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { Store, Package, Calendar, BarChart } from "lucide-react";
import UserProfile from "./Profile";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const navItems = [
  { path: "/store", label: "Store", Icon: Store },
  { path: "/sku", label: "Sku", Icon: Package },
  { path: "/planning", label: "Planning", Icon: Calendar },
  { path: "/charts", label: "Charts", Icon: BarChart },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => { 
  const { isLogin } = useSelector((store: RootState) => store.userReducer);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(!isLogin){
      navigate("/")
    }
  }, [isLogin])

  return (
    <>
    <div className="flex justify-between items-center px-3 py-1">
      {/* Left Section: Logo & App Name */}
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="w-25" />
      </div>

      <h5 className="text-lg font-semibold">Data Viewer App</h5>
      
      {/* Right Section: User Profile */}
      <div className="flex items-center gap-2">
      {/* <CircleUserRound className="h-5 w-5" /> */}
      <UserProfile />
        </div>
    </div>
  
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-50 p-3 space-y-3 transition-transform">
        <nav>
          <ul className="space-y-2">
          {navItems.map(({ path, label, Icon }) => (
        <li key={path}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 rounded transition-colors duration-200 ${
                isActive ? "bg-gray-200" : "hover:bg-gray-100"
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        </li>
      ))}
          </ul>
        </nav>
      </div>

      <div className="flex flex-col flex-1">       
        <main className="p-4 flex-1 bg-gray-200 overflow-auto">{children}</main>
      </div>
    </div>
    </>
  );
};

export default Layout;
