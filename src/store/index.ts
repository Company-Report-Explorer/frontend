import Vuex from "vuex";
import Vue from "vue";
import search from "./modules/search";
import review from "./modules/review";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    search,
    review,
  },
});
