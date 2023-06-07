import { toQueryString } from "../utils/index.js";

export const fetchMovie = async (restUrl, params = {}) => {
  const queryParams = toQueryString(params);

  const response = await fetch(`https://api.themoviedb.org/3/${restUrl}?${queryParams}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODZhZjcxNzY0MTVhYjk3MWU5YjRjZWFhOTA0NTY4YiIsInN1YiI6IjY0NzBhMDI4YzVhZGE1MDBhODJkZmMwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MW5UL8xFifiCQX7ozBfj0REWT4TL4S75oHk9Zki44-0"
    }
  }).then(response => response.json());

  return response;
};

export const getPopularMovieList = async () => {
  const { results: movieList } = await fetchMovie("movie/popular");

  return movieList;
};

export const getSearchMovieList = async query => {
  const { results: searchMovieList } = await fetchMovie(`search/movie`, { query });

  return searchMovieList;
};

export const getMovieDetail = async movieId => {
  const response = await fetchMovie(`movie/${movieId}`);

  return response;
};

export const getMoviePhotoList = async movieId => {
  const { backdrops: moviePhotoList } = await fetchMovie(`movie/${movieId}/images`);

  return moviePhotoList;
};
