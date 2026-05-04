import axios from "./axios";

export const authApi = {
  register: (data) => axios.post("/auth/signUp", data),
  login: (data) => axios.post("/auth/signIn", data),
};
