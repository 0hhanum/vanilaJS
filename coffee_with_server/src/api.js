const API_END_POINT = "http://localhost:8000";
export const request = async (url, options = {}) => {
  try {
    const fullUrl = `${API_END_POINT}${url}`;
    const response = await fetch(fullUrl);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error("통신 실패");
  } catch (e) {
    alert(e);
  }
};
export const fetchProducts = async () => {
  const data = await request("/products");
  return data;
};
export const fetchProduct = async (id) => {
  return await fetch(
    `https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products/${id}`
  );
};
