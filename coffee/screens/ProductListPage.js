const onClick = () => {
  console.log(123);
};
async function ProductListPage() {
  const data = await (
    await fetch(
      "https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products"
    )
  ).json();

  const domText = await `
  <div class="ProductListPage">
  <h1>상품목록</h1>
  <ul>
  ${data
    .map((product) => {
      return `
      <li class="Product" key="${product.id}">
      <img
        src="${product.imageUrl}"
      />
      <div class="Product__info">
        <div>${product.name}</div>
        <div>${product.price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}~</div>
      </div>
    </li>
      `;
    })
    .join("")}
  </ul>
</div>
  `;

  const parser = new DOMParser();
  const dom = parser.parseFromString(domText, "text/html").querySelector("div");
  await dom.querySelectorAll("li").forEach((list) => {
    list.addEventListener("click", (list) => {
      console.log(list);
    });
  });
  return dom;
}
export default ProductListPage;
