import axios from "./axios";

import { Book, BookResult } from "@/models/search";

export async function callBookMatchApi(query: string): Promise<Book> {
  // const response = await axios.get(
  //   `${process.env.VUE_APP_ROOT_API}/book-match?q=${query}`
  // );
  // return adaptor(response.data);
  return adaptor({
    book_id: "1",
    book_title: "123456789",
    author: "123456789",
    text_reviews_count: 300,
    image_url: "f",
    description:
      "Consequat eu pariatur enim amet Lorem sint reprehenderit ullamco incididunt exercitation enim duis fugiat aliquip. Eiusmod minim magna occaecat Lorem reprehenderit mollit minim. Enim pariatur consequat mollit amet. Pariatur ea cillum ad adipisicing tempor do ad aute quis eu incididunt esse ut deserunt.",
  });
}

function adaptor(apiResponse: BookResult): Book {
  return {
    id: apiResponse.book_id || "",
    title: apiResponse.book_title || "",
    author: apiResponse.author || "No author found",
    isbn: apiResponse.isbn || "-",
    rating: apiResponse.average_rating || 0,
    imageUrl: apiResponse.image_url || "",
    url: apiResponse.url || "",
    publicationYear: apiResponse.publication_year || undefined,
    description: apiResponse.description || "No Description.",
    textReviewsCount: apiResponse.text_reviews_count || 0,
  };
}
