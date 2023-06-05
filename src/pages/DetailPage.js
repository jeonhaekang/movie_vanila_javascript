import { getDetailMovie } from "../apis/movie.js";
import { IMAGE_BASE_URL } from "../constants.js";
import { Page } from "./Page.js";

export class DetailPage extends Page {
  constructor() {
    super(`
      <div class="detail-container">
        <main class="detail"></main>
      </div>
    `);
  }

  async onFinally() {
    const params = new URLSearchParams(location.search);

    const movieId = params.get("movieId");
    const movieInfo = await getDetailMovie(movieId);

    const { poster_path } = movieInfo;

    const detailInfo = document.querySelector(".detail");
    detailInfo.innerHTML = `
      <div class="detail-poster">
        <figure style="background-image: url(${IMAGE_BASE_URL}/${poster_path})">
          <img src="${IMAGE_BASE_URL}/${poster_path}"/>
        </figure>        
      </div>
    `;
  }
}
