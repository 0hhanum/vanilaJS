import { getItem, setItem } from "../storage.js";
import { routeChange } from "../Router.js";

function selectedOptions({ $target, initialState }) {
  const $component = document.createElement("div");
  $target.appendChild($component);
  this.state = initialState;

  this.getTotalPrice = () => {
    const { product, selectedOptions } = this.state;
    const { price: productPrice } = product;
    return selectedOptions.reduce(
      (acc, option) =>
        acc + (productPrice + option.optionPrice) * option.quantity,
      0
    );
  };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    // selectedOption 있으면 할당, 없으면 빈 array
    const { product, selectedOptions = [] } = this.state;
    if (product && selectedOptions) {
      $component.innerHTML = `
        <h3>선택된 상품</h3>
        <ul>
            ${selectedOptions
              .map(
                (selectedOption) => `
            <li>
                ${selectedOption.optionName} ${
                  product.price + selectedOption.optionPrice
                }원
                <input type="number" data-optionId="${
                  selectedOption.optionId
                }" value="${selectedOption.quantity}">
            </li>
            `
              )
              .join("")}
            <div class="ProductDetail__totalPrice">${this.getTotalPrice()}원</div>
            <button class="OrderButton">주문하기</button>
        `;
    }
  };
  this.render();
  $component.addEventListener("change", (e) => {
    // 이벤트가 INPUT 태그에서 발생한 경우에만 처리
    if (e.target.tagName === "INPUT") {
      let quantity = +e.target.value;
      try {
        const targetOptionId = e.target.dataset.optionid;
        const selectedOptions = [...this.state.selectedOptions];
        const {
          product: { productOptions },
        } = this.state;
        const option = productOptions.find(
          (option) => option.id === +targetOptionId
        );
        const targetOptionState = selectedOptions.find(
          (option) => option.optionId === targetOptionId
        );
        // 재고 숫자를 넘을 수 없음. 음수도 불가능
        if (quantity > option.stock) {
          quantity = option.stock;
        } else if (quantity < 0) {
          quantity = 0;
        }
        targetOptionState.quantity = quantity;
        this.setState({ ...this.state });
        $component.querySelector(`[data-optionId='${targetOptionId}']`).focus();
      } catch (e) {
        console.error(e);
      }
    }
  });
  // 장바구니 담기 처리
  // setState 를 통해 매번 새로 렌더링되니
  // component 자체에 리스너를 달고 target 이 눌렸는지 처리하는듯함
  $component.addEventListener("click", (e) => {
    const { selectedOptions } = this.state;
    const { product } = this.state;
    if (e.target.className === "OrderButton") {
      const cartData = getItem("products_cart", []);
      setItem(
        "products_cart",
        cartData.concat(
          selectedOptions.map((selectedOption) => ({
            productId: product.id,
            optionId: selectedOption.optionId,
            quantity: selectedOption.quantity,
          }))
        )
      );
    }
    routeChange("/cart");
  });
}
export default selectedOptions;
