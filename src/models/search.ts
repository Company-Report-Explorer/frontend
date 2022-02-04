interface bookResult {
  title: string;
  author: string;
  date: string;
}

interface SearchState {
  retrievalTime: number;
  books: bookResult[];
}

interface SearchApiResponse {
  retrieval_time: number;
  results: bookResult[];
}
