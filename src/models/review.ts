interface ReviewResult {
  id: string;
  by: string;
  text: string;
  likes?: number;
}

interface ReviewState {
  reviews: ReviewResult[];
  isEnd?: boolean;
}

interface ReviewResponse {
  reviews?: ReviewResult[];
  is_end?: boolean;
}
