import { callSearchApi } from "@/api/search";
import { Commit } from "vuex";

const state: SearchState = {
  retrievalTime: 0,
  books: [],
};

const getters = {
  allBooks: (state: SearchState) => state.books,
  retrievalTime: (state: SearchState) => state.retrievalTime,
};

const actions = {
  async fetchBooks({ commit }: { commit: Commit }, query: string) {
    const response = await callSearchApi(query);

    commit("setBooks", response.books);
    commit("setRetrievalTime", response.retrievalTime);
  },
};

const mutations = {
  setBooks: (state: SearchState, books: BookResult[]) => (state.books = books),
  setRetrievalTime: (state: SearchState, time: number) =>
    (state.retrievalTime = time),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
