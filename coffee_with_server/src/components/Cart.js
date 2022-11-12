export default function Cart({ $target, initialState }) {
  const $component = document.createElement("div");
  $component.className = "Cart";
  this.state = initialState;
  $target.appendChild($component);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $component.innerHTML = `
    <ul>
        ${this.state
          .map(
            (cartItem) => `
            <li class="Cart__item">
                <img src="${cartItem.imageUrl}"
                <div class="Cart__itemDescription">
                    <div>${cartItem.name} ${cartItem.selectedOption.name} ${
              cartItem.quantity
            }개</div>
                    <div>${
                      cartItem.price + cartItem.selectedOption.price
                    }원</div>
                </div>
            </li>
        `
          )
          .join("")}
    </ul>
    <div class="Cart__totalPrice">
        총 상품가격 ${this.getTotalPrice()}원
    </div>
    `;
  };
  this.getTotalPrice = () => {
    // (가격 + 옵션가) * quantity 를 누산기로 더해서 총 합계 계산
    return this.state.reduce((acc, item) => {
      return acc + (item.price + item.selectedOption.price) * item.quantity;
    }, 0);
  };
  this.render();
}
