import { getPopularMovieList, getSearchMovieList } from "../apis/movie.js";
import { navigate } from "../routes.js";
import { Page } from "./Page.js";

export class HomePage extends Page {
  constructor() {
    super(`
        <ul class="movie-list"></ul>
    `);
  }

  renderMovieList = movieList => {
    const movieListElement = document.querySelector(".movie-list");

    movieListElement.innerHTML = movieList.reduce((newMovieList, movieItem) => {
      const { id, poster_path, title, overview, vote_average } = movieItem;

      return (newMovieList += `
            <li id="${id}" class="movie-item">
                <img class="movie-poster" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title} 포스터" />
                <h2 class="movie-title">${title}</h2>
                <p class="movie-desc">${overview}</p>
                <p class="movie-rating">Rating : ${vote_average}</p>
            </li>
          `);
    }, "");
  };

  async onRender() {
    const popularMovieList = await getPopularMovieList();
    this.renderMovieList(popularMovieList);
  }

  onFinally() {
    const searchForm = document.querySelector(".search-form");
    searchForm.addEventListener("submit", async event => {
      event.preventDefault();

      const searchInput = document.querySelector(".search-box");
      const searchKeyword = searchInput.value;

      const searchMovieList = await getSearchMovieList(searchKeyword);

      if (searchMovieList.length > 0) {
        navigate("/", true);

        this.renderMovieList(searchMovieList);
      } else {
        alert("검색된 결과가 없습니다.");
      }
    });

    const movieList = document.querySelector(".movie-list");
    movieList.addEventListener("click", ({ target }) => {
      if (target === movieList) return;

      const _id = target.matches(".movie-item") ? target.id : target.parentNode.id;

      navigate(`/detail?id=${_id}`);
    });
  }
}
