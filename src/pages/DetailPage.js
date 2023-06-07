import { getMovieDetail, getMoviePhotoList } from "../apis/movie.js";
import { IMAGE_BASE_URL, IMAGE_SIZE } from "../constants.js";
import { Page } from "./Page.js";

export class DetailPage extends Page {
  constructor() {
    super(`
      <div class="detail-container">
        <main class="detail-section"></main>

        <section class="photo-section">
        </section>
      </div>
    `);

    const params = new URLSearchParams(location.search);
    this.movieId = params.get("movieId");
  }

  renderDescItem(title, desc) {
    return `
      <dl class="desc-item small">
        <dt class="normal">${title}</dt>
        <dd class="gray">${desc}</dd>
      </dl>
    `;
  }

  async renderMovieDetail(movieId) {
    const { poster_path, title, vote_average, release_date, runtime, overview, tagline } = await getMovieDetail(
      movieId
    );

    const detailInfo = document.querySelector(".detail-section");
    detailInfo.innerHTML = `
      <div class="detail-poster">
        <figure style="background-image: url(${IMAGE_BASE_URL}/${IMAGE_SIZE.backdrop.large}/${poster_path})">
          <img src="${IMAGE_BASE_URL}/${IMAGE_SIZE.poster.medium}/${poster_path}"/>
        </figure>
      </div>

      <div class="detail-info">
        <h2 class="large bold">${title}</h2>

        <div class="etc-box small gray">
          <span>평점 ${vote_average}</span>
          <span>개봉일 ${release_date}</span>
          <span>상영시간 ${runtime}분</span>
        </div>

        <div class="desc-box">
          ${this.renderDescItem("소개", overview)}
          ${tagline && this.renderDescItem("요약", tagline)}
        </div>
      </div>
  `;
  }

  async renderMoviePhotoList(movieId) {
    const photoList = await getMoviePhotoList(movieId);

    const imageSection = document.querySelector(".photo-section");
    imageSection.innerHTML = `
      <h3>포토 ${photoList.length}</h3>

      <ul class="photo-list">
        ${photoList.reduce((_photoList, { file_path }) => {
          const newPhoto = `
            <li class="photo-item">
              <img src="${IMAGE_BASE_URL}/${IMAGE_SIZE.backdrop.small}/${file_path}"/>
            </li>
          `;

          return _photoList + newPhoto;
        }, "")}
      </ul>
    `;
  }

  async onRender() {
    const params = new URLSearchParams(location.search);
    const movieId = params.get("movieId");

    this.renderMovieDetail(movieId);
    this.renderMoviePhotoList(movieId);
  }
}
