import Router from "../Router.js";
import { fetchProduct } from "../api.js";

const parsePrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
async function ProductDetailPage() {
  const id = window.location.pathname.split("/").at(-1);
  const { imageUrl, name, price, productOptions } = await fetchProduct(id);
  const state = {
    cart: [],
    total: 0,
  };
  const DOMText = `
        <div class="ProductDetailPage">
            <h1>${name} 상품 정보</h1>
            <div class="ProductDetail">
                <img src="${imageUrl}">
                <div class="ProductDetail__info">
                <h2>${name}</h2>
                <div class="ProductDetail__price">${parsePrice(price)}원~</div>
                <select>
                    <option>선택하세요.</option>
                    ${productOptions
                      .map((productOption) => {
                        return productOption.stock === 0
                          ? `
                        <option value=${productOption.id} disabled>(품절) ${name} ${productOption.name}</option>
                        `
                          : productOption.price === 0
                          ? `
                        <option value=${productOption.id}>${name} ${productOption.name}</option>
                        `
                          : `
                        <option value=${productOption.id}>${name} ${
                              productOption.name
                            } (+${parsePrice(productOption.price)}원)</option>
                        `;
                      })
                      .join("")}
                </select>
                <div class="ProductDetail__selectedOptions">
                    <h3>선택된 상품</h3>
                    <ul>
                    </ul>
                    <div class="ProductDetail__totalPrice">0원</div>
                    <button class="OrderButton">주문하기</button>
                </div>
                </div>
            </div>
        </div>    
    `;
  const parser = new DOMParser();
  const DOM = parser.parseFromString(DOMText, "text/html").querySelector("div");
  const cartDOM = DOM.querySelector("ul");
  const selectDOM = DOM.querySelector("select");
  const totalPriceDOM = DOM.querySelector(".ProductDetail__totalPrice");
  selectDOM.addEventListener("change", (e) => {
    const value = e.target.value;
    if (value === "선택하세요") return;
    const option = productOptions.find((productOption) => {
      return productOption.id === parseInt(value);
    });
    if (state.cart.find((c) => c.id === value)) return;
    state.cart.push({
      id: value,
      amount: 1,
      optionId: option.id,
      optionName: option.name,
      price: option.price + price,
    });
    const cartItemDOMText = `
        <li>
        ${name} ${option.name} <div><input min="0" max="${option.stock}" type="number" value="1">개</div>
        </li>        
        `;
    const cartItemDOM = parser
      .parseFromString(cartItemDOMText, "text/html")
      .querySelector("li");
    const inputDOM = cartItemDOM.querySelector("input");
    inputDOM.addEventListener("change", (e) => {
      const inputVal = e.target.value.trim();
      if (inputVal === "") return;
      let amount = parseInt(inputVal);
      if (amount > option.stock) {
        inputDOM.value = option.stock;
        amount = option.stock;
      } else if (amount < 0) {
        inputDOM.value = 0;
        amount = 0;
      }
      const currentState = state.cart.find((c) => c.id === value);
      const amountDiff = amount - currentState.amount;
      currentState.amount = amount;
      state.total += (option.price + price) * amountDiff;
      totalPriceDOM.innerHTML = `${parsePrice(state.total)}원`;
    });
    state.total += option.price + price;
    cartDOM.appendChild(cartItemDOM);
    totalPriceDOM.innerHTML = `${parsePrice(state.total)}원`;
  });
  DOM.querySelector("button").addEventListener("click", () => {
    const currentCartItem =
      JSON.parse(localStorage.getItem("products_cart")) || [];
    const newCartItem = [];
    state.cart.forEach((c) => {
      newCartItem.push({
        productId: c.id,
        optionId: c.optionId,
        quantity: c.amount,
        imageUrl: imageUrl,
        optionName: c.optionName,
        productName: name,
        price: c.price,
      });
    });
    localStorage.setItem(
      "products_cart",
      JSON.stringify([...currentCartItem, ...newCartItem])
    );
    history.pushState({}, null, `/web/cart`);
    Router();
  });
  return DOM;
}
export default ProductDetailPage;
