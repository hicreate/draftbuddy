module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    https: false,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
      },
      "/open-api": {
        target: "http://localhost:3001",
      },
    },
  },
};
