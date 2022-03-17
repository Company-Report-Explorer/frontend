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

  // const response = await axios.get(
  //   `${process.env.VUE_APP_ROOT_API}/search?${queryParams.toString()}`
  // );

  const end = new Date().getTime();

  // return adapter(response.data, (end - start) / 1000);
  return adapter(
    {
      retrieval_time: 1,
      corrected_query: "",
      results: [
        {
          book_id: "1",
          book_title: "123456789",
          author: "123456789",
          text_reviews_count: 300,
          isbn: "123456789",
          image_url: "f",
          publication_year: 2022,
          description:
            "Consequat eu pariatur enim amet Lorem sint reprehenderit ullamco incididunt exercitation enim duis fugiat aliquip. Eiusmod minim magna occaecat Lorem reprehenderit mollit minim. Enim pariatur consequat mollit amet. Pariatur ea cillum ad adipisicing tempor do ad aute quis eu incididunt esse ut deserunt.",
        },
      ],
    },
    (end - start) / 1000
  );
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
      author: book.author || "No Author Found",
      isbn: book.isbn || "No ISBN Found",
      rating: book.average_rating || 0,
      imageUrl: book.image_url || "",
      url: book.url || "",
      publicationYear: book.publication_year || undefined,
      description: book.description || "No Description.",
      textReviewsCount: book.text_reviews_count || 0,
    })),
  };
}
