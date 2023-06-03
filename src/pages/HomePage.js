import { loadMovie, searchMovie } from "../movie.js";
import { navigate } from "../routes.js";
import { Page } from "./Page.js";

export class HomePage extends Page {
  constructor() {
    super(`
      <main>
        <ul class="movie-list"></ul>
      </main>
    `);
  }

  onRender() {
    loadMovie();
  }

  onFinally() {
    const searchForm = document.querySelector(".search-form");
    searchForm.addEventListener("submit", event => {
      event.preventDefault();

      searchMovie();
    });

    const movieList = document.querySelector(".movie-list");
    movieList.addEventListener("click", ({ target }) => {
      if (target === movieList) return;

      const _id = target.matches(".movie-item") ? target.id : target.parentNode.id;

      navigate(`/detail?id=${_id}`);
    });
  }
}
