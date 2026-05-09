import { useEffect, useState } from "react";
import { Play, Info, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { movieApi } from "../../api/movie.api";
import LoadingSpinner from "../ui/LoadingSpinner";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
// Đảm bảo đã import đủ các file CSS cần thiết
import "swiper/css";
import "swiper/css/effect-fade";

const Hero = () => {
  const [hotMovies, setHotMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotMovies = async () => {
      try {
        const response = await movieApi.getHotMovies();
        const movies = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];
        setHotMovies(movies);
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotMovies();
  }, []);

  if (loading) return <LoadingSpinner size="lg" className="h-[70vh]" />;
  if (hotMovies.length === 0) return null;

  return (
    <section className="relative w-full h-[85vh] bg-background overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }} // QUAN TRỌNG: Giúp slide cũ mờ đi đồng thời slide mới hiện lên
        loop={true}
        speed={1000} // Tăng tốc độ chuyển cảnh cho mượt
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="h-full w-full"
      >
        {hotMovies.map((movie) => (
          <SwiperSlide key={movie.id} className="relative w-full h-full">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
              <img
                src={movie.posterUrl || movie.backdrop}
                alt={movie.title}
                className="w-full h-full object-cover object-top"
              />
              {/* Overlay tối ưu để text không bị "nuốt" bởi hình nền */}
              <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Content Layer - Đặt z-index cao hơn để không bị lồng */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">
              {/* Special Event Badge */}
              <div className="flex items-center gap-2 bg-secondary/20 border border-secondary px-3 py-1 rounded-full mb-6 animate-in fade-in slide-in-from-left-4">
                <Star className="w-4 h-4 text-secondary fill-secondary" />
                <span className="text-secondary text-xs font-bold uppercase tracking-widest">
                  Sự kiện đặc biệt
                </span>
              </div>

              {/* Title với hiệu ứng animation riêng biệt cho từng slide */}
              <h1 className="text-5xl md:text-7xl font-black text-text-main mb-4 tracking-tighter uppercase max-w-2xl drop-shadow-2xl animate-in fade-in slide-in-from-left-6 duration-700">
                {movie.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-medium animate-in fade-in slide-in-from-left-8 duration-700">
                <span className="badge-gold">T{movie.ageLimit || 13}</span>
                <span className="text-text-main/90">
                  {movie.genres?.join(", ") || "Hành động, Khoa học viễn tưởng"}
                </span>
                <span className="w-1 h-1 bg-text-muted rounded-full"></span>
                <span className="text-text-main/90 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" />
                  {movie.duration || "115"} phút
                </span>
              </div>

              {/* Description */}
              <p className="text-text-muted text-lg max-w-xl leading-relaxed mb-10 line-clamp-3 animate-in fade-in slide-in-from-left-10 duration-1000">
                {movie.description || "Cuộc chiến siêu kinh điển..."}
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <button
                  onClick={() => navigate(`/checkout/${movie.id}`)}
                  className="btn-primary flex items-center gap-2 py-3 px-8 text-lg"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Xem ngay
                </button>

                <button
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="btn-outline border-white/20 flex items-center gap-2 py-3 px-8 text-lg group bg-background/20 backdrop-blur-sm"
                >
                  <Info className="w-5 h-5 group-hover:text-primary transition-colors" />
                  Chi tiết
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
