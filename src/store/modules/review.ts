import { callReviewApi } from "@/api/review";
import { Commit } from "vuex";

const state: ReviewState = {
  reviews: [],
  isEnd: false,
};

const getters = {
  allReviews: (state: ReviewState) => state.reviews,
  isAllReviews: (state: ReviewState) => state.isEnd,
};

const actions = {
  async fetchReviews(
    { commit }: { commit: Commit },
    {
      bookId,
      query,
    }: {
      bookId: string;
      query: string;
    }
  ) {
    const response = await callReviewApi(bookId, 0, query);

    commit("setReviews", response.reviews);
    commit("setIsAllReviews", response.isEnd);
  },

  async lazyLoadReviews(
    { commit }: { commit: Commit },
    {
      bookId,
      offset,
      query,
    }: {
      bookId: string;
      offset: number;
      query: string;
    }
  ) {
    const response = await callReviewApi(bookId, offset, query);

    commit("lazyReviews", response.reviews);
    commit("setIsAllReviews", response.isEnd);
  },

  async clearReviews({ commit }: { commit: Commit }) {
    commit("clear");
  },
};

const mutations = {
  setReviews: (state: ReviewState, reviews: ReviewResult[]) =>
    (state.reviews = reviews),
  lazyReviews: (state: ReviewState, reviews: ReviewResult[]) =>
    state.reviews.push(...reviews),
  setIsAllReviews: (state: ReviewState, isEnd: boolean) =>
    (state.isEnd = isEnd),
  clear: (state: ReviewState) => (state.reviews = []),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
