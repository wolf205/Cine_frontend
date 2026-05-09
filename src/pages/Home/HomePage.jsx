import { useEffect, useState } from "react";
import Hero from "../../components/home/Hero";
import MovieList from "../../components/movie/MovieList";
import { movieApi } from "../../api/movie.api";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const HomePage = () => {
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Gọi song song các API để tối ưu tốc độ load
        const [nowShowingRes, upcomingRes] = await Promise.all([
          movieApi.getMovies({ status: "now_showing", limit: 5 }),
          movieApi.getMovies({ status: "coming_soon", limit: 5 }),
        ]);

        // Cập nhật state với dữ liệu từ backend
        // Lưu ý: Kiểm tra cấu trúc response của bạn, thông thường là res.data.data
        setNowShowingMovies(nowShowingRes.data.data || []);
        setUpcomingMovies(upcomingRes.data.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu trang chủ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero component bên trong đã có logic gọi movieApi.getHotMovies() */}
      <Hero />

      <div className="space-y-12 mt-10">
        {/* Danh sách phim Đang chiếu */}
        {nowShowingMovies.length > 0 && (
          <MovieList
            title="Phim Đang Chiếu"
            viewAllLink="/movies?status=now_showing"
            movies={nowShowingMovies}
          />
        )}

        {/* Danh sách phim Sắp chiếu */}
        {upcomingMovies.length > 0 && (
          <MovieList
            title="Phim Sắp Chiếu"
            viewAllLink="/movies?status=coming_soon"
            movies={upcomingMovies}
          />
        )}

        {/* Hiển thị thông báo nếu không có phim nào */}
        {!loading &&
          nowShowingMovies.length === 0 &&
          upcomingMovies.length === 0 && (
            <div className="text-center text-text-muted py-20">
              Hiện chưa có phim nào được công chiếu.
            </div>
          )}
      </div>
    </div>
  );
};

export default HomePage;
