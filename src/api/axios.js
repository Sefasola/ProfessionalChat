// axios.js (src/api/axios.js)
import axios from "axios";

// Axios yapılandırması
const instance = axios.create({
  baseURL: "http://localhost:5000", // Backend URL'i
});

// Tüm isteklere Authorization başlığını ekle
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
