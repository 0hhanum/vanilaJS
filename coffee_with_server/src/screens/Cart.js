function Cart({ $target }) {
  const $page = document.createElement("div");
  $page.className = "ProductListPage";
  $page.innerHTML = "<h1>장바구니</h1>";
  this.render = () => {
    $target.appendChild($page);
  };
}
export default Cart;
