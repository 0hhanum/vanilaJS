import { getItem } from "../storage.js";
import { routeChange } from "../Router.js";
import { fetchProduct } from "../api.js";
import Cart from "../components/Cart.js";

function CartPage({ $target }) {
  const cartData = getItem("products_cart", []);
  const $page = document.createElement("div");
  $page.className = "CartPage";
  $page.innerHTML = "<h1>장바구니</h1>";
  let cartComponent = null;

  this.state = {
    products: null,
  };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    if (cartData.length === 0) {
      alert("장바구니가 비어있습니다.");
      routeChange("/");
    } else {
      $target.appendChild($page);
      if (this.state.products && !cartComponent) {
        cartComponent = new Cart({
          $target: $page,
          initialState: this.state.products,
        });
      }
    }
  };
  this.fetchProduct = async () => {
    // 각각의 cartItem 에 대해 요청 보냄
    const products = await Promise.all(
      cartData.map(async (cartItem) => {
        const product = await fetchProduct(cartItem.productId);
        const selectedOption = product.productOptions.find(
          (option) => option.id === +cartItem.optionId
        );
        return { ...product, selectedOption, quantity: cartItem.quantity };
      })
    );
    this.setState({ products });
  };
  this.fetchProduct();
}
export default CartPage;
