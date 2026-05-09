import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { authApi } from "../../api/auth.api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useAuthStore from "../../hooks/useAuth";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onLogin = async (data) => {
    try {
      const response = await authApi.login(data);
      const isSuccess = response.data.success;

      if (isSuccess) {
        toast.success("Đăng nhập thành công!");
      }

      const { token, refreshToken, user } = response.data.data;

      login(user, token, refreshToken);

      if (user.role === "admin") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng thử lại.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Container chính với hiệu ứng Movie Card mới */}
      <div className="movie-card w-full max-w-md p-8 space-y-8 bg-background-card border-white/5">
        {/* Header của Form */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary tracking-tight">
            WELCOME BACK
          </h2>
          <p className="mt-2 text-text-muted">Vui lòng đăng nhập để tiếp tục</p>
        </div>

        {/* Login Form Content */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onLogin)}>
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
                {...register("email")}
              />
            </div>

            {errors.email && (
              <p className="text-primary text-xs mt-1">
                {errors.email.message}
              </p>
            )}

            {/* Input Password */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1 ml-1">
                Password
              </label>
              <Input
                type="password"
                required
                placeholder="••••••••"
                {...register("password")}
              />
            </div>

            {errors.password && (
              <p className="text-primary text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Quên mật khẩu & Remember me */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center text-text-muted cursor-pointer hover:text-primary transition-colors">
              <input type="checkbox" className="mr-2 accent-primary w-4 h-4" />
              Ghi nhớ tôi
            </label>
            <a
              href="#"
              className="text-text-muted hover:text-primary transition-colors"
            >
              Quên mật khẩu?
            </a>
          </div>

          {/* Login Button */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" color="text-white" />
                <span>ĐANG ĐĂNG NHẬP...</span>
              </div>
            ) : (
              "ĐĂNG NHẬP"
            )}
          </Button>
        </form>

        {/* Direct to Signup */}
        <div className="text-center pt-4">
          <p className="text-text-muted text-sm">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-primary font-bold hover:underline underline-offset-4 decoration-primary"
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
