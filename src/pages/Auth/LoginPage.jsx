import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useState } from "react";
import axios from "../../api/axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/auth/signIn", formData);

      const { token, refreshToken, user } = response.data.data;

      // Lưu token vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      // Điều hướng sau khi đăng nhập thành công
      if (user.role === "admin") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng thử lại.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Container chính với hiệu ứng Movie Card */}
      <div className="movie-card w-full max-w-md p-8 space-y-8">
        {/* Header của Form */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-neon tracking-tight">
            WELCOME BACK
          </h2>
          <p className="mt-2 text-text-muted">Vui lòng đăng nhập để tiếp tục</p>
        </div>

        {/* --- Hiển thị thông báo lỗi ở đây --- */}
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* Login Form Content */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            {/* Input Email */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1 ml-1">
                Email Address
              </label>
              <Input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1 ml-1">
                Password
              </label>
              <Input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* Quên mật khẩu & Remember me */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center text-text-muted cursor-pointer hover:text-neon">
              <input type="checkbox" className="mr-2 accent-neon" />
              Ghi nhớ tôi
            </label>
            <a
              href="#"
              className="text-neon-dim hover:text-neon transition-colors"
            >
              Quên mật khẩu?
            </a>
          </div>

          {/* Login Button */}
          <Button type="submit" disabled={loading}>
            {loading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP"}
          </Button>
        </form>

        {/* Direct to Signup */}
        <div className="text-center pt-4">
          <p className="text-text-muted">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-neon font-bold hover:underline decoration-neon-glow underline-offset-4"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
