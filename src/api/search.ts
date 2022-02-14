import axios from "./axios";

export async function callSearchApi(query: string): Promise<SearchState> {
  const response = await axios.get(
    `${process.env.VUE_APP_ROOT_API}/search?q=${query}`
  );

  return adapter(response.data);
}

function adapter(apiResponse: SearchApiResponse): SearchState {
  return {
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
