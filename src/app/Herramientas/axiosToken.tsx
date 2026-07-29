import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_LOCALHOST}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar access token a cada petición
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Renovar access token automáticamente
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

        const refreshToken = localStorage.getItem("refreshToken");

        const response = await axios.post(
          "http://localhost:4000/refresh-token",
          {
            refresh_token: refreshToken,
          }
        );

        const newAccessToken = response.data.access_token;

        // Guardar nuevo token
        localStorage.setItem("authToken", newAccessToken);

        // Actualizar encabezados
        axiosInstance.defaults.headers.common.Authorization =
          `Bearer ${newAccessToken}`;

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        // Reintentar la petición original
        return axiosInstance(originalRequest);

      } catch (refreshError) {

        // Si también expiró el refresh token
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");

        // Redireccionar al login
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;