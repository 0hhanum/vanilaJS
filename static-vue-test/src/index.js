requirejs.config({
  baseUrl: "./src/lib",
  paths: {
    vue: "vue/vue",
    "http-vue-loader": "http-vue-loader/http-vue-loader",
  },
});

require(["vue", "http-vue-loader"], function (Vue, httpVueLoader) {
  const vueApp = new Vue({
    el: ".App",
    components: {
      "vue-component": httpVueLoader("./src/App.vue"),
    },
  });
  console.log(vueApp);
});
