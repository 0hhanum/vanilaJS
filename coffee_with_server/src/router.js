import CartPage from "./screens/CartPage.js";
import ProductDetailPage from "./screens/ProductDetailPage.js";
import ProductListPage from "./screens/ProductListPage.js";

const app = document.querySelector(".App");
const pathToRegex = (path) =>
  new RegExp(
    "^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "[a-zA-Z0-9-_]*") + "$"
  );

const routes = [
  { path: "/", screen: ProductListPage },
  // { path: "/products/:productId", screen: ProductDetailPage },
  { path: "/cart", screen: CartPage },
];
async function Router(isFirstLoaded = false) {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  const currentScreen = routes.find((route) =>
    currentPath.match(pathToRegex(route.path))
  );
  if (!isFirstLoaded) {
    app.children[0].remove();
  }
  console.log(currentScreen);
  app.appendChild(await currentScreen.screen());
}
export default Router;
