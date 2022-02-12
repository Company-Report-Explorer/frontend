interface BookResult {
  title: string;
  author: string;
  date: string;
}

interface SearchState {
  retrievalTime: number;
  books: BookResult[];
}

interface SearchApiResponse {
  retrieval_time: number;
  results: BookResult[];
}
