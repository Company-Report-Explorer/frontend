import { Commit } from "vuex";

const state: ErrorState = {
  isShown: false,
  detail: "",
};

const getters = {
  isErrorShown: (state: ErrorState) => state.isShown,
  errorDetail: (state: ErrorState) => state.detail,
};

const actions = {
  setError({ commit }: { commit: Commit }, detail: string) {
    commit("set", detail);
  },
  clearError({ commit }: { commit: Commit }) {
    commit("clear");
  },
};

const mutations = {
  set: (state: ErrorState, detail: string) => {
    state.isShown = true;
    state.detail = detail;
  },
  clear: (state: ErrorState) => {
    state.isShown = false;
    state.detail = "";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
