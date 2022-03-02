interface ReviewResponse {
  review_id: string;
  review_text: string;
  review_likes?: number;
  rating?: number;
  review_comments?: number;
}

interface ReviewState {
  reviews: ReviewResult[];
  isEnd?: boolean;
}

interface GetReviewsResponse {
  reviews: ReviewResponse[];
  is_end?: boolean;
}

interface ReviewResult {
  id: string;
  text: string;
  likes?: number;
  rating?: number;
  comments?: number;
}
