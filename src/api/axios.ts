import axios from "axios";
import store from "@/store";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    {
      // console.info("*", config);
      store.dispatch("setLoading", true);
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
      store.dispatch("setLoading", false);
    }
    if (config.data?.error_message)
      store.dispatch("setError", config.data.error_message);
    return config;
  },
  (error) => {
    console.log(error);
    {
      store.dispatch("setLoading", false);
      store.dispatch("setError", "Network Error");
    }
    return Promise.reject(error);
  }
);

export default instance;
