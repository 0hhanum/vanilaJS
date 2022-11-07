import Cart from "./screens/Cart.js";
import ProductDetail from "./screens/ProductDetail.js";
import ProductList from "./screens/ProductList.js";

const ROUTE_CHANGE_EVENT = "ROUTE_CHANGE";
const routes = [
  { path: "/", component: ProductList },
  { path: "/products/:id", component: ProductDetail },
  { path: "/cart", component: Cart },
];

function Router({ $target }) {
  this.getComponent = () => {
    const { pathname } = location;
    console.log(`current path: ${pathname}`);
    const currentComponent = routes.find((route) => {
      return route.path.startsWith(pathname);
    });
    console.log(currentComponent);
    return new currentComponent.component({ $target });
  };
}

export const init = (onRouteChange) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, () => {
    onRouteChange();
  });
};
export const routeChange = (url, params) => {
  history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, params));
};
export default Router;
