import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4">
        HomePage
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
