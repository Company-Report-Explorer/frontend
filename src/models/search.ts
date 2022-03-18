export interface BookResult {
  book_id: string;
  book_title: string;
  author: string;
  isbn?: string;
  average_rating?: number;
  image_url?: string;
  url?: string;
  publication_year?: number;
  description?: string;
  text_reviews_count?: number;
}

export interface Book {
  id: string;
  title: string;
  author?: string;
  isbn?: string;
  rating?: number;
  imageUrl?: string;
  url?: string;
  publicationYear?: number;
  description?: string;
  textReviewsCount?: number;
}

export interface SearchState {
  retrievalTime: number;
  totalTime: number;
  book?: Book;
  books: Book[];
  correctedQuery: string;
}

export interface SearchApiResponse {
  retrieval_time: number;
  results: BookResult[];
  corrected_query: string;
}

export interface BookMatchApiResponse {
  retrieval_time: number;
  result: BookResult;
}
