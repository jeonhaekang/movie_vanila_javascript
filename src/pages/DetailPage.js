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

  renderDescItem(title, desc) {
    return `
      <dl class="detail-desc">
        <dt>${title}</dt>
        <dd>${desc}</dd>
      </dl>
    `;
  }

  async renderDetail(movieId) {
    const { poster_path, title, vote_average, release_date, runtime, overview, tagline } =
      await getDetailMovie(movieId);

    const detailInfo = document.querySelector(".detail");
    detailInfo.innerHTML = `
      <div class="detail-poster">
        <figure style="background-image: url(${IMAGE_BASE_URL}/${poster_path})">
          <img src="${IMAGE_BASE_URL}/${poster_path}"/>
        </figure>
      </div>

      <div class="detail-info">
        <h2 class="detail-title">${title}</h2>

        <div class="detail-etc-box">
          <span>평점 ${vote_average}</span>
          <span>개봉일 ${release_date}</span>
          <span>상영시간 ${runtime}분</span>
        </div>

        <div class="detail-desc-box">
          ${this.renderDescItem("소개", overview)}
          ${tagline && this.renderDescItem("요약", tagline)}
        </div>
      </div>
  `;
  }

  async onRender() {
    const params = new URLSearchParams(location.search);
    const movieId = params.get("movieId");

    this.renderDetail(movieId);
  }
}
