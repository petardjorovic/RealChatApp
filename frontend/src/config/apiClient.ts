import axios, { AxiosError, type AxiosInstance } from "axios";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const API: AxiosInstance = axios.create(options);

API.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;

      if (typeof data === "object" && data !== null) {
        return Promise.reject({ status, ...(data as object) });
      }

      return Promise.reject({ status, message: String(data) });
    }

    // Ako nema response (npr. mrežni error)
    return Promise.reject({ status: 0, message: "Network error" });
  }
);

export default API;
