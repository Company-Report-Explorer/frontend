import axios from "./axios";

import { Book, BookMatchApiResponse } from "@/models/search";

export async function callBookMatchApi(query: string): Promise<Book> {
  const response = await axios.get(
    `${process.env.VUE_APP_ROOT_API}/book-match?q=${query}`
  );
  return adaptor(response.data);
  // return adaptor({
  //   book_id: "1",
  //   book_title: "123456789",
  //   author: "123456789",
  //   text_reviews_count: 300,
  //   image_url: "f",
  //   description:
  //     "Consequat eu pariatur enim amet Lorem sint reprehenderit ullamco incididunt exercitation enim duis fugiat aliquip. Eiusmod minim magna occaecat Lorem reprehenderit mollit minim. Enim pariatur consequat mollit amet. Pariatur ea cillum ad adipisicing tempor do ad aute quis eu incididunt esse ut deserunt.",
  // });
}

function adaptor(apiResponse: BookMatchApiResponse): Book {
  return {
    id: apiResponse.result.book_id || "",
    title: apiResponse.result.book_title || "",
    author: apiResponse.result.author || "No author found",
    isbn: apiResponse.result.isbn || "-",
    rating: apiResponse.result.average_rating || 0,
    imageUrl: apiResponse.result.image_url || "",
    url: apiResponse.result.url || "",
    publicationYear: apiResponse.result.publication_year || undefined,
    description: apiResponse.result.description || "No Description.",
    textReviewsCount: apiResponse.result.text_reviews_count || 0,
  };
}
