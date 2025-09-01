import axios from "axios";
    import { useAuthStore } from "../store/auth";

    const api = axios.create({
      baseURL: "https://note-app-backend-pgqm.onrender.com",
    });

    api.interceptors.request.use((config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    export default api;
    
