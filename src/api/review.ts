import axios from "./axios";

export async function callReviewApi(
  bookID: string,
  offset: number,
  query: string
): Promise<ReviewState> {
  // const response = await axios.get(
  //   `${process.env.VUE_APP_ROOT_API}/search?q=${query}`
  // );

  // return adapter(response.data);

  // console.log(bookID, offset, query);

  return adapter({
    reviews: new Array(10).fill({}).map(() => ({
      id: String(Math.floor(Math.random() * 1000000)),
      by: String(Math.floor(Math.random() * 1000000)),
      text: "Lorem minim esse Lorem Lorem consectetur aute labore labore in ipsum eiusmod labore anim id. Ea eu cillum occaecat et commodo. Occaecat magna ut culpa aliqua enim adipisicing voluptate sint laborum. Non ipsum nisi labore Lorem pariatur pariatur mollit non aliquip commodo anim reprehenderit. Voluptate quis do non amet laboris laboris magna duis eiusmod. Incididunt proident irure consectetur eiusmod cupidatat.",
      likes: Math.floor(Math.random() * 500),
    })),
    is_end: false,
  });
}

function adapter(apiResponse: ReviewResponse): ReviewState {
  return {
    reviews: apiResponse?.reviews || [],
    // isEnd: !!apiResponse?.is_end,
  };
}
