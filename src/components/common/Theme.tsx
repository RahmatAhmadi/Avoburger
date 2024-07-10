import Switch from "react-switch";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/themeContext";

export default function Theme() {
  const themeContext = useTheme();

  if (!themeContext) {
    throw new Error();
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <div className="flex items-center">
      <Switch
        onChange={toggleTheme}
        checked={theme === "dark"}
        offColor="#f0e68c"
        onColor="#2c3e50"
        checkedIcon={
          <div className="flex items-center justify-center h-full">
            <FaMoon color="white" />
          </div>
        }
        uncheckedIcon={
          <div className="flex items-center justify-center h-full">
            <FaSun color="orange" />
          </div>
        }
        className="react-switch"
      />
    </div>
  );
}
