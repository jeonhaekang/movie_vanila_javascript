import { getDetailMovie } from "../apis/movie.js";
import { Page } from "./Page.js";

export class DetailPage extends Page {
  constructor() {
    super(`
        <div>디테일페이지</div>
    `);
  }

  onFinally() {
    const params = new URLSearchParams(location.search);

    const movieId = params.get("id");

    getDetailMovie(movieId);
  }
}
