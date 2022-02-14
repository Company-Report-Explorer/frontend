import axios from "axios";
import store from "@/store";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    {
      // console.info("*", config);
    }
    return config;
  },
  (error) => {
    {
      store.dispatch("setError", "Request Error");
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    {
      // console.info("*", config);
    }
    return config;
  },
  (error) => {
    {
      store.dispatch("setError", "Network Error");
    }
    return Promise.reject(error);
  }
);

export default instance;
