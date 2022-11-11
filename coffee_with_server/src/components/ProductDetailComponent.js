import SelectedOptions from "./SelectedOptions.js";

function ProductDetailComponent({ $target, initialState }) {
  const $productDetail = document.createElement("div");
  // SelectedOption 컴포넌트
  let selectedOptions = null;
  $productDetail.className = "ProductDetail";
  $target.appendChild($productDetail);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    if (selectedOptions) {
      selectedOptions.setState({
        selectedOptions: this.state.selectedOptions,
      });
    }
  };
  this.render = () => {
    const { product } = this.state;
    $productDetail.innerHTML = `
      <img src="${product.imageUrl}">
      <div class="ProductDetail__info">
        <h2>${product.name}</h2>
        <div class="ProductDetail__price">
          ${product.price}원~
        </div>
        <select>
          <option>선택하세요.</option>
          ${product.productOptions
            .map(
              (option) => `
            <option value="${option.id}" ${
                option.stock === 0 ? "disabled" : ""
              }>
              ${option.stock === 0 ? "(품절)" : ""}${product.name} ${
                option.name
              } ${option.price > 0 ? `(+${option.price}원)` : ""}
            </option>
          `
            )
            .join("")}
        </select>
        <div class="ProductDetail__selectedOptions"></div>
      </div>
    `;
    selectedOptions = new SelectedOptions({
      $target: $productDetail.querySelector(".ProductDetail__selectedOptions"),
      initialState: {
        product: this.state.product,
        selectedOptions: this.state.selectedOptions,
      },
    });
  };
  this.render();
  // 선택 옵션
  $productDetail.addEventListener("change", (event) => {
    const { product, selectedOptions } = this.state;
    const optionId = event.target.value;
    const targetOption = product.productOptions.find(
      (productOption) => +productOption.id === +optionId
    );
    const selectedOption = {
      optionId: event.target.value,
      optionPrice: targetOption.price,
      optionName: targetOption.name,
      quantity: 1,
    };
    selectedOptions.push(selectedOption);
    this.setState({ ...this.state });
  });
}
export default ProductDetailComponent;
