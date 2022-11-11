import { fetchProducts } from "../api.js";
import Product from "../components/Product.js";
// DOM 을 리턴해서 index 에서 처리하는게 아니라 $target 받아서 여기서 append ?
function ProductList({ $target }) {
  const $page = document.createElement("div");
  $page.className = "ProductListPage";
  $page.innerHTML = "<h1>상품 목록</h1>";
  this.render = async () => {
    $target.appendChild($page);
  };
  this.setState = (nextState) => {
    this.state = nextState;
  };
  const product = new Product({
    $target: $page,
    initialState: this.state,
  });
  const getProducts = async () => {
    const products = await fetchProducts();
    this.setState(products);
    product.setState(products);
  };
  getProducts();
}
export default ProductList;
