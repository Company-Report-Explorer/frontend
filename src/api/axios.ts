import axios from "axios";
import store from "@/store";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    store.dispatch("setLoading", true);
    return config;
  },
  (error) => {
    store.dispatch("setError", "Request Error");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    store.dispatch("setLoading", false);
    if (config.data?.error_message)
      store.dispatch("setError", config.data.error_message);
    return config;
  },
  (error) => {
    store.dispatch("setLoading", false);
    if (error.response?.status) {
      console.log(error.response);
      store.dispatch("setError", error.response.data);
    } else {
      store.dispatch(
        "setError",
        "Server is currently closed. Please contact us to reopen the server"
      );
    }
    return Promise.reject(error);
  }
);

export default instance;
