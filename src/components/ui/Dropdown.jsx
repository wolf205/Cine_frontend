import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ label, items, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Xử lý đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Nút Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 text-sm font-bold uppercase transition-colors hover:text-primary ${
          isActive
            ? "text-primary border-b-2 border-primary pb-1"
            : "text-text-main"
        }`}
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-3 w-48 rounded-xl border border-white/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          <div className="py-2 flex flex-col">
            {items.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)} // Đóng menu khi chọn item
                className={({ isActive: isItemActive }) =>
                  `px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary ${
                    isItemActive
                      ? "text-primary bg-primary/5"
                      : "text-text-main"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
