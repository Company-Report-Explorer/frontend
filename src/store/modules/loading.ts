import { Commit } from "vuex";

const state: LoadingState = {
  isLoading: false,
};

const getters = {
  isLoading: (state: LoadingState) => state.isLoading,
};

const actions = {
  setLoading({ commit }: { commit: Commit }, loading: boolean) {
    if (loading) {
      commit("setLoading", loading);
      return;
    }
    setTimeout(() => {
      commit("setLoading", loading);
    }, 100);
  },
};

const mutations = {
  setLoading: (state: LoadingState, loading: boolean) =>
    (state.isLoading = loading),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
