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

export const navigate = to => {
  const historyChangeEvent = new CustomEvent("history", {
    detail: { to }
  });

  dispatchEvent(historyChangeEvent);
};

export const connectRoute = () => {
  window.addEventListener("history", ({ detail: { to } }) => {
    if (to === location.pathname) {
      history.replaceState(null, "", to);
    } else {
      history.pushState(null, "", to);
    }

    renderPage(to.split("?")[0]);
  });

  window.addEventListener("popstate", () => {
    renderPage(location.pathname, true);
  });

  renderPage(location.pathname);
};
