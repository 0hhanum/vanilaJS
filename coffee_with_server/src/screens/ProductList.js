import { fetchProducts } from "../api.js";
// DOM 을 리턴해서 index 에서 처리하는게 아니라 $target 받아서 여기서 append ?
function ProductList({ $target }) {
  const $page = document.createElement("div");
  $page.className = "ProductListPage";
  $page.innerHTML = "<h1>상품 목록</h1>";
  this.render = async () => {
    await fetchProducts();
    $target.appendChild($page);
  };
}
export default ProductList;
