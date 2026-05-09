import axios from "axios";
import useAuthStore from "../hooks/useAuth"; // Đảm bảo đường dẫn này trỏ đúng tới file store của bạn

// ==========================================
// 1. KHỞI TẠO AXIOS INSTANCE MẶC ĐỊNH
// ==========================================
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Cho phép gửi cookie lên server (nếu backend có dùng cookie)
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// 2. REQUEST INTERCEPTOR: XỬ LÝ TRƯỚC KHI GỬI API
// ==========================================
// Chức năng: Tự động nhét Token vào header của mọi API gửi đi
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token hiện tại đang lưu trong máy
    const token = localStorage.getItem("token");
    if (token) {
      // Nếu có token, gắn nó vào header dưới dạng Bearer Token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error), // Nếu có lỗi ở bước setup request thì báo lỗi
);

// ==========================================
// 3. CÁC BIẾN HỖ TRỢ CHO VIỆC LẤY LẠI TOKEN (REFRESH)
// ==========================================
// isRefreshing: Cờ đánh dấu xem có đang trong quá trình đi xin token mới hay không.
// Tránh việc 10 API cùng lỗi 401 thì đi xin token mới cả 10 lần (chỉ cần xin 1 lần thôi).
let isRefreshing = false;

// failedQueue: Hàng đợi chứa các API bị lỗi 401 trong lúc chờ token mới.
let failedQueue = [];

// Hàm xử lý hàng đợi: Khi có token mới, gọi lại tất cả API đang xếp hàng
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error); // Nếu lấy token thất bại, cho các API này chết luôn
    } else {
      prom.resolve(token); // Nếu có token mới, báo cho các API biết để chạy tiếp
    }
  });
  failedQueue = []; // Xóa rỗng hàng đợi sau khi xử lý xong
};

// ==========================================
// 4. RESPONSE INTERCEPTOR: XỬ LÝ KHI NHẬN KẾT QUẢ TỪ SERVER
// ==========================================
axiosInstance.interceptors.response.use(
  (response) => response, // KẾT QUẢ THÀNH CÔNG: Trả về data bình thường cho component dùng

  async (error) => {
    // KẾT QUẢ THẤT BẠI: Server trả về lỗi (ví dụ 400, 401, 403, 500...)
    const originalRequest = error.config; // Lưu lại cái request vừa bị lỗi để lát nữa gọi lại

    // Kiểm tra: Nếu lỗi là 401 (Hết hạn Token) VÀ request này chưa được retry lần nào
    if (error.response?.status === 401 && !originalRequest._retry) {
      // TRƯỜNG HỢP 1: ĐANG CÓ MỘT API KHÁC ĐI XIN TOKEN RỒI
      if (isRefreshing) {
        // Đưa API hiện tại vào hàng đợi (Queue) để ngủ đông, chờ token mới
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // Khi thức dậy (đã có token mới), thay token mới vào header và chạy lại
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // TRƯỜNG HỢP 2: CHƯA AI ĐI XIN TOKEN MỚI
      originalRequest._retry = true; // Đánh dấu là "tao đang đi xin token đây, đừng bắt tao xin lại nữa"
      isRefreshing = true; // Bật cờ lên để các API khác biết mà chui vào Queue

      try {
        // Lấy thông tin từ Zustand Store
        const { refreshToken, user, login } = useAuthStore.getState();

        // Nếu trong máy không có Refresh Token (chưa đăng nhập hoặc bị xóa mất) -> Chịu thua
        if (!refreshToken) {
          throw new Error("Không có Refresh Token");
        }

        // BƯỚC QUAN TRỌNG: Gọi API xin token mới
        // Dùng 'axios.post' mặc định thay vì 'axiosInstance' để tránh việc nếu API này cũng lỗi 401 thì bị lặp vô hạn
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken: refreshToken }, // Gửi Refresh token cũ lên
          { withCredentials: true },
        );

        // Lấy Token mới từ kết quả trả về (theo đúng format backend của bạn)
        const newToken = response.data.data.accessToken;

        // Backend của bạn không trả về Refresh Token mới, nên ta giữ lại cái cũ
        const currentRefreshToken = refreshToken;

        // Cập nhật Token mới vào Zustand Store (hàm login của bạn sẽ tự lưu luôn vào localStorage)
        login(user, newToken, currentRefreshToken);

        // Đánh thức các API đang nằm trong Queue dậy và phát Token mới cho tụi nó
        processQueue(null, newToken);

        // Cuối cùng: Chạy lại cái API đầu tiên vừa bị lỗi 401 ở trên cùng
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // NẾU VIỆC XIN TOKEN MỚI CŨNG THẤT BẠI (Do Refresh Token cũng hết hạn nốt)

        processQueue(refreshError, null); // Hủy toàn bộ hàng đợi

        // Gọi hàm logout trong Zustand để xóa sạch data trong localStorage
        useAuthStore.getState().logout();

        // Đá người dùng văng ra trang Login
        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        // Dù xin token thành công hay thất bại, cũng phải tắt cờ này đi để reset trạng thái
        isRefreshing = false;
      }
    }

    // Nếu là các lỗi khác (không phải 401), cứ ném lỗi ra ngoài cho component tự xử lý (hiển thị thông báo, toast...)
    return Promise.reject(error);
  },
);

export default axiosInstance;
