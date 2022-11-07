import Router from "../router.js";

function Product({ id, name, imageUrl, price }) {
  const onClick = (id) => {
    history.pushState({}, null, `/web/products/${id}`);
    Router();
  };
  const DOMText = `
    <li class="Product">
        <img src="${imageUrl}">
        <div class="Product__info">
            <div>${name}</div>
            <div>${price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원~</div>
        </div>
    </li>
    `;
  const parser = new DOMParser();
  const DOM = parser.parseFromString(DOMText, "text/html").querySelector("li");
  DOM.addEventListener("click", () => onClick(id));
  return DOM;
}
export default Product;
