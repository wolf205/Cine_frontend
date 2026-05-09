import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  // Nếu API chưa kịp load hoặc không có data thì return null
  if (!movie) return null;

  // Lấy dữ liệu thực từ object movie trả về từ API
  const {
    id,
    title,
    posterUrl,
    backdrop, // Dùng làm fallback nếu không có posterUrl
    ageLimit,
    genres,
    status,
  } = movie;

  // 1. Xử lý ảnh mặc định nếu API không trả về ảnh
  const defaultImage = "https://via.placeholder.com/300x450?text=No+Image";
  const displayImage = posterUrl || backdrop || defaultImage;

  // 2. Xử lý text trạng thái (Backend thường trả Enum tiếng Anh, ta map sang tiếng Việt)
  const getStatusText = (status) => {
    if (!status) return "ĐANG CẬP NHẬT";
    switch (status.toUpperCase()) {
      case "NOW_SHOWING":
        return "ĐANG CHIẾU";
      case "UP_COMING":
      case "UPCOMING":
        return "SẮP CHIẾU";
      default:
        return status; // Trả về nguyên bản nếu API đã lưu tiếng Việt
    }
  };

  // 3. Xử lý độ tuổi (Backend có thể trả về số "16", ta thêm chữ "T" thành "T16")
  const formatAgeLimit = (age) => {
    if (!age) return null;
    const ageStr = String(age).toUpperCase();
    if (ageStr.startsWith("T") || ageStr === "P" || ageStr === "K") {
      return ageStr;
    }
    return `T${ageStr}`;
  };

  return (
    <Link to={`/movie/${id}`} className="block h-full">
      {/* Sử dụng class .movie-card đã định nghĩa trong index.css */}
      <div className="movie-card group cursor-pointer h-full flex flex-col">
        {/* Container Hình ảnh & Badges */}
        <div className="relative aspect-[2/3] overflow-hidden bg-background-light">
          <img
            src={displayImage}
            alt={title || "Movie Poster"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy" // Tối ưu load ảnh
          />
          {/* Overlay gradient mờ khi hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background-card/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Badge Trạng thái (Góc trái) */}
          <div className="absolute top-2 left-2 bg-primary text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded shadow-md uppercase">
            {getStatusText(status)}
          </div>

          {/* Badge Độ tuổi (Góc phải) */}
          {ageLimit && (
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm border border-white/20 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded">
              {formatAgeLimit(ageLimit)}
            </div>
          )}
        </div>

        {/* Thông tin phim */}
        <div className="p-4 flex-grow bg-background-card flex flex-col justify-start">
          <h3
            className="text-text-main font-bold text-base sm:text-lg line-clamp-1 group-hover:text-primary transition-colors"
            title={title}
          >
            {title || "Đang cập nhật..."}
          </h3>

          <p
            className="text-text-muted text-[11px] sm:text-xs mt-1.5 line-clamp-1 uppercase tracking-wider font-medium"
            title={Array.isArray(genres) ? genres.join(", ") : genres}
          >
            {Array.isArray(genres)
              ? genres.join(", ")
              : genres || "Đang cập nhật"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
