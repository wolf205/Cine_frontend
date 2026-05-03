import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const LoginPage = () => {
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

        {/* Login Form Content */}
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            {/* Input Email */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1 ml-1">
                Email Address
              </label>
              <Input type="email" required placeholder="name@example.com" />
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1 ml-1">
                Password
              </label>
              <Input type="password" required placeholder="••••••••" />
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
          <Button type="submit">ĐĂNG NHẬP</Button>
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
