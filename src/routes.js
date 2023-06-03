import { DetailPage } from "./pages/DetailPage.js";
import { HomePage } from "./pages/HomePage.js";

export const routes = {
  "/": new HomePage(),
  "/detail": new DetailPage()
};

export const render = async (pathname, withCache) => {
  const rootElement = document.querySelector("#root");

  const page = routes[pathname];
  rootElement.innerHTML = page.render(withCache);

  page.init();
};

export const navigate = to => {
  const historyChangeEvent = new CustomEvent("history", {
    detail: { to }
  });

  dispatchEvent(historyChangeEvent);
};

export const routeInit = () => {
  window.addEventListener("history", ({ detail: { to } }) => {
    history.pushState(null, "", to);

    render(to);
  });

  window.addEventListener("popstate", () => {
    render(location.pathname, true);
  });

  render(location.pathname);
};
