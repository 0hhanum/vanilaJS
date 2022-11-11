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
                <input type="text" data-optionId="${
                  selectedOption.optionId
                }" value="${selectedOption.quantity}">
            </li>
            <div class="ProductDetail__totalPrice">${this.getTotalPrice()}원</div>
            `
              )
              .join("")}
            <button class="OrderButton">주문하기</button>
        `;
    }
  };
  this.render();
}
export default selectedOptions;
