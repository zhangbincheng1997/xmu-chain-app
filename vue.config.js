module.exports = {
  outputDir: 'dist',
  publicPath: '/',
  devServer: {
    port: process.env.port || 8888,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // target: 'http://localhost:8080/api', // 后端地址
        target: 'http://www.littleredhat1997.com:8080/api', // 后端地址
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  }
};
