import { navigate, routeInit } from "./routes.js";

routeInit();

const mainLogo = document.querySelector(".main-logo");
mainLogo.addEventListener("click", () => navigate("/"));
