import { Link } from "react-router-dom";
import { Ticket } from "lucide-react";
import MovieCard from "./MovieCard";

const MovieList = ({
  title = "Đang chiếu",
  viewAllLink = "/movies",
  movies = [],
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Phần Tiêu đề & Nút Xem tất cả */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Icon vé xem phim màu đỏ */}
          <Ticket className="w-6 h-6 text-primary" />
          <h2 className="text-xl sm:text-2xl font-bold text-text-main">
            {title}
          </h2>
        </div>

        <Link
          to={viewAllLink}
          className="text-secondary hover:text-white transition-colors text-sm font-semibold flex items-center gap-1"
        >
          Xem tất cả &gt;
        </Link>
      </div>

      {/* Grid Layout hiển thị danh sách phim */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id || index} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
