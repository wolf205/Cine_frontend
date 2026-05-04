import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import axios from "../../api/axios";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/auth/signUp", formData);

      const isSuccess = response.data.success;
      // Điều hướng sau khi đăng nhập thành công
      if (isSuccess) {
        navigate("/login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
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
            TẠO TÀI KHOẢN
          </h2>
          <p className="mt-2 text-text-muted">Vui lòng đăng ký để tiếp tục</p>
        </div>

        {/* --- Hiển thị thông báo lỗi ở đây --- */}
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* Register Form Content */}
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            {/* Input Name */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1 ml-1">
                Name
              </label>
              <Input
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
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
            {/* Input Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1 ml-1">
                Confirm Password
              </label>
              <Input
                type="password"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          {/* Register Button */}
          <Button type="submit" disabled={loading}>
            {loading ? "ĐANG ĐĂNG KÝ..." : "ĐĂNG KÝ"}
          </Button>
        </form>

        {/* Direct to Signup */}
        <div className="text-center pt-4">
          <p className="text-text-muted">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-neon font-bold hover:underline decoration-neon-glow underline-offset-4"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
