import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar luôn ở trên cùng */}
      <Navbar />

      {/* Nội dung chính của các trang sẽ nằm ở đây, flex-grow giúp đẩy footer xuống đáy */}
      <main className="grow">
        <Outlet />
      </main>

      {/* Footer luôn ở dưới cùng */}
      <Footer />
    </div>
  );
};

export default MainLayout;
