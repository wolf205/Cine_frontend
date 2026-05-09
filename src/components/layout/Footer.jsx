import {
  Award,
  TvMinimalPlay,
  Aperture,
  CreditCard,
  Banknote,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          {/* Cột Logo & Giới thiệu */}
          <div className="md:col-span-5 lg:col-span-4">
            <h2 className="text-2xl font-bold text-text-main mb-6 tracking-wide">
              CineBooking
            </h2>
            <p className="text-text-muted leading-relaxed mb-6 pr-4">
              Hệ thống đặt vé xem phim trực tuyến hàng đầu Việt Nam, mang đến
              trải nghiệm điện ảnh hoàn hảo nhất.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-5 text-text-muted">
              <Award className="w-6 h-6 hover:text-primary cursor-pointer transition-colors duration-300" />
              <TvMinimalPlay className="w-6 h-6 hover:text-primary cursor-pointer transition-colors duration-300" />
              <Aperture className="w-6 h-6 hover:text-primary cursor-pointer transition-colors duration-300" />
            </div>
          </div>

          {/* Các cột Links */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 mt-4 md:mt-0">
            {/* Khám phá */}
            <div>
              <h3 className="text-text-main font-bold uppercase tracking-wider mb-6 text-sm">
                Khám phá
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/movies?status=now_showing"
                    className="text-text-muted hover:text-primary transition-colors duration-300 block text-sm"
                  >
                    Phim đang chiếu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/movies?status=up_coming"
                    className="text-text-muted hover:text-primary transition-colors duration-300 block text-sm"
                  >
                    Phim sắp chiếu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/theaters"
                    className="text-text-muted hover:text-primary transition-colors duration-300 block text-sm"
                  >
                    Rạp chiếu
                  </Link>
                </li>
              </ul>
            </div>

            {/* Hỗ trợ */}
            <div>
              <h3 className="text-text-main font-bold uppercase tracking-wider mb-6 text-sm">
                Hỗ trợ
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/contact"
                    className="text-text-muted hover:text-primary transition-colors duration-300 block text-sm"
                  >
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-text-muted hover:text-primary transition-colors duration-300 block text-sm"
                  >
                    Câu hỏi thường gặp
                  </Link>
                </li>
                <li>
                  <Link
                    to="/feedback"
                    className="text-text-muted hover:text-primary transition-colors duration-300 block text-sm"
                  >
                    Góp ý
                  </Link>
                </li>
              </ul>
            </div>

            {/* Pháp lý */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-text-main font-bold uppercase tracking-wider mb-6 text-sm">
                Pháp lý
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/terms"
                    className="text-text-muted hover:text-primary transition-colors duration-300 block text-sm"
                  >
                    Điều khoản sử dụng
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-text-muted hover:text-primary transition-colors duration-300 block text-sm"
                  >
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="text-text-muted hover:text-primary transition-colors duration-300 block text-sm"
                  >
                    Chính sách cookie
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright & Payment */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} CineBooking. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
            <div className="w-10 h-6 bg-[#1F1F1F] rounded flex items-center justify-center border border-white/5 opacity-50 hover:opacity-100 transition-opacity">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <div className="w-10 h-6 bg-[#1F1F1F] rounded flex items-center justify-center border border-white/5 opacity-50 hover:opacity-100 transition-opacity">
              <Banknote className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
