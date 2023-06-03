import { loadMovie, searchMovie } from "../movie.js";
import { Page } from "./Page.js";

export class HomePage extends Page {
  constructor() {
    super(`
      <main>
        <ul class="movie-list"></ul>
      </main>
    `);

    const searchForm = document.querySelector(".search-form");
    searchForm.addEventListener("submit", event => {
      event.preventDefault();

      searchMovie();
    });
  }

  fetchData() {
    loadMovie();
  }
}
