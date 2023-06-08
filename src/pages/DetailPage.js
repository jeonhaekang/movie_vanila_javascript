import { addComment, getCommentList } from "../apis/comment.js";
import { getMovieDetail, getMoviePhotoList } from "../apis/movie.js";
import { IMAGE_BASE_URL, IMAGE_SIZE } from "../constants.js";
import { Slider } from "../models/Slider.js";
import { Page } from "./Page.js";

export class DetailPage extends Page {
  movieId;

  constructor() {
    super(`
        <main class="detail-section"></main>

        <section class="photo-section">
          <div class="photo-preview"></div>
        </section>

        <section class="comment-section">
          <form class="comment-form">
            <div class="comment-user-box">
              <input class="comment-name" name="name" placeholder="이름을 입력해주세요." maxlength="10" required/>
              <input class="comment-password" type="password" name="password" placeholder="비밀번호를 입력해주세요." maxlength="4" required/>
            </div>

            <div class="comment-submit-box">
              <input class="comment-content" name="content" placeholder="감상평을 입력해주세요." maxlength="200" required/>
              <button class="comment-submit bold">등록</button>
            </div>
          </form>

          <ul class="comment-list"></ul>
        </section>
    `);
  }

  renderDescItem(title, desc) {
    return `
      <dl class="desc-item small">
        <dt class="normal">${title}</dt>
        <dd class="gray">${desc}</dd>
      </dl>
    `;
  }

  async renderMovieDetail() {
    const { poster_path, title, vote_average, release_date, runtime, overview, tagline } = await getMovieDetail(
      this.movieId
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

  async renderPhotoList() {
    const photoList = await getMoviePhotoList(this.movieId);

    const photoSection = document.querySelector(".photo-section");
    const photoSectionContent = `
      <h3 class="medium bold">포토 <span class="green">${photoList.length}</span></h3>

      <div class="photo-list-box">
        <button class="list-button prev-button">
          <img src="assets/icons/chevron_left.svg"/>
        </button>
        
        <div class="photo-display">
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
        </div>
      
        <button class="list-button next-button">
          <img src="assets/icons/chevron_right.svg"/>
        </button>
      </div>
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

  async renderCommentList() {
    const commentListElement = document.querySelector(".comment-list");

    const commentList = getCommentList(this.movieId);
    commentList.forEach(({ id, name, password, content }) => {
      const _comment = `
        <li class="comment-item">
          <h4 class="tiny bold">${name}</h4>

          <p class="small">${content}</p>
          <button class="comment-delete tiny gray">삭제</button>
        </li>
      `;

      commentListElement.insertAdjacentHTML("afterbegin", _comment);
    });

    console.log(commentList);
  }

  async onRender() {
    const params = new URLSearchParams(location.search);
    this.movieId = params.get("movieId");

    this.renderMovieDetail();
    this.renderCommentList();
    await this.renderPhotoList();
  }

  async onFinally() {
    const photoList = document.querySelector(".photo-list");
    photoList.addEventListener("click", ({ target }) => {
      const photoItem = target.closest("img");

      photoItem && this.renderPhotoPreview(photoItem.dataset.path);
    });

    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    const slider = new Slider(prevButton, nextButton, photoList, 8);

    slider.connect();

    const commentForm = document.querySelector(".comment-form");
    commentForm.addEventListener("submit", event => {
      event.preventDefault();
      const inputs = document.querySelectorAll(".comment-form input");

      const commentData = Array.from(inputs).reduce((data, input) => {
        const { name, value } = input;

        return { ...data, [name]: value };
      }, {});

      addComment(this.movieId, commentData);
    });

    const commentList = document.querySelector(".comment-list");
    commentList.addEventListener("click", ({ target }) => {
      const deleteButton = target.closest(".comment-delete");

      console.log(deleteButton);
    });
  }
}
