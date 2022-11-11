import Router, { init } from "./Router.js";

function App({ $target }) {
  this.router = new Router({ $target });
  this.render = () => {
    const component = this.router.getComponent();
    $target.innerHTML = ""; // APP 비워주기
    component.render(); // 컴포넌트 받아와 렌더링
  };
  init(this.render);
  window.addEventListener("popstate", this.render);
  this.render();
}
export default App;
