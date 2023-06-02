import { loadMovie, searchMovie } from "./movie.js";

loadMovie();

const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", event => {
  event.preventDefault();

  searchMovie();
});
