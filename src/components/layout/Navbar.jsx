import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, User, LogOut } from "lucide-react";
import useAuthStore from "../../hooks/useAuth"; // Đường dẫn đến store của bạn
import { toast } from "sonner";
import { authApi } from "../../api/auth.api"; // Đường dẫn đến API của bạn

const Navbar = () => {
  const navigate = useNavigate();
  // Lấy user và hàm logout từ Zustand store
  const { user, logout, refreshToken } = useAuthStore();

  const handleLogout = async () => {
    await authApi.logout({ refreshToken });
    logout();
    toast.success("Đăng xuất thành công!");
    navigate("/login");
  };

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
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `text-sm font-bold uppercase transition-colors hover:text-primary ${isActive ? "text-primary border-b-2 border-primary pb-1" : "text-text-main"}`
          }
        >
          Phim
        </NavLink>
        <NavLink
          to="/cinemas"
          className={({ isActive }) =>
            `text-sm font-bold uppercase transition-colors hover:text-primary ${isActive ? "text-primary border-b-2 border-primary pb-1" : "text-text-main"}`
          }
        >
          Rạp
        </NavLink>
        <NavLink
          to="/showtimes"
          className={({ isActive }) =>
            `text-sm font-bold uppercase transition-colors hover:text-primary ${isActive ? "text-primary border-b-2 border-primary pb-1" : "text-text-main"}`
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

        {/* Kiểm tra user để hiển thị UI phù hợp */}
        {user ? (
          <div className="flex items-center gap-4">
            {/* Avatar dẫn đến trang Profile */}
            <Link to="/profile" className="group flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden hover:shadow-primary-glow transition-all">
                {user.avatar ? (
                  <img
                    src={user.avatar}
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
            </Link>

            {/* Nút đăng xuất nhanh */}
            <button
              onClick={handleLogout}
              className="text-xs text-text-muted hover:text-primary transition-colors ml-2"
            >
              <LogOut className="w-4 h-4" />
            </button>
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
