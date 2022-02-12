import { callReviewApi } from "@/api/review";
import { Commit } from "vuex";

const state: ReviewState = {
  reviews: [],
};

const getters = {
  allReviews: (state: ReviewState) => state.reviews,
};

const actions = {
  async fetchReviews({ commit }: { commit: Commit }, book: string) {
    const response = await callReviewApi(book);

    commit("setReviews", response.reviews);
  },

  async lazyLoadReviews({ commit }: { commit: Commit }, book: string) {
    const response = await callReviewApi(book);

    commit("lazyReviews", response.reviews);
  },
};

const mutations = {
  setReviews: (state: ReviewState, reviews: ReviewResult[]) =>
    (state.reviews = reviews),
  lazyReviews: (state: ReviewState, reviews: ReviewResult[]) =>
    state.reviews.push(...reviews),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
