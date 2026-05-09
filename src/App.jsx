import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import { Toaster } from "sonner";

// Pages
import HomePage from "./pages/home/HomePage";
import MovieListPage from "./pages/movie/MovieListPage";
import MovieDetailPage from "./pages/movie/MovieDetailPage";
import CinemaListPage from "./pages/cinema/CinemaListPage";
import CinemaDetailPage from "./pages/cinema/CinemaDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/profile/ProfilePage";
import MyBookingsPage from "./pages/profile/MyBookingsPage";
import CheckoutPage from "./pages/booking/CheckoutPage";
import PaymentPage from "./pages/payment/PaymentPage";
import TicketPage from "./pages/payment/TicketPage";
import ShowtimeListPage from "./pages/showtime/ShowtimeListPage";

function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MovieListPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/cinemas" element={<CinemaListPage />} />
          <Route path="/cinema/:id" element={<CinemaDetailPage />} />
          <Route path="/showtimes" element={<ShowtimeListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Private Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Booking flow */}
            <Route path="/checkout/:showtimeId" element={<CheckoutPage />} />
            <Route path="/payment/:bookingId" element={<PaymentPage />} />
            <Route path="/ticket/:bookingId" element={<TicketPage />} />

            {/* Profile & History */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="p-10 text-center">Trang không tồn tại</div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
