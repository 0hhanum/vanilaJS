import Router from "./Router.js";

function App({ $target }) {
  this.render = () => {
    const router = new Router({ $target });
    const component = router.getComponent();
    $target.innerHTML = ""; // APP 비워주기
    component.render(); // 컴포넌트 받아와 렌더링
  };
  this.render();
}
export default App;
