import Product from "../components/Product.js";
import { fetchProducts } from "../api.js";

async function ProductListPage() {
  const products = await fetchProducts();
  const DOMText = `
    <div class="ProductListPage">
    <h1>상품목록</h1>
    <ul>
    </ul>
    </div>
    `;

  const parser = new DOMParser();
  const DOM = parser.parseFromString(DOMText, "text/html").querySelector("div");
  const ul = DOM.querySelector("ul");
  products.forEach((product) => {
    ul.appendChild(Product(product));
  });

  return DOM;
}
export default ProductListPage;
