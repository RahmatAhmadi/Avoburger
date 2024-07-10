import React, { useEffect } from "react";
import ThemeSwitch from "../common/Theme";
import { SidebarItem } from "./SidebarItem/SidebarItem";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themeContext";
import { FaEllipsisV } from "react-icons/fa";
import { PiAvocadoFill, PiHamburgerBold } from "react-icons/pi";
import { IoSendSharp } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdPerson } from "react-icons/io";

const sidebarItems = [
  {
    icon: <RxDashboard />,
    label: "Dashboard",
    badge: null,
    path: "/dashboard",
  },
  { icon: <RiShoppingBag2Fill />, label: "Orders", badge: 12, path: "/orders" },
  {
    icon: <PiHamburgerBold />,
    label: "Products",
    badge: null,
    path: "/products",
  },
  {
    icon: <HiLocationMarker />,
    label: "Restaurants",
    badge: null,
    path: "/restaurants",
  },
  { icon: <IoMdPerson />, label: "Drivers", badge: null, path: "/drivers" },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    const pathname = location.pathname;
    const active = sidebarItems.find((item) => item.path === pathname);
    setActiveItem(active ? active.label : null);
  }, [location.pathname]);

  const handleItemClick = (label: string, path: string) => {
    setActiveItem(label);
    navigate(path);
  };

  return (
    <aside
      className={`flex flex-col h-full z-50 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center p-4 pl-6 mb-10">
        <PiAvocadoFill
          size={24}
          className="mt-1 mr-2 text-[#3ec995] -scale-x-125"
        />
        <span className="text-2xl font-bold">avoburger</span>
      </div>
      <div className="p-4 pl-6">
        <ThemeSwitch />
      </div>
      <ul className="flex-grow">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            active={activeItem === item.label}
            onClick={() => handleItemClick(item.label, item.path)}
          />
        ))}
      </ul>
      <div className="p-4">
        <div className="text-center font-semibold text-gray-700 mb-4">
          <span>Done for the day?</span>
        </div>
        <button className="flex items-center justify-center w-full bg-gradient-to-r from-[#3ec995] to-[#77f07f] text-white py-3 px-5 rounded">
          <IoSendSharp size={20} className="mr-2" />
          Send daily report
        </button>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="relative">
          <img
            src="https://randomuser.me/api/portraits/women/76.jpg"
            alt="User avatar"
            className="h-10 w-10 rounded-full"
          />
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-gradient-to-r from-[#3ec995] to-[#77f07f]"></span>
        </div>
        <span className="font-semibold">Annalise Wallis</span>
        <FaEllipsisV />
      </div>
    </aside>
  );
}
