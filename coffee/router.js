import ProductListPage from "./screens/ProductListPage.js";
import CartPage from "./screens/CartPage.js";
import ProductDetailPage from "./screens/ProductDetailPage.js";

const main = document.querySelector(".App");
const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const routes = [
  { path: "/web/", screen: ProductListPage },
  { path: "/products/:productId", ProductDetailPage },
  { path: "/web/cart", CartPage },
];
export async function Router() {
  const currentLocation = window.location.pathname;
  console.log(`you are in ${currentLocation} now`);
  const current = routes.find((route) => {
    return currentLocation.match(pathToRegex(route.path));
  });
  // main.innerHTML = await current.screen();
  if (main.hasChildNodes()) {
    main.children[0].remove();
  }
  main.appendChild(await current.screen());
}
