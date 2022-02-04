import Vuex from "vuex";
import Vue from "vue";
import search from "./modules/search";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    search,
  },
});
