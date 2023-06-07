import { getMovieDetail, getMoviePhotoList } from "../apis/movie.js";
import { IMAGE_BASE_URL, IMAGE_SIZE } from "../constants.js";
import { Page } from "./Page.js";

export class DetailPage extends Page {
  constructor() {
    super(`
        <main class="detail-section"></main>

        <section class="photo-section">
          <div class="photo-preview"></div>
        </section>
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

    const detailSection = document.querySelector(".detail-section");
    const detailSectionContent = `
        <div class="detail-poster">
          <figure style="background-image: url(${IMAGE_BASE_URL}/${IMAGE_SIZE.backdrop.large}/${poster_path})">
            <img src="${IMAGE_BASE_URL}/${IMAGE_SIZE.poster.medium}/${poster_path}"/>
          </figure>
        </div>

        <div class="detail-info">
          <h2 class="large bold">${title}</h2>

          <div class="etc-box tiny gray">
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
    detailSection.insertAdjacentHTML("afterbegin", detailSectionContent);
  }

  async renderPhotoList(movieId) {
    const photoList = await getMoviePhotoList(movieId);

    const photoSection = document.querySelector(".photo-section");
    const photoSectionContent = `
      <h3 class="medium bold">포토 <span class="green">${photoList.length}</span></h3>

      <ul class="photo-list">
        ${photoList.reduce((_photoList, { file_path }) => {
          const newPhoto = `
            <li class="photo-item">
              <figure class="photo-box">
                <img src="${IMAGE_BASE_URL}/${IMAGE_SIZE.backdrop.small}/${file_path}" data-path="${file_path}"/>
              </figure>
            </li>
          `;

          return _photoList + newPhoto;
        }, "")}
      </ul>
    `;
    photoSection.insertAdjacentHTML("afterbegin", photoSectionContent);
  }

  async renderPhotoPreview(filePath) {
    const photoPreview = document.querySelector(".photo-preview");

    const photoPreviewContent = `
      <figure class="photo-preview-box">
        <img src="${IMAGE_BASE_URL}/${IMAGE_SIZE.backdrop.large}/${filePath}"/>
      </figure>
    `;

    photoPreview.innerHTML = photoPreviewContent;
  }

  async onRender() {
    const params = new URLSearchParams(location.search);
    const movieId = params.get("movieId");

    this.renderMovieDetail(movieId);
    await this.renderPhotoList(movieId);
  }

  async onFinally() {
    const photoList = document.querySelector(".photo-list");
    photoList.addEventListener("click", ({ target }) => {
      const photoItem = target.closest("img");

      photoItem && this.renderPhotoPreview(photoItem.dataset.path);
    });
  }
}
