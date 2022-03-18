import { Commit } from "vuex";

import { AdvancedSearchOptions } from "@/models/advancedSearch";

const state: AdvancedSearchOptions = {
  ss: false,
  fromYear: 0,
  toYear: 0,
  rating: 0,
};

const getters = {
  getAdvancedOptions: (state: AdvancedSearchOptions) => state,
  getAdvancedOptionsReq: (state: AdvancedSearchOptions) => {
    const tempState = {
      ss: state.ss,
      from_year: state.fromYear,
      to_year: state.toYear,
      rating: state.rating,
    };
    return Object.fromEntries(Object.entries(tempState).filter((v) => v[1]));
  },
  isAdvancedOptionsOn: (state: AdvancedSearchOptions) =>
    state.ss || !!state.fromYear || !!state.toYear || !!state.rating,
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
    state.ss = options.ss;
    state.fromYear = options.fromYear;
    state.toYear = options.toYear;
    state.rating = options.rating;
  },
  clearAdvancedOptions: (state: AdvancedSearchOptions) => {
    state.ss = false;
    state.fromYear = 0;
    state.toYear = 0;
    state.rating = 0;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
