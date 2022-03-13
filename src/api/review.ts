import axios from "./axios";

import { ReviewState, GetReviewsResponse } from "@/models/review";

export async function callReviewApi(
  bookId: string,
  offset: number,
  query: string
): Promise<ReviewState> {
  const response = await axios.get(
    `${process.env.VUE_APP_ROOT_API}/get-reviews?q=${query}&book_id=${bookId}&offset=${offset}`
  );

  return adapter(response.data);
}

function adapter(apiResponse: GetReviewsResponse): ReviewState {
  return {
    isEnd: apiResponse.is_end,
    reviews:
      apiResponse?.reviews.map((review) => ({
        id: review.review_id,
        text: review.review_text,
        rating: review.rating || 0,
        likes: review.review_likes || 0,
        comments: review.review_comments || 0,
      })) || [],
  };
}
