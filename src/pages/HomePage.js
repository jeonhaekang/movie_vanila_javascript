import { getPopularMovieList, getSearchMovieList } from "../apis/movie.js";
import { navigate } from "../routes.js";
import { Page } from "./Page.js";

export class HomePage extends Page {
  constructor() {
    super(`
        <form class="search-form">
          <input class="search-box" />
          <button>검색</button>
        </form>

        <main>
          <ul class="movie-list"></ul>
        </main>
    `);
  }

  renderMovieList(movieList) {
    const movieListElement = document.querySelector(".movie-list");

    movieListElement.innerHTML = movieList.reduce((newMovieList, movieItem) => {
      const { id, poster_path, title, overview, vote_average } = movieItem;

      return (newMovieList += `
            <li id="${id}" class="movie-item">
                <figure class="movie-poster-box">
                  <img class="movie-poster" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title} 포스터" />
                </figure>
                
                <h2 class="movie-title small bold">${title}</h2>
                <p class="movie-desc tiny">${overview}</p>
                <p class="movie-rating tiny">평점 : ${vote_average}</p>
            </li>
          `);
    }, "");
  }

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
        this.renderMovieList(searchMovieList);
      } else {
        alert("검색된 결과가 없습니다.");
      }
    });

    const movieList = document.querySelector(".movie-list");
    movieList.addEventListener("click", ({ target }) => {
      const movieItem = target.closest("li");

      movieItem && navigate(`/detail?movieId=${movieItem.id}`);
    });
  }
}
