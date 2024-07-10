import React from "react";
import { useTheme } from "../../../context/themeContext";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: number | null;
  active?: boolean;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  badge,
  active,
  onClick,
}) => {
  const { theme } = useTheme();

  return (
    <li
      className={`relative flex items-center p-4 pl-7 transition-all cursor-pointer ${
        theme === "dark"
          ? active
            ? "bg-green-300 text-black"
            : "hover:bg-green-200 hover:text-black"
          : active
          ? "bg-green-100"
          : "hover:bg-green-200"
      }`}
      onClick={onClick}
    >
      {active && (
        <span
          className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-[#3ec995] to-[#77f07f]"
          aria-hidden="true"
        />
      )}
      <span className="mr-4">{icon}</span>
      <span className="flex-grow font-semibold">{label}</span>
      {badge && (
        <span className="bg-gradient-to-r from-[#3ec995] to-[#77f07f] text-xs font-bold mr-12 px-2.5 py-0.5 rounded-2xl">
          {badge}
        </span>
      )}
    </li>
  );
};
