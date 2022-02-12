import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    {
      console.info("*", config);
    }
    return config;
  },
  (error) => {
    {
      console.error("*", error);
    }
    return Promise.reject(error);
  }
);

export default instance;
