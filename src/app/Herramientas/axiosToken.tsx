import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_LOCALHOST}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Renovar access token automáticamente usando la cookie refreshToken
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {

        // El backend rota las cookies usando la cookie refreshToken
        await axios.post(
          `${process.env.NEXT_PUBLIC_LOCALHOST}refresh-token`,
          null,
          { withCredentials: true }
        );

        // Reintentar la petición original (la cookie accessToken ya se renovó)
        return axiosInstance(originalRequest);

      } catch (refreshError) {

        // Si también expiró el refresh token
        localStorage.removeItem("authToken");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("idUsuario");

        // Redireccionar al login
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
