import Router from "./Router.js";

console.log("start app");

window.onload = () => {
  Router(true);
};
window.addEventListener("popstate", () => Router());
