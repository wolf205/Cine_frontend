import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import { Toaster } from "sonner";

// Import Pages
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import MovieDetailPage from "./pages/Movie/MovieDetailPage";
import SeatMapPage from "./pages/Movie/SeatMapPage";
import PaymentPage from "./pages/Payment/PaymentPage";
import PaymentResultPage from "./pages/Payment/PaymentResultPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import BookingHistoryPage from "./pages/Booking/BookingHistoryPage";
import BookingDetailPage from "./pages/Booking/BookingDetailPage";

function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />

          {/* Private Routes (Yêu cầu đăng nhập) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/booking/:showtimeId" element={<SeatMapPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment/result" element={<PaymentResultPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/booking-history" element={<BookingHistoryPage />} />
            <Route path="/booking/:id" element={<BookingDetailPage />} />
          </Route>

          {/* 404 Route - Optional */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
