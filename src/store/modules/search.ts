import { callSearchApi } from "@/api/search";
import { Commit } from "vuex";

const state: SearchState = {
  totalTime: 0,
  retrievalTime: 0,
  books: [],
  correctedQuery: "",
};

const getters = {
  allBooks: (state: SearchState) => state.books,
  retrievalTime: (state: SearchState) => state.retrievalTime,
  totalTime: (state: SearchState) => state.totalTime,
  correctedQuery: (state: SearchState) => state.correctedQuery,
};

const actions = {
  async fetchBooks({ commit }: { commit: Commit }, query: string) {
    commit("clearBooks");

    const response = await callSearchApi(query);

    commit("setBooks", response.books);
    commit("setRetrievalTime", response.retrievalTime);
    commit("setTotalTime", response.totalTime);
    commit("setCorrectedQuery", response.correctedQuery);
  },
};

const mutations = {
  setBooks: (state: SearchState, books: Book[]) => (state.books = books),
  setRetrievalTime: (state: SearchState, time: number) =>
    (state.retrievalTime = time),
  setTotalTime: (state: SearchState, time: number) => (state.totalTime = time),
  setCorrectedQuery: (state: SearchState, query: string) =>
    (state.correctedQuery = query),
  clearBooks: (state: SearchState) => {
    state.books = [];
    state.retrievalTime = 0;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
