import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const RegisterPage = () => {
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

        {/* Register Form Content */}
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            {/* Input Name */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1 ml-1">
                Name
              </label>
              <Input type="text" required placeholder="Your Name" />
            </div>
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
            {/* Input Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1 ml-1">
                Confirm Password
              </label>
              <Input type="password" required placeholder="••••••••" />
            </div>
          </div>

          {/* Register Button */}
          <Button type="submit">ĐĂNG KÝ</Button>
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
