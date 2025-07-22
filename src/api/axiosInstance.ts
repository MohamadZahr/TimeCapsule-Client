import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v0.1",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      const { token } = JSON.parse(user);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
