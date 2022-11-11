import { fetchProduct } from "../api.js";
import ProductDetailComponent from "../components/ProductDetailComponent.js";
function ProductDetail({ $target, productId }) {
  this.state = {
    productId,
    product: null,
  };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  const $page = document.createElement("div");
  $page.className = "ProductDetailPage";
  $page.innerHTML = "<h1>상품 정보</h1>";
  this.render = () => {
    if (!this.state.product) {
      $target.innerHTML = "Loading ...";
    } else {
      $target.innerHTML = "";
      $target.appendChild($page);
      new ProductDetailComponent({
        $target: $page,
        initialState: {
          product: this.state.product,
          selectedOptions: [],
        },
      });
    }
  };
  this.getProduct = async () => {
    const { productId } = this.state;
    const product = await fetchProduct(productId);
    this.setState({ productId, product });
  };
  this.getProduct();
}
export default ProductDetail;
