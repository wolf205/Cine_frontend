import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Search, User, LogOut, Ticket } from "lucide-react"; // Thêm icon Ticket
import useAuthStore from "../../hooks/useAuth";
import { toast } from "sonner";
import { authApi } from "../../api/auth.api";
import Dropdown from "../ui/Dropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, refreshToken } = useAuthStore();

  // Thêm state và ref cho dropdown của user
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Xử lý click ra ngoài để đóng user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout({ refreshToken });
      toast.success("Đăng xuất thành công!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Đăng xuất thất bại. Vui lòng thử lại.";
      toast.error(errorMessage);
    } finally {
      logout();
      navigate("/login");
    }
  };

  const movieItems = [
    { label: "Phim Đang Chiếu", path: "/movies/now_showing" },
    { label: "Phim Sắp Chiếu", path: "/movies/coming_soon" },
  ];

  const cinemaItems = [
    { label: "Hệ Thống Rạp", path: "/cinemas/system" },
    { label: "Rạp Đặc Biệt", path: "/cinemas/special" },
  ];

  return (
    <nav className="glass-header w-full px-6 py-4 flex items-center justify-between">
      {/* Brand Logo */}
      <Link
        to="/"
        className="text-2xl font-black text-primary tracking-tighter uppercase"
      >
        CineBooking
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-10">
        <Dropdown
          label="Phim"
          items={movieItems}
          isActive={location.pathname.startsWith("/movies")}
        />
        <Dropdown
          label="Rạp"
          items={cinemaItems}
          isActive={location.pathname.startsWith("/cinemas")}
        />
        <NavLink
          to="/showtimes"
          className={({ isActive }) =>
            `text-sm font-bold uppercase transition-colors hover:text-primary ${
              isActive
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-text-main"
            }`
          }
        >
          Lịch chiếu
        </NavLink>
      </div>

      {/* Right Side: Search & Auth Logic */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative group hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Tìm phim..."
            className="nav-search pl-10 pr-4 py-2 w-64 outline-none"
          />
        </div>

        {/* Auth UI */}
        {user ? (
          <div className="relative flex items-center gap-4" ref={userMenuRef}>
            {/* User Avatar Button */}
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="group flex items-center gap-3 outline-none"
            >
              <div className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden hover:shadow-primary-glow transition-all">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-primary" />
                )}
              </div>
              <span className="hidden sm:block text-sm font-medium text-text-main group-hover:text-primary transition-colors">
                {user.name}
              </span>
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-3 w-48 rounded-xl border border-white/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="py-2 flex flex-col">
                  <Link
                    to="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary flex items-center gap-3 text-text-main"
                  >
                    <User className="w-4 h-4" />
                    Hồ sơ
                  </Link>
                  <Link
                    to="/tickets-history" // Bạn có thể đổi lại route cho đúng với app của bạn
                    onClick={() => setIsUserMenuOpen(false)}
                    className="px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary flex items-center gap-3 text-text-main"
                  >
                    <Ticket className="w-4 h-4" />
                    Lịch sử đặt vé
                  </Link>

                  {/* Đường kẻ chia cách */}
                  <div className="h-px bg-gray-200 dark:bg-white/10 my-1 mx-3"></div>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:dark:bg-red-500/10 flex items-center gap-3"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-text-main hover:text-primary transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="bg-primary hover:bg-primary-hover text-white text-sm font-bold px-5 py-2 rounded-lg shadow-primary-glow transition-all active:scale-95"
            >
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
