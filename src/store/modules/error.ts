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
    commit("setError", detail);
  },
  clearError({ commit }: { commit: Commit }) {
    commit("clearError");
  },
};

const mutations = {
  setError: (state: ErrorState, detail: string) => {
    state.isShown = true;
    state.detail = detail;
  },
  clearError: (state: ErrorState) => {
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
