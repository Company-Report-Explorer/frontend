import { Commit } from "vuex";

import { LoadingState } from "@/models/error";

const state: LoadingState = {
  loadingCound: 0,
};

const getters = {
  isLoading: (state: LoadingState) => state.loadingCound != 0,
};

const actions = {
  setLoading({ commit }: { commit: Commit }, loading: boolean) {
    if (loading) {
      commit("pushLoading");
      return;
    }
    setTimeout(() => {
      commit("popLoading");
    }, 100);
  },
};

const mutations = {
  pushLoading: (state: LoadingState) => (state.loadingCound += 1),
  popLoading: (state: LoadingState) => (state.loadingCound -= 1),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
