import { connectRoute, navigate } from "./routes.js";

connectRoute();

const mainLogo = document.querySelector(".main-logo");
mainLogo.addEventListener("click", () => navigate("/"));
