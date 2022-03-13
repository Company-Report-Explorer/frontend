import { Commit } from "vuex";

import { AdvancedSearchOptions } from "@/models/advancedSearch";

const state: AdvancedSearchOptions = {
  qe: false,
  ss: false,
  fromYear: "",
  toYear: "",
  rating: 0,
};

const getters = {
  getAdvancedOptions: (state: AdvancedSearchOptions) => state,
  isAdvancedOptionsOn: (state: AdvancedSearchOptions) =>
    state.qe ||
    state.ss ||
    !!state.fromYear ||
    !!state.toYear ||
    !!state.rating,
};

const actions = {
  setAdvancedOptions(
    { commit }: { commit: Commit },
    options: AdvancedSearchOptions
  ) {
    commit("setAdvancedOptions", options);
  },
  clearAdvancedOptions({ commit }: { commit: Commit }) {
    commit("clearAdvancedOptions");
  },
};

const mutations = {
  setAdvancedOptions: (
    state: AdvancedSearchOptions,
    options: AdvancedSearchOptions
  ) => {
    state.qe = options.qe;
    state.ss = options.ss;
    state.fromYear = options.fromYear;
    state.toYear = options.toYear;
    state.rating = options.rating;
  },
  clearAdvancedOptions: (state: AdvancedSearchOptions) => {
    state.qe = false;
    state.ss = false;
    state.fromYear = "";
    state.toYear = "";
    state.rating = 0;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
