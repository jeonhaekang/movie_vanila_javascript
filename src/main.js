import { renderPage } from "./routes.js";

renderPage("#/");

window.addEventListener("hashchange", () => {
  const { hash } = location;

  const [pathname, queryString] = hash.split("?");

  renderPage(pathname, queryString);
});
