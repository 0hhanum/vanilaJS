import Router from "../Router.js";
function CartPage() {
  const cartItems = JSON.parse(localStorage.getItem("products_cart"));
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
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
    const txt = `
        <li class="Cart__item">
            <img src="${item.imageUrl}">
            <div class="Cart__itemDesription">
            <div>${item.productName} ${item.optionName} ${item.price}원 ${
      item.quantity
    }개</div>
            <div>${item.price * item.quantity}원</div>
            </div>
        </li>
        `;
    const dom = parser.parseFromString(txt, "text/html").querySelector("li");
    ul.appendChild(dom);
  });
  const button = DOM.querySelector("button");
  const totalDOM = DOM.querySelector(".Cart__totalPrice");
  button.addEventListener("click", () => {
    alert("주문되었습니다");
    localStorage.removeItem("products_cart");
    history.pushState({}, null, `/web/`);
    Router();
  });

  totalDOM.innerHTML = `총 상품가격 ${total}원`;
  return DOM;
}
export default CartPage;
