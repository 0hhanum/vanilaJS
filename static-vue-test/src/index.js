requirejs.config({
  baseUrl: "./src/lib",
  paths: {
    vue: "vue/vue",
  },
});

require(["vue"], function (vue) {
  console.log(vue);
});
