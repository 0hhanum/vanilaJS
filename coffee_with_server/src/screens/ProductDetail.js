function ProductDetail({ $target }) {
  const $page = document.createElement("div");
  $page.className = "ProductListPage";
  $page.innerHTML = "<h1>상품 정보</h1>";
  this.render = () => {
    $target.appendChild($page);
  };
}
export default ProductDetail;
