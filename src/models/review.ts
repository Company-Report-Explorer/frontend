export interface ReviewResponse {
  review_id: string;
  review_text: string;
  review_likes?: number;
  rating?: number;
  review_comments?: number;
}

export interface ReviewState {
  reviews: ReviewResult[];
  isEnd?: boolean;
}

export interface GetReviewsResponse {
  reviews: ReviewResponse[];
  is_end?: boolean;
}

export interface ReviewResult {
  id: string;
  text: string;
  likes?: number;
  rating?: number;
  comments?: number;
}
