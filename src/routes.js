import { DetailPage } from "./pages/DetailPage.js";
import { HomePage } from "./pages/HomePage.js";

export const routes = {
  "/": new HomePage(),
  "/detail": new DetailPage()
};

export const renderPage = async (pathname, cache) => {
  const page = routes[pathname];
  page.render(cache);
};

export const navigate = (to, cache) => {
  const historyChangeEvent = new CustomEvent("history", {
    detail: { to, cache }
  });

  dispatchEvent(historyChangeEvent);
};

export const routeInit = () => {
  window.addEventListener("history", ({ detail: { to, cache } }) => {
    history.pushState(null, "", to);

    renderPage(to.split("?")[0], cache);
  });

  window.addEventListener("popstate", () => {
    renderPage(location.pathname, true);
  });

  renderPage(location.pathname);
};
