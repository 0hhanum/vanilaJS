import Router from "../Router.js";
function CartPage() {
  const cartItems = JSON.parse(localStorage.getItem("products_cart"));
  console.log(cartItems);
  if (cartItems.length === 0 || !cartItems) {
    alert("장바구니가 비어있습니다");
    history.pushState({}, null, `/web/`);
    Router(true);
    return;
  }
  const DOMText = `
    <div class="CartPage">
    <h1>장바구니</h1>
    <div class="Cart">
        <ul>
        
        </ul>
        <div class="Cart__totalPrice">
        </div>
        <button class="OrderButton">주문하기</button>
        </div>
    </div>    
    `;
  const parser = new DOMParser();
  const DOM = parser.parseFromString(DOMText, "text/html").querySelector("div");
  const ul = DOM.querySelector("ul");
  cartItems.forEach((item) => {
    const txt = `
        <li class="Cart__item">
            <img src="${item.imageUrl}">
            <div class="Cart__itemDesription">
            <div>커피잔 100개 번들 10,000원 10개</div>
            <div>100,000원</div>
            </div>
        </li>
        `;
  });
  const button = DOM.querySelector("button");
  const totalDOM = DOM.querySelector(".Cart__totalPrice");
  return DOM;
}
export default CartPage;
