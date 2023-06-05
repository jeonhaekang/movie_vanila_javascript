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

    const { poster_path, title, vote_average, release_date, runtime, overview, tagline } =
      movieInfo;

    console.log(movieInfo);

    const detailInfo = document.querySelector(".detail");
    detailInfo.innerHTML = `
      <div class="detail-poster">
        <figure style="background-image: url(${IMAGE_BASE_URL}/${poster_path})">
          <img src="${IMAGE_BASE_URL}/${poster_path}"/>
        </figure>        
      </div>

      <div class="detail-info">
        <h2 class="detail-title">${title}</h2>

        <div class="detail-rating">
        </div>

        <div class="detail-etc-box">
          <span class="detail-score">평점 ${vote_average}</span>
          
          <span class="detail-release-date">개봉일 ${release_date}</span>

          <span class="detail-runtime">상영시간 ${runtime}분</span>
        </div>

        <div class="detail-desc-box">
          <dl class="detail-desc">
            <dt>요약</dt>
            <dd>${tagline}</dd>
          </dl>
          <dl class="detail-desc">
            <dt>소개</dt>
            <dd>${overview}</dd>
          </dl>
        </div>
      </div>
    `;
  }
}
