import { Commit } from "vuex";

import { LoadingState } from "@/models/error";

const state: LoadingState = {
  isLoading: [],
};

const getters = {
  isLoading: (state: LoadingState) => state.isLoading.length != 0,
};

const actions = {
  setLoading({ commit }: { commit: Commit }, loading: boolean) {
    if (loading) {
      commit("pushLoading", loading);
      return;
    }
    setTimeout(() => {
      commit("popLoading");
    }, 100);
  },
};

const mutations = {
  pushLoading: (state: LoadingState, loading: boolean) =>
    state.isLoading.push(loading),
  popLoading: (state: LoadingState) => state.isLoading.pop(),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
