export const fetchProducts = async () => {
  return await (
    await fetch(
      "https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products"
    )
  ).json();
};
export const fetchProduct = async (id) => {
  return await (
    await fetch(
      `https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products/${id}`
    )
  ).json();
};
