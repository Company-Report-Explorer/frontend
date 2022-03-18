import { callSearchApi } from "@/api/search";
import { Book, SearchState } from "@/models/search";
import { AdvancedSearchOptions } from "@/models/advancedSearch";
import { callBookMatchApi } from "@/api/bookMatch";
import { Commit } from "vuex";

const state: SearchState = {
  retrievalTime: 0,
  book: undefined,
  books: [],
  totalTime: 0,
  correctedQuery: "",
};

const getters = {
  allBooks: (state: SearchState) => state.books,
  retrievalTime: (state: SearchState) => state.retrievalTime,
  totalTime: (state: SearchState) => state.totalTime,
  correctedQuery: (state: SearchState) => state.correctedQuery,
  bookMatch: (state: SearchState) => state.book,
};

const actions = {
  async fetchBooks(
    { commit }: { commit: Commit },
    { query, options }: { query: string; options: AdvancedSearchOptions }
  ) {
    commit("clearBooks");

    const searchResponse = await callSearchApi(query, options);

    commit("setBooks", searchResponse.books);
    commit("setRetrievalTime", searchResponse.retrievalTime);
    commit("setTotalTime", searchResponse.totalTime);
    commit("setCorrectedQuery", searchResponse.correctedQuery);
  },
  async fetchBook({ commit }: { commit: Commit }, query: string) {
    const bookResponse = await callBookMatchApi(query);
    commit("setBook", bookResponse);
  },
};

const mutations = {
  setBook: (state: SearchState, book: Book) => (state.book = book),
  setBooks: (state: SearchState, books: Book[]) => (state.books = books),
  setRetrievalTime: (state: SearchState, time: number) =>
    (state.retrievalTime = time),
  setTotalTime: (state: SearchState, time: number) => (state.totalTime = time),
  setCorrectedQuery: (state: SearchState, query: string) =>
    (state.correctedQuery = query),
  clearBooks: (state: SearchState) => {
    state.book = undefined;
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
