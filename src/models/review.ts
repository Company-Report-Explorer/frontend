interface ReviewResult {
  id: string;
  by: string;
  text: string;
  likes?: number;
}

interface ReviewState {
  reviews: ReviewResult[];
}

interface ReviewResponse {
  reviews?: ReviewResult[];
}
