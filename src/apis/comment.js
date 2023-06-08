export const addComment = (movieId, commentData) => {
  const parsedComments = JSON.parse(localStorage.getItem("comments") || "{}");
  const movieComments = parsedComments[movieId] || [];

  const id = movieComments.length > 0 ? movieComments[movieComments.length - 1].id + 1 : 1;
  const newComment = { id, ...commentData };

  parsedComments[movieId] = [...movieComments, newComment];

  localStorage.setItem("comments", JSON.stringify(parsedComments));
};

export const getCommentList = movieId => {
  const comments = JSON.parse(localStorage.getItem("comments") || "{}");

  return comments[movieId] || [];
};

export const deleteComment = (movieId, commentId, password) => {};
