import axios from "./axios";

export const movieApi = {
  /**
   * Lấy danh sách phim (Public)
   * @param {Object} params - Các bộ lọc và phân trang
   * @param {string} params.genre - Lọc theo thể loại
   * @param {string} params.status - Lọc theo trạng thái (vd: "ĐANG CHIẾU", "SẮP CHIẾU")
   * @param {number} params.page - Trang hiện tại
   * @param {number} params.limit - Số lượng phim trên mỗi trang
   */
  getMovies: (params) => axios.get("/movies", { params }),

  /**
   * Lấy danh sách phim hot (Public)
   * Top phim tính theo lượt đặt vé 1-7 ngày gần nhất
   */
  getHotMovies: () => axios.get("/movies/hot"),

  /**
   * Lấy thông tin chi tiết của một bộ phim (Public)
   * @param {string|number} id - ID của phim
   */
  getMovieDetails: (id) => axios.get(`/movies/${id}`),

  /**
   * Thêm phim mới (Yêu cầu quyền Admin)
   * @param {Object} data - Dữ liệu phim mới
   */
  createMovie: (data) => axios.post("/movies", data),

  /**
   * Cập nhật thông tin phim (Yêu cầu quyền Admin)
   * Partial update
   * @param {string|number} id - ID của phim cần cập nhật
   * @param {Object} data - Các trường dữ liệu cần thay đổi
   */
  updateMovie: (id, data) => axios.patch(`/movies/${id}`, data),

  /**
   * Xóa phim (Yêu cầu quyền Admin)
   * @param {string|number} id - ID của phim cần xóa
   */
  deleteMovie: (id) => axios.delete(`/movies/${id}`),
};
