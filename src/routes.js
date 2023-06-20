import { DetailPage } from "./pages/DetailPage.js";
import { HomePage } from "./pages/HomePage.js";

export const routes = {
  "#/": new HomePage(),
  "#/detail": new DetailPage()
};

export const renderPage = async (pathname, queryString) => {
  const page = routes[pathname];
  page.render(queryString);
};
