requirejs.config({
  baseUrl: "./src/lib",
  paths: {
    vue: "vue/vue",
    "http-vue-loader": "http-vue-loader/http-vue-loader",
  },
});

require(["vue", "http-vue-loader"], function (Vue, httpVueLoader) {
  Vue.use(httpVueLoader);
  httpVueLoader.register(Vue, "./src/App.vue");

  new Vue({
    render: (h) => h(Vue.component("App")),
  }).$mount(".App");
});
