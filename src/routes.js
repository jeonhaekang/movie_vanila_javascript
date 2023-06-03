import { DetailPage } from "./pages/DetailPage.js";
import { HomePage } from "./pages/HomePage.js";

export const routes = {
  "/": new HomePage(),
  "/detail": new DetailPage()
};

export const renderPage = async (pathname, withCache) => {
  const page = routes[pathname];
  page.render(withCache);
};

export const navigate = (to, withCache = false) => {
  const historyChangeEvent = new CustomEvent("history", {
    detail: { to, withCache }
  });

  dispatchEvent(historyChangeEvent);
};

export const routeInit = () => {
  window.addEventListener("history", ({ detail: { to } }) => {
    history.pushState(null, "", to);

    renderPage(to);
  });

  window.addEventListener("popstate", () => {
    renderPage(location.pathname, true);
  });

  renderPage(location.pathname);
};
