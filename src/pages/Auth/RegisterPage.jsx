import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { authApi } from "../../api/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const RegisterPage = () => {
  const navigate = useNavigate();

  const registerSchema = z
    .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onRegister = async (data) => {
    try {
      const { name, email, password } = data;
      const registerData = { name, email, password };
      const response = await authApi.register(registerData);
      const isSuccess = response.data.success;

      if (isSuccess) {
        toast.success("Đăng ký thành công!");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Container chính với theme Đỏ-Đen */}
      <div className="movie-card w-full max-w-md p-8 space-y-8 bg-background-card border-white/5">
        {/* Header của Form */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary tracking-tight">
            TẠO TÀI KHOẢN
          </h2>
          <p className="mt-2 text-text-muted">Vui lòng đăng ký để tiếp tục</p>
        </div>

        {/* Register Form Content */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onRegister)}>
          <div className="space-y-4">
            {/* Input Name */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1 ml-1">
                Name
              </label>
              <Input
                type="text"
                placeholder="Your Name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-primary text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Input Email */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1 ml-1">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="name@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-primary text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1 ml-1">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-primary text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Input Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1 ml-1">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-primary text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Register Button */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                <span>ĐANG ĐĂNG KÝ...</span>
              </div>
            ) : (
              "ĐĂNG KÝ"
            )}
          </Button>
        </form>

        {/* Direct to Login */}
        <div className="text-center pt-4">
          <p className="text-text-muted text-sm">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline underline-offset-4 decoration-primary"
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
