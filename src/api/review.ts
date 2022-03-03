import axios from "./axios";

export async function callReviewApi(
  bookId: string,
  offset: number,
  query: string
): Promise<ReviewState> {
  const response = await axios.get(
    `${process.env.VUE_APP_ROOT_API}/get-reviews?q=${query}&book_id=${bookId}&offset=${offset}`
  );

  console.log(bookId, offset, query, response.data);

  return adapter(response.data);

  // return adapter({
  //   reviews: new Array(10).fill({}).map(() => ({
  //     review_id: String(Math.floor(Math.random() * 1000000)),
  //     // by: String(Math.floor(Math.random() * 1000000)),
  //     review_text:
  //       "Lorem minim esse Lorem Lorem consectetur aute labore labore in ipsum eiusmod labore anim id. Ea eu cillum occaecat et commodo. Occaecat magna ut culpa aliqua enim adipisicing voluptate sint laborum. Non ipsum nisi labore Lorem pariatur pariatur mollit non aliquip commodo anim reprehenderit. Voluptate quis do non amet laboris laboris magna duis eiusmod. Incididunt proident irure consectetur eiusmod cupidatat.",
  //     review_likes: Math.floor(Math.random() * 500),
  //     rating: Math.floor(Math.random() * 500) / 100,
  //     review_comments: Math.floor(Math.random() * 500),
  //   })),
  //   is_end: false,
  // });
}

function adapter(apiResponse: GetReviewsResponse): ReviewState {
  return {
    isEnd: apiResponse.is_end,
    reviews:
      apiResponse?.reviews.map((review) => ({
        id: review.review_id,
        text: review.review_text,
        rating: review.rating || 0,
        likes: review.review_likes || 0,
        comments: review.review_comments || 0,
      })) || [],
    // isEnd: !!apiResponse?.is_end,
  };
}
