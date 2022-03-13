import axios from "./axios";

import { SearchState, SearchApiResponse } from "@/models/search";
import { AdvancedSearchOptions } from "@/models/advancedSearch";

export async function callSearchApi(
  query: string,
  advSearch: AdvancedSearchOptions
): Promise<SearchState> {
  const start = new Date().getTime();

  const queryParams = new URLSearchParams({
    q: query,
    ...Object.fromEntries(
      Object.entries(advSearch).map((v) => [v[0], String(v[1])])
    ),
  });

  const response = await axios.get(
    `${process.env.VUE_APP_ROOT_API}/search?${queryParams.toString()}`
  );

  const end = new Date().getTime();

  return adapter(response.data, (end - start) / 1000);
}

function adapter(
  apiResponse: SearchApiResponse,
  totalTime: number
): SearchState {
  return {
    correctedQuery: apiResponse?.corrected_query,
    totalTime,
    retrievalTime: apiResponse?.retrieval_time || 0,
    books: apiResponse?.results.map((book) => ({
      id: book.book_id,
      title: book.book_title,
      author: book.author,
      isbn: book?.isbn,
      rating: book?.average_rating,
      imageUrl: book?.image_url,
      url: book?.url,
      publicationYear: book?.publication_year,
      description: book?.description,
      textReviewsCount: book?.text_reviews_count,
    })),
  };
}
