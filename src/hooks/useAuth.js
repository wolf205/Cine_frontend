import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null, // Thêm dòng này
  refreshToken: localStorage.getItem("refreshToken") || null, // Thêm dòng này
  isAuthenticated: !!localStorage.getItem("token"),

  login: (userData, token, refreshToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    // Cập nhật cả token vào state
    set({
      user: userData,
      token: token,
      refreshToken: refreshToken,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    set({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;
