export const fetchMovie = async restUrl => {
  const { results } = await fetch(`https://api.themoviedb.org/3/${restUrl}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODZhZjcxNzY0MTVhYjk3MWU5YjRjZWFhOTA0NTY4YiIsInN1YiI6IjY0NzBhMDI4YzVhZGE1MDBhODJkZmMwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MW5UL8xFifiCQX7ozBfj0REWT4TL4S75oHk9Zki44-0"
    }
  }).then(response => response.json());

  return results;
};

export const drawMovieList = movieList => {
  const movieListElement = document.querySelector(".movie-list");

  movieListElement.innerHTML = movieList.reduce((newMovieList, movieItem) => {
    const { poster_path, title, overview, vote_average } = movieItem;

    return (newMovieList += `
          <li class="movie-item">
              <img class="movie-poster" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title} 포스터" />
              <h2 class="movie-title">${title}</h2>
              <p class="movie-desc">${overview}</p>
              <p class="movie-rating">Rating : ${vote_average}</p>
          </li>
        `);
  }, "");
};

export const loadMovie = async () => {
  const movieList = await fetchMovie("movie/popular");

  drawMovieList(movieList);
};

export const searchMovie = async () => {
  const searchInput = document.querySelector(".search-box");
  const searchKeyword = searchInput.value;

  const searchMovieList = await fetchMovie(`search/movie?query=${searchKeyword}`);

  if (searchMovieList.length > 0) {
    drawMovieList(searchMovieList);
  } else {
    alert("검색된 결과가 없습니다.");
  }
};
