interface BookResult {
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

interface Book {
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

interface SearchState {
  retrievalTime: number;
  books: Book[];
}

interface SearchApiResponse {
  retrieval_time: number;
  results: BookResult[];
}
