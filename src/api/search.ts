import axios from "axios";

export async function callSearchApi(query: string): Promise<SearchState> {
  const response = await axios.get(
    `${process.env.VUE_APP_ROOT_API}/search?q=${query}`
  );

  return adapter(response.data);
}

function adapter(apiResponse: SearchApiResponse): SearchState {
  return {
    retrievalTime: apiResponse.retrieval_time,
    books: apiResponse.results,
  };
}
