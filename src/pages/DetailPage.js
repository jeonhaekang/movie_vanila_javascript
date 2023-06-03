import { getDetailMovie } from "../apis/movie.js";
import { Page } from "./Page.js";

export class DetailPage extends Page {
  constructor() {
    super(`
        <main>
          <div>디테일페이지</div>
        </main>
    `);
  }

  onFinally() {
    const params = new URLSearchParams(location.search);

    const movieId = params.get("id");

    getDetailMovie(movieId);
  }
}
